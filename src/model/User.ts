import  mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
  role: "customer" | "driver" | "restaurant";
  profile_photo?: string;
  created_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password_hash: { type: String, required: true },
    phone: { type: String, maxlength: 20 },
    role: {
      type: String,
      enum: ["customer", "driver", "restaurant"],
      default: "customer",
    },
    profile_photo: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);