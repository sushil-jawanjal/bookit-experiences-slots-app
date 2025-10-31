import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ref, success } = location.state || {};

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      {success ? (
        <>
          <div className="bg-green-100 rounded-full p-6 mb-6">
            {/* Green checkmark SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-bold text-2xl mb-2">Booking Confirmed</h2>
          <p className="text-lg mb-4">
            Ref ID: <span className="font-mono">{ref}</span>
          </p>
          <button
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded text-lg font-medium"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </>
      ) : (
        <>
          <div className="bg-red-100 rounded-full p-6 mb-6">
            {/* Red X SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="font-bold text-2xl mb-2">Booking Failed</h2>
          <p className="text-lg mb-4">Please try again, or contact support.</p>
          <button
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded text-lg font-medium"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </>
      )}
    </main>
  );
}
