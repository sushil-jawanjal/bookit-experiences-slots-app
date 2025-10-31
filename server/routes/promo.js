import express from "express";
import Promo from "../models/Promo.js";

const router = express.Router();

// ✅ POST /api/promo/validate
router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Promo code is required.",
      });
    }

    const promo = await Promo.findOne({ code: code.trim(), isActive: true });

    if (!promo) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: "Invalid or expired promo code.",
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      discountType: promo.discountType,
      amount: promo.amount,
      message: "Promo code applied successfully.",
    });
  } catch (error) {
    console.error("Error validating promo:", error);
    res.status(500).json({
      success: false,
      message: "Server error while validating promo.",
    });
  }
});

export default router;
