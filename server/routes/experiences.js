import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

// ✅ 1️⃣ Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ✅ 2️⃣ Get one experience by ID
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found." });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
