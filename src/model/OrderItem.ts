import  mongoose, { Schema, Document } from "mongoose";
export interface IOrderItem extends Document {
  order_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
export const OrderItem = mongoose.models.OrderItem || mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);
