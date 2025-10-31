import mongoose from "mongoose";

// Slot schema (subdocument)
const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  times: [
    {
      time: { type: String, required: true },
      capacity: { type: Number, required: true },
      booked: { type: Number, default: 0 },
    },
  ],
});

// Main experience schema
const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  image: String,
  slots: [slotSchema],
});

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
