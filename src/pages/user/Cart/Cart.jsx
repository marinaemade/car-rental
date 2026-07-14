import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaLock,
} from "react-icons/fa";
import { useBooking } from "../../../context/BookingContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, updateCart } from "../../../api/CartApi";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { createBooking } from "./../../../api/BookingApi";
import Loading from './../../../components/common/Loading/Loading';

const Cart = () => {
  const { selectedCar, setSelectedCar, bookingData, setCart, cart, EditCart } = useBooking();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadCartData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCart();
        if (data) {
          setCart(data);
          localStorage.setItem("cartData", JSON.stringify(data));
        }
      } catch (error) {
        const savedCart = localStorage.getItem("cartData");
        if (savedCart) setCart(JSON.parse(savedCart));
      } finally {
        setIsLoading(false);
      }
    };
    loadCartData();
  }, [setCart]);

  const Edit = async (id) => {
    try {
      const updatedData = {
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        driverOption: bookingData.driverOption,
      };
      await updateCart(id, updatedData);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error);
    }
  };

  const date1 = new Date(bookingData?.pickupDate);
  const date2 = new Date(bookingData?.returnDate);
  const diffTime = Math.abs(date2 - date1);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const carPrice = selectedCar?.price || 0;
  const rowTotalCarPrice = carPrice * totalDays;
  const serviceFees = bookingData?.driverOption
    ?.toLowerCase()
    ?.includes("car with driver")
    ? 200
    : 0;
  const rowFinalTotal = rowTotalCarPrice + serviceFees;
  const totalCarPrice = rowTotalCarPrice.toLocaleString();
  const finalTotal = rowFinalTotal.toLocaleString();

  if (isLoading) {
    return <Loading/>;
  }

  const handleBooking = () => {
    const newBooking = {
      carId: selectedCar._id || selectedCar.id,
      carName: selectedCar.carName || `${selectedCar.brand} ${selectedCar.model}`,
      startDate: bookingData.pickupDate,
      endDate: bookingData.returnDate,
      totalPrice: rowFinalTotal,
    };

    createBooking(newBooking)
      .then(() => {
        setSuccessMessage("Booking done successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/user-bookings");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        alert("Booking failed.");
      });
  };

  return (
    <div className="mt-14 min-h-screen bg-gray-50 dark:bg-dark text-black dark:text-white p-4 sm:p-6 lg:p-8 pt-24 sm:pt-32 transition-colors duration-300">
      {cart && selectedCar ? (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:items-start">
          
          {/* Left Column: Car Details Card */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Selected Cars (1)
            </h2>

            <div className="bg-white dark:bg-surface rounded-3xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-stretch gap-6 border border-gray-100 dark:border-lightDark transition-all">
              <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
                <img
                  src={selectedCar?.image}
                  alt={selectedCar?.model}
                  className="w-full h-48 sm:h-56 md:h-full min-h-[180px] object-cover rounded-2xl"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between space-y-4 md:space-y-0">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                      {selectedCar?.brand} {selectedCar?.model}
                    </h3>
                    <span className="text-xs font-semibold tracking-wider text-green-700 bg-green-50 dark:bg-darkGreen/20 dark:text-softGreen px-2.5 py-1 rounded-md uppercase">
                      SPORTS
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-grayLight">
                    <p className="flex items-center gap-2.5">
                      <FaCalendarAlt className="text-gray-400 dark:text-gray flex-shrink-0" /> 
                      <span><strong className="text-gray-900 dark:text-white font-medium">From:</strong> {bookingData?.pickupDate}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <FaCalendarAlt className="text-gray-400 dark:text-gray flex-shrink-0" /> 
                      <span><strong className="text-gray-900 dark:text-white font-medium">To:</strong> {bookingData?.returnDate}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <FaClock className="text-gray-400 dark:text-gray flex-shrink-0" /> 
                      <span><strong className="text-gray-900 dark:text-white font-medium">Duration:</strong> {totalDays} days</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <FaMoneyBillWave className="text-gray-400 dark:text-gray flex-shrink-0" /> 
                      <span><strong className="text-gray-900 dark:text-white font-medium">Rate:</strong> ${selectedCar?.price}/day</span>
                    </p>
                    <p className="sm:col-span-2 text-xs bg-gray-50 dark:bg-softBlack p-2 rounded-lg border border-gray-100 dark:border-lightDark/50">
                      <span className="font-medium text-gray-900 dark:text-white">Driver Option:</span> {bookingData?.driverOption || "None selected"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 dark:border-lightDark/60 gap-4">
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray">Car total:</p>
                    <p className="text-2xl font-black text-green dark:text-softGreen">
                      ${totalCarPrice}
                    </p>
                  </div>
                  
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        localStorage.setItem("carToEdit", JSON.stringify(selectedCar));
                        navigate("/reservation");
                      }}
                      className="flex-1 sm:flex-none border border-gray-300 dark:border-lightDark text-gray-700 dark:text-grayLight px-5 py-2 rounded-xl text-sm font-medium bg-transparent hover:bg-gray-50 dark:hover:bg-lightDark transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setCart(null);
                        if (setSelectedCar) setSelectedCar(null);
                        localStorage.removeItem("cartData");
                      }}
                      className="flex-1 sm:flex-none border border-red-200 dark:border-red-900/40 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-5 py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary Panel */}
          <div className="w-full lg:w-80 sm:w-96 lg:max-w-none mx-auto lg:mx-0 bg-white dark:bg-surface rounded-3xl shadow-sm p-6 space-y-5 border border-gray-100 dark:border-lightDark transition-all lg:mt-12">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Order Summary
            </h3>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-grayLight">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500 dark:text-gray">Cars</span>
                <span className="font-semibold text-gray-900 dark:text-white">1</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500 dark:text-gray">Total Days</span>
                <span className="font-semibold text-gray-900 dark:text-white">{totalDays} days</span>
              </div>
              <hr className="border-gray-100 dark:border-lightDark" />
              <div className="flex justify-between">
                <span className="font-medium text-gray-500 dark:text-gray">Total Price</span>
                <span className="font-semibold text-gray-900 dark:text-white">${totalCarPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500 dark:text-gray">Service Fees</span>
                <span className="font-semibold text-gray-900 dark:text-white">${serviceFees}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-lightDark rounded-2xl p-4 text-center border border-gray-100/50 dark:border-transparent">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray">Final Total</p>
              <p className="text-green dark:text-softGreen text-3xl font-black mt-1">${finalTotal}</p>
            </div>

            {successMessage && (
              <div className="fixed top-6 right-6 bg-green text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-fade-in">
                {successMessage}
              </div>
            )}
            
            <button
              onClick={handleBooking}
              className="w-full bg-green text-white py-3.5 rounded-2xl font-semibold text-sm shadow-sm hover:bg-darkGreen transition-all hover:shadow-md"
            >
              Book Now
            </button>

            <p className="text-xs text-center text-gray-400 dark:text-gray flex items-center justify-center gap-1.5 pt-1">
              <FaLock className="text-gray-400/80" /> 100% Secure Payment
            </p>

            {/* Insurance Info Unit */}
            <div className="bg-[#F1FAF5] dark:bg-softBlack border border-[#DDF7E9] dark:border-darkGreen/20 rounded-2xl p-4 flex items-start gap-3.5 mt-6">
              <div className="bg-[#bbf7d0] dark:bg-darkGreen/20 p-2 rounded-xl flex-shrink-0 mt-0.5">
                <ShieldCheckIcon className="w-5 h-5 text-green-600 dark:text-softGreen" />
              </div>
              <div className="space-y-0.5">
                <p className="text-green dark:text-softGreen font-bold text-sm">
                  All bookings are fully secured
                </p>
                <p className="text-gray-500 dark:text-gray text-xs leading-relaxed">
                  Full insurance coverage on cars throughout the rental period.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      ) : (
        /* Empty Cart State Viewport */
        <div className="max-w-md mx-auto flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
          <div className="bg-white dark:bg-surface p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-lightDark w-full transition-all">
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white tracking-tight">
              Your cart is currently empty
            </h2>
            <p className="text-gray-400 dark:text-gray mt-2.5 mb-8 text-sm sm:text-base">
              You haven't selected a car to book yet.
            </p>
            <button
              onClick={() => navigate("/cars")}
              className="w-full sm:w-auto bg-green text-white px-8 py-3 rounded-xl hover:bg-darkGreen transition-all text-sm font-semibold shadow-sm"
            >
              Browse available cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;