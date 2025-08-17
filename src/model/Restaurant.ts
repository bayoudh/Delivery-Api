import  mongoose, { Schema, Document } from "mongoose";
export interface IRestaurant extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  zipcode?: string;
  status: "active" | "closed";
  restaurant_photo?: string;
  created_at: Date;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, maxlength: 100 },
    email: String,
    phone: String,
    street: String,
    city: String,
    zipcode: String,
    status: { type: String, enum: ["active", "closed"], default: "active" },
    restaurant_photo: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);
export const Restaurant = mongoose.models.Restaurant || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
