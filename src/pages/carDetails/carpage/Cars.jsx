import { useEffect, useState } from "react";
import carsData from "../../../data/cars.json";
import CarCard from "./CarCard";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  useEffect(() => {
    setCars(carsData);
  }, []);

  // حساب الـ pagination
  const totalPages = Math.ceil(cars.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const visibleCars = cars.slice(start, start + pageSize);

  // التحقق من إمكانية الذهاب للصفحة التالية/السابقة
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // عرض رسالة إذا لم توجد سيارات
  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚗 No cars available
          </h2>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-5">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Our Fleet</h1>
        <p className="text-gray-400">
          Showing {start + 1} - {Math.min(start + pageSize, cars.length)} of{" "}
          {cars.length} vehicles
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${
              canGoPrev
                ? "bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {/* <FaChevronLeft className="w-5 h-5" /> */}
            Previous
          </button>

          {/* Page Info */}
          <div className="text-white font-bold text-lg px-4 py-2 bg-gray-900 rounded-lg">
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${
              canGoNext
                ? "bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
            {/* <FaChevronRight className="w-5 h-5" /> */}
          </button>
        </div>

        {/* Page Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`w-3 h-3 rounded-full transition ${
                page === currentPage
                  ? "bg-amber-500 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              title={`Go to page ${page}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
