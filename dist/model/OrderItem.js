import mongoose, { Schema } from "mongoose";
const OrderItemSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
}, { timestamps: true });
export const OrderItem = mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema);
