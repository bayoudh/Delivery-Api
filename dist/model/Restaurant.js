import mongoose, { Schema } from "mongoose";
const RestaurantSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, maxlength: 100 },
    email: String,
    phone: String,
    street: String,
    city: String,
    zipcode: String,
    status: { type: String, enum: ["active", "closed"], default: "active" },
    restaurant_photo: String,
}, { timestamps: { createdAt: "created_at", updatedAt: false } });
export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
