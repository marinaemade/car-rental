import React, { useState } from "react";
import { FaCar, FaUser, FaMoneyBill, FaShieldAlt } from "react-icons/fa";
import { FaCcVisa, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CarBooking() {
  const [openStep, setOpenStep] = useState(1);
  const toggleStep = (step) => {
    setOpenStep(openStep === step ? 0 : step);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100  ">
      {/* Sidebar */}
      <div className="bg-[#2a2a2a] text-white w-full md:w-64 p-5 pt-20  ">
        {[
          { title: "Select rental dates", icon: <FaCar /> },
          { title: "Driver options", icon: <FaUser /> },
          { title: "Payment options", icon: <FaMoneyBill /> },
          { title: "Deposit", icon: <FaShieldAlt /> },
        ].map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 mb-3 rounded-lg transition-all 
            ${openStep === index + 1 ? "bg-[#22c55e]" : "bg-gray-800"}`}
          >
            <div className="text-[30px] text-[#16a34a] ">{step.icon}</div>
            <div>
              <p className="text-[20px] font-bold ">Step {index + 1}</p>
              <p className="text-xs text-gray-300 mt-1">{step.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4 pt-20">
        <div className="bg-white rounded-xl shadow p-4 space-y-4">
          <h2
            onClick={() => toggleStep(1)}
            className="font-semibold text-lg cursor-pointer"
          >
            Step 1 - Select Rental Dates
          </h2>

          {openStep === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Prickup_Date"
                  className="text-sm font-bold text-gray-700"
                >
                  Pickup Date
                </label>
                <input
                  id="Prickup_Date"
                  name="Prickup_Date"
                  type="date"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="return_data"
                  className="text-sm font-bold text-gray-700"
                >
                  Return Date
                </label>
                <input
                  id="return_data"
                  name="return_data"
                  type="date"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label
                  htmlFor="pickup_location"
                  className="text-sm font-bold text-gray-700"
                >
                  Pickup Location
                </label>
                <select
                  id="pickup_location"
                  name="pickup_location"
                  className="border p-2 rounded w-full"
                >
                  <option>Select Location</option>
                  <option>Cairo</option>
                  <option>Alexandria</option>
                  <option>Giza</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-5 space-y-5">
          <h2
            onClick={() => toggleStep(2)}
            className="font-semibold text-lg text-gray-800 cursor-pointer"
          >
            Step 2 - Driver Options
          </h2>

          {openStep === 2 && (
            <>
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-700">Booking Type</p>

                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-sm font-medium">
                      Car Only (Self Drive)
                    </span>
                    <input
                      id="radio1"
                      name="driver_option"
                      type="radio"
                      className="w-4 h-4 accent-[#22c55e]"
                    />
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-sm font-medium">Car with Driver</span>
                    <input
                      id="radio2"
                      name="driver_option"
                      type="radio"
                      value="driver"
                      className="w-4 h-4  accent-[#22c55e]"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="drivr_language"
                  className="text-sm font-bold text-gray-700"
                >
                  Driver Language
                </label>

                <select
                  id="drivr_language"
                  name="drivr_language"
                  className="border p-2 rounded w-full"
                >
                  <option>Select Language</option>
                  <option>Arabic</option>
                  <option>English</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="spacial_requests"
                  className="text-sm font-bold text-gray-700"
                >
                  Special Requests
                </label>

                <textarea
                  id="spacial_requests"
                  name="spacial_requests"
                  className="w-full border rounded-lg p-3 text-sm min-h-[100px]"
                ></textarea>
              </div>
            </>
          )}
        </div>

        {/* STEP 3 */}
        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <h2
            onClick={() => toggleStep(3)}
            className="font-semibold text-lg cursor-pointer"
          >
            Step 3 - Payment
          </h2>

          {openStep === 3 && (
            <div className="flex gap-4">
              <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="visa"
                  className="hidden"
                />
                <FaCcVisa className="text-2xl text-blue-600" />
                <span className="text-sm font-medium">Credit Card</span>
              </label>

              <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  className="hidden"
                />
                <FaMoneyBillWave className="text-2xl text-green-600" />
                <span className="text-sm font-medium">Pay in Cash</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <h1
            onClick={() => toggleStep(4)}
            className="font-semibold text-lg cursor-pointer"
          >
            Step 4 - Deposit
          </h1>

          {openStep === 4 && (
            <>
              <p className=" text-sm text-gray-600 landing-relaxed text-justify font-medium">
                To ensure a smooth and secure rental experience, a refundable
                deposit is required when confirming your booking. This deposit
                serves as a security measure to cover any potential damages,
                delays, or violations of the rental terms and conditions. The
                deposit amount may vary depending on the type of vehicle
                selected and will be either temporarily held or charged at the
                time of payment. Once the rental period is completed, the
                vehicle will be inspected to ensure it has been returned in the
                same condition as received. If no issues are found, the full
                deposit amount will be refunded to your original payment method
                within a few business days. However, in cases of damage, late
                return, or breach of agreement, part or all of the deposit may
                be deducted accordinly. By proceeding with the booking, you
                acknowledge and agree to these terms regarding the deposit.
              </p>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />I agree to
                pay deposit
              </label>
            </>
          )}
        </div>
      </div>

      <div className="w-full md:w-80 p-5 bg-white rounded-xl shadow-lg top-20 pt-20">
        <div className="flex justify-center mb-6 bg-gray-100 rounded-lg p-2">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663359518791/TdZsiTJ3qRYeMjwYG3Fbam/bmw-m4-sports-KfEUiVbSxS4MdTKrdXsSg3.webp"
            alt="car"
            className="w-48 object-contain"
          />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-bold">Vehicle:</span>
            <span className="text-gray-600">Rivian R1S</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Rental Days :</span>
            <span className="text-gray-600 text-right text-sm">
              5 days, from 2026-04-12 <br /> to 2026-04-17
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Pickup Option:</span>
            <span className="text-gray-600">New York City,NY</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Driver Option:</span>
            <span className="text-gray-600">Self-drive,Without driver</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Payment Option:</span>
            <span className="text-gray-600">Online Payment</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-base">
            <span className="font-bold">Total Price:</span>
            <span className="font-bold">$850.00</span>
          </div>

          <div className="flex justify-between text-base">
            <span className="font-bold">Deposit Amount:</span>
            <span className="text-gray-600">$1,500.00</span>
          </div>
        </div>

        <Link to="/cart">
          <button className="mt-6 w-full bg-[#22c55e] text-white py-3 rounded-lg font-semibold hover:bg-[#4ade80] transition-all">
            Confirm Booking
          </button>
        </Link>
      </div>
    </div>
  );
}
