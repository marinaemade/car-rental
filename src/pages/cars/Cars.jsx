import { useEffect, useState, useMemo } from "react";
import CarCard from "./CarCard";
import { Typography, Button } from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
  const [transmission, setTransmission] = useState("All");
  const [fuelType, setFuelType] = useState("All");

  const pageSize = 8;
  const categories = [
    "All",
    "Sedan",
    "SUV",
    "Sports",
    "Electric",
    "Luxury",
    "Compact",
  ];

  const maxPrice = useMemo(
    () => Math.max(...cars.map((c) => c.price), 500),
    [cars],
  );

  useEffect(() => {
    if (cars.length > 0) {
      setPriceRange(maxPrice);
    }
  }, [maxPrice]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...cars];
    if (selectedCategory !== "All")
      result = result.filter((car) => car.category === selectedCategory);
    if (searchTerm)
      result = result.filter((car) =>
        `${car.brand} ${car.model}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
    result = result.filter((car) => car.price <= priceRange);
    if (transmission !== "All")
      result = result.filter((car) => car.transmission === transmission);
    if (fuelType !== "All")
      result = result.filter((car) => car.fuelType === fuelType);
    return result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [
    cars,
    selectedCategory,
    searchTerm,
    priceRange,
    transmission,
    fuelType,
    sortBy,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    searchTerm,
    priceRange,
    transmission,
    fuelType,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredCars.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const visibleCars = filteredCars.slice(start, start + pageSize);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange(maxPrice);
    setTransmission("All");
    setFuelType("All");
    setSortBy("featured");
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-black text-gray-900 dark:text-white text-center py-20 min-h-screen transition-colors duration-300">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-white  min-h-screen text-gray-900 dark:text-white transition-colors duration-300 mt-7">
      {/* Header */}
      <div className="py-12 px-8 border-b border-gray-200 bg-dark dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <Typography className="text-green dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-2">
            OUR FLEET
          </Typography>
          <Typography
            variant="h1"
            className="text-5xl font-bold mb-3 text-white "
          >
            Browse All <span className="text-white ">Vehicles</span>
          </Typography>
        </div>
      </div>

      {/* Categories */}
      <div className="py-6 px-8 dark:border-white/10">
        <div className="mx-auto max-w-7xl flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap border ${
                selectedCategory === cat
                  ? "bg-green text-black border-green"
                  : "bg-transparent dark:bg-blue-gray-300 dark:text-white border-gray dark:border-white/20 "
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 px-8 border-b    dark:border-black   dark:bg-blue-gray-300">
        <div className="mx-auto max-w-7xl">
          <div className="py-8 px-8 dark:bg-blue-gray-300">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Search */}
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 p-2">
                  <MagnifyingGlassIcon className="h-4 w-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search Vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Transmission */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 p-2">
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Transmissions</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 p-2">
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Fuel Types</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="bg-white dark:bg-gray rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 p-3">
                  <Typography className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Max Price:{" "}
                    <span className="text-darkGreen dark:text-green-400 font-semibold">
                      ${priceRange}
                    </span>
                    /day
                  </Typography>

                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="1"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    style={{
                      accentColor: "#22c55e",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {/* Clear Filters Button */}
                  {(searchTerm ||
                    selectedCategory !== "All" ||
                    transmission !== "All" ||
                    fuelType !== "All" ||
                    priceRange !== maxPrice) && (
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300 px-4 py-2 rounded-full transition"
                    >
                      <span>✕</span>
                      <span>Clear Filters</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Typography className="text-gray-500 dark:text-gray-400 text-sm">
              Showing{" "}
              <span className="text-gray-900 dark:text-white font-semibold">
                {filteredCars.length > 0 ? start + 1 : 0} –{" "}
                {Math.min(start + pageSize, filteredCars.length)}
              </span>{" "}
              of{" "}
              <span className="text-gray-900 dark:text-white font-semibold">
                {filteredCars.length}
              </span>{" "}
              vehicles
            </Typography>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  rounded-lg px-4 py-2 text-sm transition appearance-none cursor-pointer
                  bg-gray-100 border border-gray-300 text-gray-900
                  dark:bg-gray-900 dark:border-white/20 dark:text-white
                  focus:outline-none focus:border-green-500 dark:focus:border-green-400
                "
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-md border border-gray-200 dark:border-transparent">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition ${
                    viewMode === "grid"
                      ? "bg-green-400 text-black"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                >
                  <SquaresPlusIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${
                    viewMode === "list"
                      ? "bg-green-400 text-black"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-8">
        <div className="mx-auto max-w-7xl">
          {visibleCars.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {visibleCars.map((car) => (
                <CarCard key={car.id} car={car} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-300 dark:border-white/20 rounded-2xl">
              <Typography className="text-gray-400 dark:text-gray-500 mb-4">
                No vehicles found matching your criteria.
              </Typography>
              <Button variant="text" color="green" onClick={handleReset}>
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="
                  px-4 py-2 rounded-lg text-sm font-semibold border transition
                  border-green text-gray-700 hover:bg-green bg-darkGreen
                  dark:border-white/20 dark:text-white dark:hover:bg-white/10
                  disabled:opacity-40 disabled:cursor-not-allowed 
                "
              >
                Previous
              </button>
              <Typography className="text-sm text-gray-500 dark:text-gray-400">
                Page{" "}
                <span className="text-gray-900 dark:text-white font-semibold">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="text-gray-900 dark:text-white font-semibold">
                  {totalPages}
                </span>
              </Typography>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="
                  px-4 py-2 rounded-lg text-sm font-semibold border transition
                  border-green text-gray-700 bg-darkGreen hover:bg-green
                  dark:border-green dark:text-white dark:hover:bg-white/10
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
