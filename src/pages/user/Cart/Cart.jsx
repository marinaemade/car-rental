import React from "react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaLock } from "react-icons/fa";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

 const Cart = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-6 pt-32">
      
      <div className="flex-1 space-y-6">

        <h2 className="text-lg md:text-xl font-bold pt-20">Selected Cars (1)</h2>

        <div className="bg-white rounded-3xl shadow p-4 flex flex-col md:flex-row items-center gap-4 ">

          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663359518791/TdZsiTJ3qRYeMjwYG3Fbam/bmw-m4-sports-KfEUiVbSxS4MdTKrdXsSg3.webp"
            alt="car"
            className="w-full md:w-64 h-44 md:h-60 object-cover rounded-xl"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-base md:text-lg cursor-pointer">
                BMW 2024
              </h3>

              <span className="text-xs md:text-sm text-gray-400 bg-[#4ade80] px-2 py-1 rounded">
                SPORTS
              </span>

              <div className="mt-3 text-xs md:text-sm text-gray-700 space-y-4">
                
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400  text-green" />
                  From: April 12, 2026
                </p>

                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400  text-green" />
                  To: April 17, 2026
                </p>

                <p className="flex items-center gap-2">
                  <FaClock className="text-gray-400  text-green" />
                  Duration: 5 days
                </p>

                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-gray-400 text-green" />
                  Price per day: $189
                </p>

                <p>Driver Option: Self-drive</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-3">

              <div className="flex items-baseline gap-1 mt-3"> 
                <p className="text-xl font-bold text-green-600">Total:</p>
                <p className="text-[#4ade80] font-bold text-lg">$945</p>
               </div> 

              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <button className="border px-6 py-2 rounded-lg text-sm w-full md:w-auto">
                  Edit
                </button>

                <button className="border border-red-300 text-red-500 px-6 py-2 rounded-lg text-sm w-full md:w-auto">
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
          <span className="text-gray-600">5 days</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-sm">
          <span className="font-bold">Total Price</span>
          <span className="text-gray-600">$945</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-bold">Service Fees</span>
          <span className="text-gray-600">$200</span>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="font-bold text-base md:text-lg">Final Total</p>
          <p className="text-[#4ade80] text-xl font-bold">$1,145</p>
        </div>

         <Link to="/checkout">
        <button className="w-full bg-[#22c55e] text-gray-400 py-3 rounded-xl hover:bg-[#4ade80] transition-all">
          CheckOut
          
        </button>
        </Link>

        <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
          <FaLock />
          100% Secure Payment
        </p>
          <div className=" bg-[#F1FAF5] border border-[#DDF7E9] rounded-xl p-4 flex items-center gap-3 mt-40">
        

      <div className="bg-[#bbf7d0] p-2 rounded-full">
        <ShieldCheckIcon className="w-5 h-6 text-green" />
      </div>
      
      <div>
        <p className="text-green  font-semibold text-sm">
          All bookings are fully secured
        </p>
        <p className="text-gray-400 text-sm">
          Full insurance coverage on cars throughout the rental period.
        </p>
      </div>

    </div> 
    </div>
     </div>
    
  );
}
export default Cart;