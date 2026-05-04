import { FaStar, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BookingCard({ car }) {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-1">
      {/* Price Card */}
      <div className="bg-white dark:bg-softBlack rounded-lg border border-gray-200 dark:border-white/10 mb-4 sticky top-4 transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">${car.price}</span>
            <span className="text-gray-500 dark:text-gray-400">/day</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-gray-900 dark:text-white">{car.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">({car.reviews} reviews)</span>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={() => car.available && navigate("/reservation")}
            className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              car.available
                ? "bg-green hover:bg-green text-black cursor-pointer"
                : "bg-gray dark:bg-gray text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
            disabled={!car.available}
          >
            <span>→</span>
            {car.available ? "Book Now" : "Not Available"}
          </button>

          <p className="text-center text-black dark:text-grayLight text-xs mt-3">
            Free cancellation · No hidden fees
          </p>
        </div>
      </div>

      {/* Need Help Card */}
      <div className="bg-white dark:bg-softBlack rounded-lg border border-gray-200 dark:border-softBlack p-6 transition-colors duration-300">
        <h3 className="font-bold text-gray-900 dark:text-grayLight mb-3">Need help?</h3>
        <p className="text-gray-500 dark:text-grayLight text-sm mb-4">
          Our team is available 24/7 to assist with your booking.
        </p>
        <button className="w-full border-2 border-green dark:text-black dark:border-green bg-green py-2 rounded-lg font-bold hover:bg-green dark:hover:bg-green transition flex items-center justify-center gap-2">
          <FaPhone className="w-4 h-4" />
          Call 1-800-DRIVE-IT
        </button>
      </div>
    </div>
  );
}

