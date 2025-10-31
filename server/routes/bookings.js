import express from "express";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js"; // For slot capacity check

const router = express.Router();

// 🧾 POST /bookings - Place a new booking
router.post("/", async (req, res) => {
  try {
    const { experienceId, name, email, date, time } = req.body;

    // 1️⃣ Validation
    if (!experienceId || !name || !email || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields required." });
    }

    // 2️⃣ Find the experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found." });
    }

    // 3️⃣ Find the selected slot & time
    const slot = experience.slots.find((s) => s.date === date);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot date not found." });
    }

    const selectedTime = slot.times.find((t) => t.time === time);
    if (!selectedTime) {
      return res.status(404).json({ success: false, message: "Time slot not found." });
    }

    // 4️⃣ Prevent overbooking
    if (selectedTime.booked >= selectedTime.capacity) {
      return res.status(400).json({ success: false, message: "Slot full." });
    }

    // 5️⃣ Check if user already booked same experience/date/time
    const existingBooking = await Booking.findOne({ email, experienceId, date, time });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "Already booked this slot." });
    }

    // 6️⃣ Create and save booking
    const booking = new Booking({
      experienceId,
      name,
      email,
      date,
      time,
      ref: `REF-${Date.now()}`,
    });

    await booking.save();

    // 7️⃣ Update slot booking count
    selectedTime.booked += 1;
    await experience.save();

    res.json({
      success: true,
      message: "Booking successful!",
      ref: booking.ref,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
