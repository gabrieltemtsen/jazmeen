/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateMessageResponse } from "@ai16z/eliza";
import { ElizaService } from "./eliza.service.js";
import { Bot, Context } from "grammy";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_SIGNER_UUID = process.env.NEYNAR_SIGNER_UUID;

export class FarcasterService {
  private elizaService: ElizaService;

  constructor() {
    // Initialize a dummy bot since it's required for ElizaService
    const dummyBot = new Bot<Context>("dummy-token"); // Replace with a valid bot token if needed
    this.elizaService = ElizaService.getInstance(dummyBot);
  }
  public async handleCastEvent(cast: any): Promise<string> {
    const context = cast.text;
    const response = await generateMessageResponse(context);

    if (response) {
      await this.sendFarcasterResponse(response.text, cast.hash);
      return "Response sent successfully.";
    } else {
      return "Failed to generate response.";
    }
  }

  /**
   * Generates a response using Eliza's AI.
   * @param context The response context.
   */
  // private async generateElizaResponse(context: string): Promise<Content | null> {
  //   try {
  //     return await generateMessageResponse({
  //       runtime: this.elizaService.getRuntime(),
  //       context,
  //       modelClass: ModelClass.MEDIUM,
  //     });
  //   } catch (error) {
  //     console.error("Error generating response with Eliza:", error);
  //     return null;
  //   }
  // }

  /**
   * Sends a response to Farcaster.
   * @param response The response text.
   * @param inReplyToHash The hash of the cast to reply to.
   */
  public async sendFarcasterResponse(
    response: string,
    inReplyToHash: string
  ): Promise<void> {
    try {
      console.log(this.elizaService);
      const responseBody = {
        signer_uuid: NEYNAR_SIGNER_UUID,
        text: response,
        reply_to_hash: inReplyToHash,
      };

      const res = await fetch("https://api.neynar.com/v2/farcaster/cast", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          ...(NEYNAR_API_KEY && { api_key: NEYNAR_API_KEY }),
        },
        body: JSON.stringify(responseBody),
      });

      if (!res.ok) {
        console.error(
          "Failed to send response to Farcaster:",
          await res.text()
        );
      } else {
        console.log("Response sent successfully to Farcaster.");
      }
    } catch (error) {
      console.error("Error sending response to Farcaster:", error);
    }
  }
}
