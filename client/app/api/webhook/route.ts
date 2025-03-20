// app/api/webhook/route.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { Cast as CastV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2/openapi-farcaster/models/cast.js";
import { createHmac } from "crypto";
import neynarClient from "@/app/utils/neynarClient";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAIKEY, // Use non-public env var for security
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

  // Ignore casts from the bot itself to prevent loops
  if (fid === botFid) {
    return null;
  }

  // Only process casts mentioning @jazmeen
  if (!text.includes("@jazmeen")) {
    return null;
  }

  // Check if this is a deployment request
  if (!text.includes("deploy a token")) {
    return `Hey cutie ${cast.author.username}, Jazmeen’s here to vibe! Say something like “Hey @jazmeen deploy a token for me NAME with ticker $TICKER with this image” to get started!`;
  }

  // Use OpenAI to parse the request
  const prompt = `
    You are Jazmeen, a sassy, flirty, and fun AI assistant. Parse this Farcaster cast for a token deployment request:
    Text: "${cast.text}"
    Embeds: ${JSON.stringify(embeds)}

    Extract:
    - Token name (e.g., "GABRIEL")
    - Ticker/symbol (e.g., "$GABE")
    - Image URL (from embeds, must be an image link)

    Rules:
    - Name and symbol are required.
    - Symbol must start with "$".
    - Image URL must be present in embeds (e.g., a .jpg, .png link).
    - If anything’s missing, respond with a flirty error message asking for it.

    Output in JSON:
    {
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
  const { valid, name, symbol, imageUrl, errorMessage } = result;

  if (!valid) {
    return `Oh honey ${cast.author.username}, ${errorMessage || "you forgot something! Try again with 'Hey @jazmeen deploy a token for me NAME with ticker $TICKER with this image' and attach an image, kay?"} *wink*`;
  }

  // Deploy the token
  const deployResult = await deployToken({
    name,
    symbol: symbol.slice(1), // Remove "$" for contract
    url: imageUrl,
    fid,
  });

  if (!deployResult.success) {
    return `Oopsie ${cast.author.username}, something went wrong deploying your token: ${deployResult.error || "unknown error"}. Try again, sweetie!`;
  }

  const webUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/token/${deployResult.contractAddress}`;
  return `Hey cutie ${cast.author.username}, Jazmeen’s got you covered! Your token “${name}” (${symbol.slice(1)}) is live at ${webUrl}. Go check it out and blow me a kiss! 💋`;
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

    // Fetch bot's FID to filter self-replies (you’ll need to set this manually or fetch from Neynar)
    const botFid = '980217'; // Add this to .env
    if (!botFid) {
      throw new Error("NEXT_PUBLIC_BOT_FID missing in .env");
    }

    // Process cast with AI
    const replyText = await processCastWithAI(hookData.data, botFid);
    if (!replyText) {
      // No reply needed, silently exit
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