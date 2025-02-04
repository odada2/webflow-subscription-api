import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import SubscriptionService from "../core/services/subscription.service";

dotenv.config();

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) || "2025-01-27.acacia",
});

export default class StripeWebhookHandler {
  /**
   * Handles incoming Stripe webhook events securely.
   */
  static async handleWebhook(req: Request, res: Response): Promise<void> {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !endpointSecret) {
      console.error("🚨 Missing Stripe signature or webhook secret");
      res.status(400).send("Webhook error: Missing security credentials.");
      return;
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);
    } catch (error) {
      console.error("🚨 Webhook Signature Verification Failed:", error);
      res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      return;
    }

    try {
      switch (event.type) {
        case "customer.subscription.created":
          await StripeWebhookHandler.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;
        case "customer.subscription.updated":
          await StripeWebhookHandler.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        case "customer.subscription.deleted":
          await StripeWebhookHandler.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        case "invoice.payment_succeeded":
          await StripeWebhookHandler.handlePaymentSuccess(event.data.object as Stripe.Invoice);
          break;
        case "invoice.payment_failed":
          await StripeWebhookHandler.handlePaymentFailure(event.data.object as Stripe.Invoice);
          break;
        default:
          console.warn(`⚠️ Unhandled event type: ${event.type}`);
      }

      res.status(200).send("Webhook received.");
    } catch (error) {
      console.error("🚨 Webhook processing error:", error);
      res.status(500).send(`Internal Server Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /** Handles new subscription creation */
  private static async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    console.log("✅ New Subscription Created:", subscription.id);
    await SubscriptionService.createSubscription(subscription.customer as string, subscription.items.data[0].price.id);
  }

  /** Handles subscription updates */
  private static async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    console.log("🔄 Subscription Updated:", subscription.id);
    await SubscriptionService.updateSubscription(subscription.id, subscription.items.data[0].price.id);
  }

  /** Handles subscription cancellations */
  private static async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log("❌ Subscription Canceled:", subscription.id);
    await SubscriptionService.cancelSubscription(subscription.id);
  }

  /** Handles successful payments */
  private static async handlePaymentSuccess(invoice: Stripe.Invoice) {
    console.log("💰 Payment Succeeded:", invoice.id);
    if (invoice.subscription) {
      await SubscriptionService.markPaymentSuccess(invoice.subscription as string);
    }
  }

  /** Handles failed payments */
  private static async handlePaymentFailure(invoice: Stripe.Invoice) {
    console.log("🚨 Payment Failed:", invoice.id);
    if (invoice.subscription) {
      await SubscriptionService.markPaymentFailure(invoice.subscription as string);
    }
  }
}
