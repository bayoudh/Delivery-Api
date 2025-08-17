import mongoose, { Schema } from "mongoose";
const DriverSchema = new Schema({
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
}, { timestamps: true });
export const Driver = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
