import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { authMiddleware } from "../middlewares/auth.middleware"; // Ensure import is correct

const router = Router();

router.post("/", authMiddleware, SubscriptionController.createSubscription);
router.patch("/:id", authMiddleware, SubscriptionController.updateSubscription);
router.delete("/:id", authMiddleware, SubscriptionController.cancelSubscription);
router.get("/:id", authMiddleware, SubscriptionController.getSubscription);
router.get("/", authMiddleware, SubscriptionController.listSubscriptions);

export default router;
