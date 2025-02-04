import mongoose, { Document, Schema, Types } from "mongoose";

/**
 * Subscription Interface
 */
export interface ISubscription extends Document {
  userId: Types.ObjectId;
  stripeSubscriptionId: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  plan: string;
  startDate: Date;
  endDate?: Date;
}

/**
 * Subscription Schema
 */
const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Fixed ObjectId typing
    stripeSubscriptionId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "canceled", "past_due", "trialing"], required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

// ✅ Export Mongoose Model
const SubscriptionModel = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
export default SubscriptionModel;
