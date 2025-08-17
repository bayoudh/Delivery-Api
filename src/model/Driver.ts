import  mongoose, { Schema, Document } from "mongoose";

export interface IDriver extends Document{
  user_id: mongoose.Types.ObjectId;
  vehicle_type?: string;
  plate_number?: string;
  status: "available" | "on_delivery" | "offline";
  current_lat?: number;
  current_lng?: number;
  driver_photo?: string;

}
const DriverSchema = new Schema<IDriver>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicle_type: String,
    plate_number: String,
    status: {
      type: String,
      enum: ["available", "on_delivery", "offline"],
      default: "available",
    },
    current_lat: Number,
    current_lng: Number,
    driver_photo: String,
  },
  { timestamps: true }
);
export const Driver = mongoose.models.Driver || mongoose.model<IDriver>("Driver", DriverSchema);
