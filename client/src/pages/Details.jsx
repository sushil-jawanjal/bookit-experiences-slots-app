import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/experiences/${id}`)
      .then((res) => setExperience(res.data.data))
      .catch((err) => console.error("Error fetching experience:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSlotSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime)
      return alert("Please select a date and time first");

    navigate("/checkout", {
      state: {
        experience,
        selectedDate,
        selectedTime,
        quantity,
      },
    });
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!experience) return <p className="p-8">Experience not found.</p>;

  const price = experience.price || 999;
  const tax = Math.round(price * 0.06);
  const total = price * quantity + tax;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <Link to="/" className="flex items-center">
          <FaArrowLeft className="mr-2" />
          Details
        </Link>
      </div>
      <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* ===== Left Section ===== */}
        <section className="md:col-span-2">
          {/* Image */}
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-80 object-cover rounded-xl shadow mb-6"
          />

          {/* Title + Description */}
          <h1 className="text-2xl font-semibold mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          {/* ----- Choose Date ----- */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Choose Date</h3>
            <div className="flex gap-3 flex-wrap">
              {experience.slots?.map((slot) => (
                <button
                  key={slot.date}
                  onClick={() => {
                    setSelectedDate(slot.date);
                    setSelectedTime("");
                  }}
                  className={`px-4 py-2 rounded border transition text-sm font-medium
                  ${
                    selectedDate === slot.date
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "border-gray-300 hover:border-yellow-400"
                  }`}
                >
                  {slot.date}
                </button>
              ))}
            </div>
          </div>

          {/* ----- Choose Time ----- */}
          {selectedDate && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Choose Time</h3>
              <div className="flex gap-3 flex-wrap">
                {experience.slots
                  ?.find((s) => s.date === selectedDate)
                  ?.times?.map((t, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        t.booked < t.capacity &&
                        handleSlotSelect(selectedDate, t.time)
                      }
                      disabled={t.booked >= t.capacity}
                      className={`px-4 py-2 rounded border text-sm font-medium transition
                      ${
                        selectedTime === t.time
                          ? "bg-yellow-100 border-yellow-500"
                          : "border-gray-300 hover:border-yellow-400"
                      }
                      ${
                        t.booked >= t.capacity
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {t.time}{" "}
                      {t.booked >= t.capacity ? (
                        "Sold Out"
                      ) : (
                        <span className="text-red-500">
                          {`${t.capacity - t.booked} left`}
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* ----- About Section ----- */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-500 bg-gray-50 border rounded-lg p-3 text-sm">
              {experience.about ||
                "Scenic routes, trained guides, and safety briefing. Minimum age 10."}
            </p>
          </div>
        </section>

        {/* ===== Right Section (Booking Summary) ===== */}
        <aside className="bg-gray-100  rounded-2xl p-6 h-fit shadow-sm">
          <div className="flex justify-between ">
            <p className="text-sm text-gray-500 mb-2">Starts at</p>
            <h2 className="text-lg font-semibold mb-4">₹{price}</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Quantity</span>
            <div className="flex items-center  rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-1 py-1 text-lg "
              >
                –
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-1 py-1 text-lg "
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Subtotal</span>
            <span>₹{price * quantity}</span>
          </div>
          <div className="flex justify-between text-sm mb-1 mt-4">
            <span className="text-gray-500">Taxes</span>
            <span>₹{tax}</span>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between font-semibold text-lg mt-3 mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
          ${
            selectedDate && selectedTime
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          >
            Confirm
          </button>
        </aside>
      </main>
    </>
  );
}
