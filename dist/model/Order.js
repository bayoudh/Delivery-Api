import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    driver_id: { type: Schema.Types.ObjectId, ref: "User" },
    total_price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "preparing", "on_the_way", "delivered", "canceled"],
        default: "pending",
    },
    payment_method: { type: String, enum: ["cash", "card"], default: "cash" },
    delivery_street: String,
    delivery_city: String,
    delivery_zipcode: String,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
