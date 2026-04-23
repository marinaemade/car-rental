import { useNavigate } from "react-router-dom";

export default function CarCard({ car }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
      

      <div className="relative overflow-hidden bg-gray-800 h-48">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
  
        <div className="absolute top-3 right-3">
          {car.available ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">

              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Unavailable
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            {car.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        
        {/* Title */}
        <h2 className="font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">
          {car.brand} {car.model}
        </h2>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">{car.rating}</span>
          </div>
          <span className="text-gray-400">({car.reviews} reviews)</span>
        </div>

        {/* Location */}
        <p className="text-gray-400 text-sm mb-3">
          📍 {car.location}
        </p>

        {/* Year & Transmission */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-gray-800 p-2 rounded">
            <p className="text-gray-400">Year</p>
            <p className="font-bold">{car.year}</p>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <p className="text-gray-400">Trans.</p>
            <p className="font-bold">{car.transmission}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">Price</p>
          <p className="text-2xl font-bold text-amber-400">
            ${car.price} <span className="text-sm text-gray-400">/day</span>
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/cars/${car.id}`)}
          disabled={!car.available}
          className={`w-full py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            car.available
              ? "bg-amber-500 hover:bg-amber-600 text-black hover:shadow-lg hover:shadow-amber-500/50"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          View Details
        </button>
      </div>
    </div>
  );
}