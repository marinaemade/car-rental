import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import carsData from "../../data/cars.json";
import { FaArrowLeft, FaStar, FaMapMarkerAlt } from "react-dom";
import CarSpecifications from "./CarSpecifications";
import BookingCard from "./carpage/BookingCard";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // تحويل id إلى string للمقارنة الآمنة
  const car = carsData.find((c) => String(c.id) === String(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🚗 Car not found</h2>
          <button
            onClick={() => navigate("/cars")}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition text-white"
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // إنشاء قائمة الصور (الصورة الأساسية + صور إضافية)
  const images = [car.image, car.image, car.image];

  // الحصول على سيارات مشابهة
  const similarCars = carsData
    .filter((c) => c.category === car.category && c.id !== car.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            {/* <FaArrowLeft className="w-5 h-5" /> */}
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-4 relative bg-gray-100 rounded-lg overflow-hidden h-96">
              <img
                src={images[selectedImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />

              {/* Image Counter */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  ❤️
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  📤
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mb-8">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImageIndex === idx
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Car Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {car.category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {car.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {car.brand} {car.model}
                  </h1>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-2">
                    {/* <FaStar className="w-5 h-5 text-yellow-400" /> */}
                    <span className="font-bold text-lg">{car.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    ({car.reviews} reviews)
                  </p>
                </div>
              </div>

              {/* Year, Location, Mileage */}
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">{car.year}</span>
                </span>
                <span className="flex items-center gap-1">
                  {/* <FaMapMarkerAlt className="w-4 h-4" /> */}
                  {car.location}
                </span>
                <span>22,000 km</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>

            {/* Use CarSpecifications Component */}
            <CarSpecifications
              car={car}
              similarCars={similarCars}
              navigate={navigate}
            />
          </div>

          {/* Use BookingCard Component */}
          <BookingCard car={car} />
        </div>
      </div>
    </div>
  );
}
