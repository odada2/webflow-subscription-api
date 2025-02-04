import Stripe from "stripe";
import SubscriptionRepository from "../repositories/subscription.repository";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) || "2025-01-27.acacia",
});

export default class SubscriptionService {
  /**
   * Creates a new subscription.
   */
  static async createSubscription(userId: string, planId: string) {
    const customer = await stripe.customers.create({ metadata: { userId } });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: planId }],
      expand: ["latest_invoice.payment_intent"],
    });

    return SubscriptionRepository.create(userId, subscription.id, subscription.status, planId);
  }

  /**
   * Updates an existing subscription (plan upgrade/downgrade).
   */
  static async updateSubscription(subscriptionId: string, newPlanId: string) {
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{ price: newPlanId }],
      proration_behavior: "create_prorations",
    });

    return SubscriptionRepository.update(subscriptionId, updatedSubscription.status, newPlanId);
  }

  /**
   * Cancels a subscription.
   */
  static async cancelSubscription(subscriptionId: string) {
    await stripe.subscriptions.cancel(subscriptionId); // ✅ Corrected method
    return SubscriptionRepository.cancel(subscriptionId);
  }

  /**
   * Handles successful payments.
   */
  static async markPaymentSuccess(subscriptionId: string) {
    console.log(`✅ Payment successful for subscription: ${subscriptionId}`);
    return SubscriptionRepository.update(subscriptionId, "active");
  }

  /**
   * Handles failed payments.
   */
  static async markPaymentFailure(subscriptionId: string) {
    console.log(`🚨 Payment failed for subscription: ${subscriptionId}`);
    return SubscriptionRepository.update(subscriptionId, "past_due");
  }

  /**
   * Retrieves a single subscription.
   */
  static async getSubscription(subscriptionId: string) {
    return SubscriptionRepository.findById(subscriptionId);
  }

  /**
   * Lists all subscriptions (Admin access).
   */
  static async listSubscriptions() {
    return SubscriptionRepository.findAll();
  }
}
