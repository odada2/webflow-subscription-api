import SubscriptionModel, { ISubscription } from "../../infrastructure/database/models/subscription.model";

export default class SubscriptionRepository {
  /**
   * Creates a new subscription record in the database.
   */
  static async create(userId: string, stripeSubscriptionId: string, status: string, planId: string): Promise<ISubscription> {
    return await SubscriptionModel.create({ userId, stripeSubscriptionId, status, plan: planId });
  }

  /**
   * Finds a subscription by ID.
   */
  static async findById(subscriptionId: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findOne({ stripeSubscriptionId: subscriptionId });
  }

  /**
   * Updates a subscription's status or plan.
   */
  static async update(subscriptionId: string, status: string, planId?: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      { status, ...(planId && { plan: planId }) },
      { new: true }
    );
  }

  /**
   * Marks a subscription as canceled in the database.
   */
  static async cancel(subscriptionId: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      { status: "canceled" },
      { new: true }
    );
  }

  /**
   * Fetches all subscriptions (Admin-only feature).
   */
  static async findAll(): Promise<ISubscription[]> {
    return await SubscriptionModel.find({});
  }
}
