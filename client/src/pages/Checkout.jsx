import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedDate, selectedTime } = location.state || {};

  const [form, setForm] = useState({ name: "", email: "", promo: "" });
  const [promoStatus, setPromoStatus] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  if (!experience || !selectedDate || !selectedTime) {
    return (
      <p className="p-8 text-center text-gray-600">
        Invalid flow. Please select an experience and slot first.
      </p>
    );
  }

  const price = experience.price || 999;
  const taxes = Math.round(price * 0.06);

  // ✅ Validate Promo Code
  const validatePromo = async () => {
    if (!form.promo) return;
    try {
      const res = await axios.post("http://localhost:3000/api/promo/validate", {
        code: form.promo,
      });

      if (res.data.valid) {
        setPromoStatus("valid");
        let discountValue = 0;

        if (res.data.discountType === "flat") {
          discountValue = res.data.amount;
        } else if (res.data.discountType === "percent") {
          discountValue = Math.round((price * res.data.amount) / 100);
        }

        setDiscount(discountValue);
      } else {
        setPromoStatus("invalid");
        setDiscount(0);
      }
    } catch (err) {
      console.error("Promo validation error:", err);
      setPromoStatus("invalid");
      setDiscount(0);
    }
  };

  // ✅ Confirm Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/bookings", {
        experienceId: experience._id,
        name: form.name,
        email: form.email,
        date: selectedDate,
        time: selectedTime,
      });
      navigate("/result", { state: { ref: res.data.ref, success: true } });
    } catch (err) {
      navigate("/result", { state: { success: false }, message: { err } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center font-medium mb-2"
        >
          <FaArrowLeft className="mr-2" />
          Checkout
        </button>
      </div>

      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* ✅ Left Section */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="font-bold text-lg mb-6">Checkout</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name
              </label>
              <input
                className="w-full bg-gray-100 px-3 py-2 rounded-md outline-none"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-gray-100 px-3 py-2 rounded-md outline-none"
                placeholder="test@test.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Promo Input */}
          <div className="flex items-center gap-2 mb-4">
            <input
              className="flex-1 bg-gray-100 px-3 py-2 rounded-md outline-none"
              placeholder="Promo code"
              value={form.promo}
              onChange={(e) => {
                setForm({ ...form, promo: e.target.value });
                setPromoStatus(null);
                setDiscount(0);
              }}
            />
            <button
              type="button"
              onClick={validatePromo}
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
            >
              Apply
            </button>
            {promoStatus === "valid" && (
              <span className="text-green-600 font-medium">✓ Applied</span>
            )}
            {promoStatus === "invalid" && (
              <span className="text-red-600 font-medium">Invalid</span>
            )}
          </div>

          {/* Agreement */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
              required
            />
            <span className="text-xs text-gray-600">
              I agree to the terms and safety policy
            </span>
          </div>
        </form>

        {/* ✅ Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium">{experience.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date</span>
              <span>{selectedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Qty</span>
              <span>1</span>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{price + taxes - discount}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !agree}
            className={`w-full py-3 rounded-md font-semibold transition ${
              loading || !agree
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {loading ? "Booking..." : "Pay and Confirm"}
          </button>
        </div>
      </main>
    </>
  );
}
