import mongoose, { Schema } from "mongoose";
const ReviewSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
}, { timestamps: { createdAt: "created_at", updatedAt: false } });
export const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
