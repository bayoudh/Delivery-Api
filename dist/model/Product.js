import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    product_photo: String,
}, { timestamps: true });
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
