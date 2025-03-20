// app/api/webhook/route.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { Cast as CastV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2/openapi-farcaster/models/cast.js";
import { createHmac } from "crypto";
import neynarClient from "@/app/utils/neynarClient";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAIKEY, // Non-public for server-side
});

interface DeployParams {
  name: string;
  symbol: string;
  url: string;
  fid: string;
}

async function deployToken(params: DeployParams): Promise<{ success: boolean; contractAddress?: string; transactionHash?: string; error?: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deploy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return response.json();
}

async function processCastWithAI(cast: CastV2, botFid: string): Promise<string | null> {
  const text = cast.text.toLowerCase();
  const embeds = cast.embeds || [];
  const fid = cast.author.fid.toString();

  // Ignore casts from the bot to prevent loops
  if (fid === botFid) {
    console.log(`Ignoring cast from bot FID: ${fid}`);
    return null;
  }

  // Only process casts mentioning @jazmeen
  if (!text.includes("@jazmeen")) {
    console.log(`No @jazmeen mention in cast: ${text}`);
    return null;
  }

  // Use OpenAI to flexibly parse the request
  const prompt = `
    You are Jazmeen, a sassy, flirty, and fun AI assistant. Parse this Farcaster cast to detect a token deployment request:
    Text: "${cast.text}"
    Embeds: ${JSON.stringify(embeds)}

    Look for intent to create a token (e.g., "deploy a token", "make me a token", "create a coin", etc.).
    Extract:
    - Token name (e.g., "GABRIEL")
    - Ticker/symbol (e.g., "$GABE" or "GABE", $ is optional)
    - Image URL (from embeds, prefer .jpg, .png, or similar image links)

    Rules:
    - Name and symbol are required; if missing, ask for them flirtily.
    - Image URL is required; if missing from embeds, request it.
    - Be flexible with phrasing and don’t enforce strict formats.
    - If no deployment intent, suggest how to request one.

    Output in JSON:
    {
      "intent": "deploy" | "none",
      "valid": boolean,
      "name": string | null,
      "symbol": string | null,
      "imageUrl": string | null,
      "errorMessage": string | null
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  console.log("OpenAI result:", result); // Debug log

  const { intent, valid, name, symbol, imageUrl, errorMessage } = result;

  // No deployment intent
  if (intent !== "deploy") {
    return `Hey cutie ${cast.author.username}, Jazmeen’s here to vibe! Wanna make a token? Just say something like “Hey @jazmeen, make me a token NAME with ticker TICKER and this image”! *wink*`;
  }

  // Invalid request
  if (!valid) {
    return `Oh honey ${cast.author.username}, ${errorMessage || "you forgot something! Try again with a name, ticker, and an image, kay?"} *blows a kiss*`;
  }

  // Normalize symbol (remove $ if present)
  const cleanSymbol = symbol.startsWith("$") ? symbol.slice(1) : symbol;

  // Deploy the token
  const deployResult = await deployToken({
    name,
    symbol: cleanSymbol,
    url: imageUrl,
    fid,
  });
  console.log("Deploy result:", deployResult); // Debug log

  if (!deployResult.success) {
    return `Oopsie ${cast.author.username}, something went wrong deploying your token: ${deployResult.error || "unknown error"}. Try again, sweetie!`;
  }

  const webUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${deployResult.contractAddress}`;
  return `Hey cutie ${cast.author.username}, Jazmeen’s got you covered! Your token “${name}” with ticker $${cleanSymbol} is live at ${webUrl}. Go check it out and blow me a kiss! 💋`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const webhookSecret = process.env.NEXT_PUBLIC_NEYNAR_WEBHOOK_SECRET;

    if (
      !process.env.NEXT_PUBLIC_SIGNER_UUID ||
      !process.env.NEXT_PUBLIC_NEYNAR_API_KEY ||
      !webhookSecret ||
      !process.env.NEXT_PUBLIC_OPENAIKEY
    ) {
      throw new Error(
        "Missing SIGNER_UUID, NEYNAR_API_KEY, NEYNAR_WEBHOOK_SECRET, or OPENAI_API_KEY in .env"
      );
    }

    const sig = req.headers.get("X-Neynar-Signature");
    if (!sig) {
      throw new Error("Neynar signature missing from request headers");
    }

    const hmac = createHmac("sha512", webhookSecret);
    hmac.update(body);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== sig) {
      throw new Error("Invalid webhook signature");
    }

    const hookData = JSON.parse(body) as {
      created_at: number;
      type: "cast.created";
      data: CastV2;
    };

    // Use bot FID (hardcoded for now, move to .env)
    const botFid = "980217"; 

    // Process cast with AI
    const replyText = await processCastWithAI(hookData.data, botFid);
    if (!replyText) {
      return NextResponse.json({ message: "Ignored cast" }, { status: 200 });
    }

    // Send reply via Neynar
    const reply = await neynarClient.publishCast(
      process.env.NEXT_PUBLIC_SIGNER_UUID,
      replyText,
      { replyTo: hookData.data.hash }
    );

    return NextResponse.json({ message: reply }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}