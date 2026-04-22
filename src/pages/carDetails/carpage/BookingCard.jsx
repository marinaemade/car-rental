// import { FaStar, FaPhone } from "react-icons/fa";

export default function BookingCard({ car }) {
  return (
    <div className="lg:col-span-1">
      {/* Price Card */}
      <div className="bg-white rounded-lg border mb-4 sticky top-4">
        <div className="p-6 border-b">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-4xl font-bold text-gray-900">${car.price}</span>
            <span className="text-gray-600">/day</span>
          </div>
          <div className="flex items-center gap-1 mb-4">
            {/* <FaStar className="w-4 h-4 text-yellow-400" /> */}
            <span className="font-bold">{car.rating}</span>
            <span className="text-gray-600 text-sm">({car.reviews} reviews)</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Pickup Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              disabled={!car.available}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Return Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              disabled={!car.available}
            />
          </div>

          <button
            className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              car.available
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!car.available}
          >
            <span>→</span>
            {car.available ? "Sign In to Book" : "Not Available"}
          </button>

          <p className="text-center text-gray-600 text-xs mt-3">Free cancellation · No hidden fees</p>
        </div>
      </div>

      {/* Need Help Card */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold text-gray-900 mb-3">Need help?</h3>
        <p className="text-gray-600 text-sm mb-4">Our team is available 24/7 to assist with your booking.</p>
        <button className="w-full border-2 border-green-500 text-green-500 py-2 rounded-lg font-bold hover:bg-green-50 transition flex items-center justify-center gap-2">
          {/* <FaPhone className="w-4 h-4" /> */}
          Call 1-800-DRIVE-IT
        </button>
      </div>
    </div>
  );
}
