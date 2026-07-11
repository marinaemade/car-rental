import React from "react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaLock } from "react-icons/fa";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useBooking } from "../../../context/BookingContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { selectedCar, bookingData, removeFromCart, removeFormCart } = useBooking();
  const navigate = useNavigate();

  const deleteHandler = removeFormCart || removeFromCart;

  const date1 = new Date(bookingData?.pickupDate);
  const date2 = new Date(bookingData?.returnDate);
  const diffTime = Math.abs(date2 - date1);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 

  const carPrice = selectedCar?.price || 0;
  const rowTotalCarPrice = carPrice * totalDays; 
  const serviceFees = bookingData?.driverOption?.toLowerCase()?.includes("car with driver") ? 200 : 0; 
  const rowFinalTotal = rowTotalCarPrice + serviceFees; 
  const totalCarPrice = rowTotalCarPrice.toLocaleString();
  const finalTotal =  rowFinalTotal.toLocaleString();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 pt-32">
      {selectedCar ? (
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-lg md:text-xl font-bold pt-20">Selected Cars (1)</h2>

            <div className="bg-white rounded-3xl shadow p-4 flex flex-col md:flex-row items-center gap-4">
              <img
                src={selectedCar?.image}
                alt={selectedCar?.model}
                className="w-full md:w-64 h-44 md:h-60 object-cover rounded-xl"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base md:text-lg cursor-pointer">
                    {selectedCar?.brand} {selectedCar?.model}
                  </h3>

                  <span className="text-xs md:text-sm text-gray-400 bg-[#4ade80] px-2 py-1 rounded">
                    SPORTS
                  </span>

                  <div className="mt-3 text-xs md:text-sm text-gray-700 space-y-4">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      From: {bookingData?.pickupDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      To: {bookingData?.returnDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      Duration: {totalDays} days
                    </p>

                    <p className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-gray-400" />
                      Price per day: ${selectedCar?.price}
                    </p>

                    <p>Driver Option: {bookingData?.driverOption}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-3">
                  <div className="flex items-baseline gap-1 mt-3"> 
                    <p className="text-xl font-bold text-green-600">Total:</p>
                    <p className="text-[#4ade80] font-bold text-lg">${totalCarPrice}</p>
                  </div> 

                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <button onClick={() => navigate("/reservation")} className="border px-6 py-2 rounded-lg text-sm w-full md:w-auto">
                      Edit
                    </button>

                    <button 
                      onClick={() => deleteHandler(selectedCar?.id || selectedCar?._id)}
                      className="border border-red-300 text-red-500 px-6 py-2 rounded-lg text-sm w-full md:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-white rounded-2xl shadow p-5 space-y-4 mt-6 md:mt-0 pt-20">
            <h3 className="text-base md:text-lg font-semibold">Order Summary</h3>

            <div className="flex justify-between text-sm">
              <span className="font-bold">Cars</span>
              <span className="text-gray-600">1</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="font-bold">Total Days</span>
              <span className="text-gray-600">{totalDays} days</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-sm">
              <span className="font-bold">Total Price</span>
              <span className="text-gray-600">${totalCarPrice}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="font-bold">Service Fees</span>
              <span className="text-gray-600">${serviceFees}</span>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="font-bold text-base md:text-lg">Final Total</p>
              <p className="text-[#4ade80] text-xl font-bold">${finalTotal}</p>
            </div>

            <Link to="/checkout">
              <button className="w-full bg-[#22c55e] text-white py-3 rounded-xl hover:bg-[#4ade80] transition-all">
                CheckOut
              </button>
            </Link>

            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
              <FaLock />
              100% Secure Payment
            </p>

            <div className="bg-[#F1FAF5] border border-[#DDF7E9] rounded-xl p-4 flex items-center gap-3 mt-10">
              <div className="bg-[#bbf7d0] p-2 rounded-full">
                <ShieldCheckIcon className="w-5 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-green-600 font-semibold text-sm">
                  All bookings are fully secured
                </p>
                <p className="text-gray-400 text-sm">
                  Full insurance coverage on cars throughout the rental period.
                </p>
              </div>
            </div> 
          </div>

        </div>
      ) : (
        // ده الجزء البديل اللي هيظهر أول ما تدوسي Delete والكارت يفضى تماماً
        <div className="flex flex-col items-center justify-center pt-32 pb-20 text-center w-full">
          <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-700">your cart is currently empty</h2>
            <p className="text-gray-400 mt-3 mb-6">you haven't selected a car to book yet</p>
            <button 
              onClick={() => navigate("/")} 
              className="bg-[#22c55e] text-white px-6 py-2 rounded-xl hover:bg-[#4ade80] transition-all text-sm font-medium"
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
