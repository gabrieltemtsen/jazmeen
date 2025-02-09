import { Router, Request, Response, NextFunction } from "express";
import { FarcasterService } from "src/services/farcaster.service.js";

const router = Router();
const farcasterService = new FarcasterService();

// Middleware to validate the payload (optional)
const validatePayload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.body.cast) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  next();
};

// Webhook handler for Farcaster
const handleFarcasterWebhook = async (req: Request, res: Response) => {
  try {
    const { cast } = req.body;

    console.log("Received Farcaster webhook:", cast);

    // Process the cast using the FarcasterService
    const response = await farcasterService.handleCastEvent(cast);

    res.status(200).json({
      message: "Cast processed successfully",
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error handling Farcaster webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/farcaster/webhook", validatePayload, handleFarcasterWebhook);

export default router;
