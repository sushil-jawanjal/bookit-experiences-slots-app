import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  ref: {
    type: String, // unique booking reference code
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "confirmed",
    enum: ["confirmed", "cancelled"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
