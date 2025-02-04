import { Router } from "express";
import StripeWebhookHandler from "../../webhooks/stripe.webhook"; // Ensure correct path

const router = Router();

router.post("/", StripeWebhookHandler.handleWebhook);

export default router;
