import { Request, Response } from "express";
import SubscriptionService from "../../core/services/subscription.service";

export default class SubscriptionController {
  /**
   * Creates a new subscription.
   */
  static async createSubscription(req: Request, res: Response) {
    try {
      const { userId, planId } = req.body;
      const subscription = await SubscriptionService.createSubscription(userId, planId);
      res.status(201).json(subscription);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errMessage });
    }
  }

  /**
   * Updates an existing subscription.
   */
  static async updateSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { planId } = req.body;
      const updatedSubscription = await SubscriptionService.updateSubscription(id, planId);
      res.json(updatedSubscription);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errMessage });
    }
  }

  /**
   * Cancels a subscription.
   */
  static async cancelSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await SubscriptionService.cancelSubscription(id);
      res.status(204).send();
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errMessage });
    }
  }

  /**
   * Retrieves a subscription.
   */
  static async getSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subscription = await SubscriptionService.getSubscription(id);
      res.json(subscription);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errMessage });
    }
  }

  /**
   * Lists all subscriptions.
   */
  static async listSubscriptions(_req: Request, res: Response) { // ✅ Fixed unused req issue
    try {
      const subscriptions = await SubscriptionService.listSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errMessage });
    }
  }
}
