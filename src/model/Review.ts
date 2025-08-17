import  mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  order_id: mongoose.Types.ObjectId;
  customer_id: mongoose.Types.ObjectId;
  restaurant_id: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  created_at: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
