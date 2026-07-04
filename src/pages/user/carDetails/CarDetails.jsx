import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import {
  HeartIcon,
  ShareIcon,
  StarIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import CarSpecifications from "./CarSpecifications";
import BookingCard from "./BookingCard";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const getCarData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        const allCars = await response.json();
        const foundCar = allCars.find((c) => String(c.id) === String(id));

        if (foundCar) {
          setCar(foundCar);
          const similar = allCars
            .filter(
              (c) => c.category === foundCar.category && c.id !== foundCar.id,
            )
            .slice(0, 3);
          setSimilarCars(similar);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCarData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-softBlack flex flex-col justify-center items-center transition-colors duration-300">
        <Spinner color="green" className="h-12 w-12 mb-4" />
        <Typography className="text-gray-500 dark:text-gray animate-pulse">
          Loading Vehicle Details...
        </Typography>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex justify-center items-center px-8 transition-colors duration-300">
        <div className="text-center">
          <Typography
            variant="h2"
            className="text-gray-900 dark:text-white mb-6"
          >
            Vehicle Not Found
          </Typography>
          <button
            onClick={() => navigate("/cars")}
            className="flex items-center gap-2 bg-green text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition mx-auto"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Return to Fleet
          </button>
        </div>
      </div>
    );
  }

  const carImages = car.images || [car.image, car.image, car.image];

  return (
    <div className="py-24 px-4 sm:px-8 bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto dark:text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green dark:hover:text-green mb-8 transition group"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform  dark:text-white" />
          <Typography className="text-sm font-medium">
            Back to Results
          </Typography>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="group relative bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 aspect-video mb-6">
              <img
                src={carImages[selectedImageIndex]}
                alt={car.model}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex gap-3">
                <button className="p-3 bg-white dark:bg-black backdrop-blur-md rounded-2xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-red-500 hover:text-white transition">
                  <HeartIcon className="h-5 w-5" />
                </button>
                <button className="p-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-2xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-green hover:text-black transition">
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
              {carImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative min-w-[100px] h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-green scale-105"
                      : "border-gray-200 dark:border-white/5 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </button>
              ))}
            </div>

            {/* Header Info */}
            <div className="border-b border-gray-200 dark:border-white/10 pb-10 mb-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                  <div className="flex gap-3 mb-4">
                    <span className="bg-darkGreen text-black dark:text-white border border-green px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {car.category}
                    </span>
                    {car.available && (
                      <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        Instant Booking
                      </span>
                    )}
                  </div>
                  <Typography
                    variant="h1"
                    className="text-gray-900 dark:text-white text-4xl md:text-5xl font-bold mb-4"
                  >
                    {car.brand}{" "}
                    <span className="text-green dark:text-green">
                      {car.model}
                    </span>
                  </Typography>
                  <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-900 dark:text-white font-bold">
                        {car.rating}
                      </span>
                      <span className="text-sm">({car.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-gray-200 dark:border-white/10 pl-6">
                      <MapPinIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-white mb-4"
              >
                Description
              </Typography>

              <Typography className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                {showFull
                  ? car.description ||
                    `Experience the ultimate drive with this ${car.year} ${car.brand} ${car.model}. Perfect for those who value performance and luxury.`
                  : (
                      car.description ||
                      `Experience the ultimate drive with this ${car.year} ${car.brand} ${car.model}. Perfect for those who value performance and luxury.`
                    ).slice(0, 120) + "..."}
              </Typography>

              {/* Button */}
              <button
                onClick={() => setShowFull(!showFull)}
                className="mt-2 text-darkGreen dark:text-darkGreen text-sm font-semibold hover:underline"
              >
                {showFull ? "Show Less" : "Show More"}
              </button>
            </div>

            {/* Specifications */}
            <CarSpecifications
              car={car}
              similarCars={similarCars}
              navigate={navigate}
            />
          </div>

          {/* Right Column: Booking */}
          <div className="relative">
            <div className="sticky top-24">
              <BookingCard car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
