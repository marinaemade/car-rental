// import { FaGasPump, FaCog, FaUsers, FaCalendarAlt, FaCheckCircle, FaShieldAlt, FaUndo, FaMapPin, FaStar } from "react-icons/fa";

export default function CarSpecifications({ car, similarCars, navigate }) {
  return (
    <div className="lg:col-span-2">
      {/* Vehicle Specifications */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Specifications</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            {/* <FaGasPump className="w-8 h-8 text-green-500 mx-auto mb-2" /> */}
            <p className="text-gray-600 text-sm">Fuel Type</p>
            <p className="font-bold text-gray-900">{car.fuelType}</p>
          </div>
          <div className="text-center">
            {/* <FaCog className="w-8 h-8 text-green-500 mx-auto mb-2" /> */}
            <p className="text-gray-600 text-sm">Transmission</p>
            <p className="font-bold text-gray-900">{car.transmission}</p>
          </div>
          <div className="text-center">
            {/* <FaUsers className="w-8 h-8 text-green-500 mx-auto mb-2" /> */}
            <p className="text-gray-600 text-sm">Seating</p>
            <p className="font-bold text-gray-900">{car.seats} Seats</p>
          </div>
          <div className="text-center">
            {/* <FaCalendarAlt className="w-8 h-8 text-green-500 mx-auto mb-2" /> */}
            <p className="text-gray-600 text-sm">Year</p>
            <p className="font-bold text-gray-900">{car.year}</p>
          </div>
        </div>

        {/* Additional Specs */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-gray-600 text-sm">Engine</p>
            <p className="font-bold text-gray-900">{car.engine || "3.0L V6"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Horsepower</p>
            <p className="font-bold text-gray-900">{car.horsepower || "434"} hp</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">0-60 mph</p>
            <p className="font-bold text-gray-900">{car.acceleration || "5.4s"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Top Speed</p>
            <p className="font-bold text-gray-900">{car.topSpeed || "149"} mph</p>
          </div>
        </div>
      </div>

      {/* Features & Amenities */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          {car.features && car.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {/* <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> */}
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Policy */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Policy</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 text-center">
            {/* <FaShieldAlt className="w-8 h-8 text-green-500 mx-auto mb-3" /> */}
            <h3 className="font-bold text-gray-900 mb-2">Full Insurance</h3>
            <p className="text-gray-600 text-sm">Comprehensive coverage included with all rentals.</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            {/* <FaUndo className="w-8 h-8 text-green-500 mx-auto mb-3" /> */}
            <h3 className="font-bold text-gray-900 mb-2">Free Cancellation</h3>
            <p className="text-gray-600 text-sm">Cancel for free up to 48 hours before pickup.</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            {/* <FaMapPin className="w-8 h-8 text-green-500 mx-auto mb-3" /> */}
            <h3 className="font-bold text-gray-900 mb-2">Flexible Pickup</h3>
            <p className="text-gray-600 text-sm">Pick up and drop off at any of our locations.</p>
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      {similarCars && similarCars.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-3 gap-4">
            {similarCars.map((similarCar) => (
              <div
                key={similarCar.id}
                onClick={() => navigate(`/cars/${similarCar.id}`)}
                className="cursor-pointer bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={similarCar.image}
                    alt={`${similarCar.brand} ${similarCar.model}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    {similarCar.category}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    ${similarCar.price}/day
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900">
                    {similarCar.brand} {similarCar.model}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    {/* <FaStar className="w-4 h-4 text-yellow-400" /> */}
                    <span className="font-bold">{similarCar.rating}</span>
                    <span className="text-gray-600">({similarCar.reviews})</span>

                  </div>

                       {/* <button
                    onClick={() => navigate(`/cars/${similarCar.id}`)}
                    className="mt-auto w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition"
                  >
                    View Details
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
