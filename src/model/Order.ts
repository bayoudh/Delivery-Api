import  mongoose, { Schema, Document } from "mongoose";
export interface IOrder extends Document {
  customer_id: mongoose.Types.ObjectId;
  restaurant_id: mongoose.Types.ObjectId;
  driver_id?: mongoose.Types.ObjectId;
  total_price: number;
  status: "pending" | "preparing" | "on_the_way" | "delivered" | "canceled";
  payment_method: "cash" | "card";
  delivery_street?: string;
  delivery_city?: string;
  delivery_zipcode?: string;
  created_at: Date;
  updated_at: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
