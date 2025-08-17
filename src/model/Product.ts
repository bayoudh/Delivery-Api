import  mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
  restaurant_id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  product_photo?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    product_photo: String,
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
