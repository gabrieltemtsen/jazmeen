/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CeramicDocument } from "@useorbis/db-sdk";
import { Orbis, type ServerMessage } from "./orbis.service.js";
import axios, { AxiosInstance } from "axios";
import { elizaLogger, getEmbeddingZeroVector, Memory } from "@ai16z/eliza";

const chainId = 8453;
console.log("Chain ID:", chainId);
const OPENAI_EMBEDDINGS = Boolean(process.env.USE_OPENAI_EMBEDDING ?? "false");

export class StorageService {
  private static instance: StorageService;
  private orbis: Orbis | null;
  private client: AxiosInstance | null;
  private started: boolean;

  private constructor() {
    this.orbis = null;
    this.client = null;
    this.started = false;
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async start(): Promise<void> {
    if (this.started) {
      console.warn("StorageService already started");
      return;
    }
    try {
      this.orbis = Orbis.getInstance();
      this.client = axios.create({
        baseURL: process.env.COLLABLAND_API_URL || "",
        headers: {
          "X-API-KEY": process.env.COLLABLAND_API_KEY || "",
          "X-TG-BOT-TOKEN": process.env.TELEGRAM_BOT_TOKEN || "",
          "Content-Type": "application/json",
        },
        timeout: 5 * 60 * 1000,
      });
      console.log("StorageService started");
      this.started = true;
    } catch (error) {
      console.warn("Error starting StorageService:", error);
    }
  }

  isConfigured(): boolean {
    if (!this.orbis) {
      elizaLogger.info(
        "[storage.service] Orbis is not initialized. Gated data is disabled."
      );
      return false;
    }
    if (!OPENAI_EMBEDDINGS) {
      elizaLogger.info(
        "[storage.service] Not using OPENAI embeddings. Gated data is disabled."
      );
      return false;
    }
    if (!this.client) {
      elizaLogger.warn(
        "[storage.service] Client is not initialized. Gated data is disabled."
      );
      return false;
    }
    return true;
  }

  async storeMessageWithEmbedding(
    context: string,
    embedding: number[],
    is_user: boolean
  ): Promise<CeramicDocument | null> {
    if (!this.isConfigured()) {
      return null;
    }
    if (embedding == getEmbeddingZeroVector()) {
      throw new Error(
        "Message embedding must not be the zero vector to persist"
      );
    }
    try {
      const content = {
        content: JSON.stringify({ message: context }), // Simplified without encryption
        embedding,
        is_user,
      };
      const doc = await this.orbis!.updateOrbis(content as ServerMessage);
      return doc;
    } catch (error) {
      elizaLogger.error("[storage.service] Error storing message:", error);
      throw error;
    }
  }

  async getEmbeddingContext(array: number[]): Promise<string | null> {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const context = await this.orbis!.queryKnowledgeEmbeddings(array);
      if (!context) {
        return null;
      }

      const rows = context.rows.map((row) => {
        try {
          if (!row?.content) {
            elizaLogger.warn(
              "[storage.service] embedding missing content for a row"
            );
            return null;
          }
          const { message } = JSON.parse(row.content);
          return message || null; // Decrypt call removed; directly return the message
        } catch (err) {
          elizaLogger.warn(
            "[storage.service] Exception processing row content",
            err
          );
          return null;
        }
      });

      const filteredRows = rows.filter((row) => row !== null);
      return filteredRows.join(" ");
    } catch (error) {
      console.error("Error getting embedded context:", error);
      throw error;
    }
  }

  static isMemoryStorable(memory: Memory): boolean {
    if (OPENAI_EMBEDDINGS && memory?.embedding != getEmbeddingZeroVector()) {
      return true;
    }
    return false;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const maskEmbedding = (key: any, value: any): any => {
  if (key === "embedding") {
    if (value === getEmbeddingZeroVector()) {
      return "[masked zero embedding]";
    } else {
      return "[maskedEmbedding]";
    }
  }
  return value;
};
