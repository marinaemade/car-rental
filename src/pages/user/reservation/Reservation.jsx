import React, { useState } from "react";
import { useBooking } from "../../../context/BookingContext";
import { FaCar, FaUser, FaMoneyBill, FaShieldAlt } from "react-icons/fa";
import { FaCcVisa, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/api";

export default function CarBooking() {
  const [openStep, setOpenStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    driverOption: "",
    driverLanguage: "",

    specialRequests: "",
    payment: "",
    deposit: false,
  });
  const [errors, setErrors] = useState({});

  const { selectedCar, setBookingData: saveBookingData } = useBooking();
  const navigate = useNavigate();

  const toggleStep = (step) => {
    setOpenStep(openStep === step ? 0 : step);
  };
  const handleConfirmBooking = async () => {
    const savedCar = JSON.parse(localStorage.getItem("carToEdit"));
    const carIdToUse = selectedCar?.id || savedCar?.id || savedCar?._id;

    const finalBookingData = {
      ...bookingData,
      carId: carIdToUse,
    };

    try {
      const newErrors = {};

      if (!bookingData.pickupDate) {
        newErrors.pickupDate = "Please enter pickup date";
      }

      if (!bookingData.returnDate) {
        newErrors.returnDate = "Please enter return date";
      }

      if (
        bookingData.pickupDate &&
        bookingData.returnDate &&
        bookingData.returnDate < bookingData.pickupDate
      ) {
        newErrors.returnDate = "Return date must be after pickup date";
      }

      if (
        !bookingData.pickupLocation ||
        bookingData.pickupLocation === "Select Location"
      ) {
        newErrors.pickupLocation = "Please select pickup location";
      }

      if (!bookingData.driverOption) {
        newErrors.driverOption = "Please select driver option";
      }

      if (
        bookingData.driverOption === "car with driver" &&
        (!bookingData.driverLanguage ||
          bookingData.driverLanguage === "Select Language")
      ) {
        newErrors.driverLanguage = "Please select driver language";
      }

      if (!bookingData.payment) {
        newErrors.payment = "Please select payment method";
      }

      if (!bookingData.deposit) {
        newErrors.deposit = "Please agree to the deposit";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }
      await api.post("/cart", finalBookingData);
      saveBookingData(finalBookingData);
      navigate("/cart");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking");
    }
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
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingData.pickupDate || ""}
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      pickupDate: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      pickupDate: "",
                    });
                  }}
                  className="border p-2 rounded w-full"
                />
                {errors.pickupDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pickupDate}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="return_data"
                  className="text-sm font-bold text-gray-700"
                >
                  Return Date
                </label>
                <input
                  id=" return_Date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingData.returnDate || ""}
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      returnDate: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      returnDate: "",
                    });
                  }}
                  className="border p-2 rounded w-full"
                />
                {errors.returnDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.returnDate}
                  </p>
                )}
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
                  value={bookingData.pickupLocation || ""}
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      pickupLocation: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      pickupLocation: "",
                    });
                  }}
                  className="border p-2 rounded w-full"
                >
                  <option>Select Location</option>
                  <option>Cairo</option>
                  <option>Alexandria</option>
                  <option>Giza</option>
                </select>
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pickupLocation}
                  </p>
                )}
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
                    <input
                      id="radio1"
                      name="driver_option"
                      type="radio"
                      value="car only"
                      checked={bookingData.driverOption === "car only"}
                      onChange={(e) => {
                        setBookingData({
                          ...bookingData,
                          driverOption: e.target.value,
                        });
                        setErrors({
                          driverOption: "",
                          driverLanguage: "",
                        });
                      }}
                      className="w-4 h-4 accent-[#22c55e]"
                    />
                    <span className="text-sm font-medium">
                      Car Only (Self Drive)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                    <input
                      id="radio2"
                      name="driver_option"
                      type="radio"
                      value="car with driver"
                      checked={bookingData.driverOption === "car with driver"}
                      onChange={(e) => {
                        setBookingData({
                          ...bookingData,
                          driverOption: e.target.value,
                          driverLanguage: "",
                        });
                        setErrors({
                          ...errors,
                          driverOption: "",
                        });
                      }}
                      className="w-4 h-4  accent-[#22c55e]"
                    />
                    <span className="text-sm font-medium">Car with Driver</span>
                  </label>
                  {errors.driverOption && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.driverOption}
                    </p>
                  )}
                </div>
              </div>

              {bookingData.driverOption === "car with driver" && (
                <div className="space-y-2">
                  <label
                    htmlFor="drivr_language"
                    className="text-sm font-bold text-gray-700"
                  >
                    Driver Language
                  </label>

                  <select
                    id="drivr_language"
                    value={bookingData.driverLanguage}
                    onChange={(e) => {
                      setBookingData({
                        ...bookingData,
                        driverLanguage: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        driverLanguage: "",
                      });
                    }}
                    className="border p-2 rounded w-full"
                  >
                    <option>Select Language</option>
                    <option>Arabic</option>
                    <option>English</option>
                  </select>
                  {errors.driverLanguage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.driverLanguage}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="spacial_requests"
                  className="text-sm font-bold text-gray-700"
                >
                  Special Requests
                </label>

                <textarea
                  id="spacial_requests"
                  value={bookingData.specialRequests}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      specialRequests: e.target.value,
                    })
                  }
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
              <label
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition
                ${
                  bookingData.payment === "visa"
                    ? "border-green-500 bg-green-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="visa"
                  checked={bookingData.payment === "visa"}
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      payment: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      payment: "",
                    });
                  }}
                  className="w-4 h-4 accent-[#22c55e]"
                />
                <FaCcVisa className="text-2xl text-blue-600" />
                <span className="text-sm font-medium">Credit Card</span>
              </label>
              {/* xcvbnm, */}
              <label
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition
                ${
                  bookingData.payment === "cash"
                    ? "border-green-500 bg-green-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={bookingData.payment === "cash"}
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      payment: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      payment: "",
                    });
                  }}
                  className="w-4 h-4 accent-[#22c55e]"
                />
                <FaMoneyBillWave className="text-2xl text-green-600" />
                <span className="text-sm font-medium">Pay in Cash</span>
              </label>
              {errors.payment && (
                <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
              )}
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
                <input
                  type="checkbox"
                  checked={bookingData.deposit}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      deposit: e.target.checked,
                    })
                  }
                  className="accent-green-500"
                />
                I agree to pay deposit
              </label>
              {errors.Deposit && (
                <p className="text-red-500 text-sm mt-1">{errors.Deposit}</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-full md:w-80 p-5 bg-white rounded-xl shadow-lg top-20 pt-20">
        <div className="flex justify-center mb-6 bg-gray-100 rounded-lg p-2">
          <img
            src={selectedCar?.image}
            alt={selectedCar?.model}
            className="w-48 object-contain"
          />
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-bold">Vehicle:</span>
            <span className="text-gray-600">
              {selectedCar?.brand} {selectedCar?.model}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Price / Day:</span>
            <span className="text-gray-600">${selectedCar?.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Category:</span>
            <span className="text-gray-600">{selectedCar?.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Transmission:</span>
            <span className="text-gray-600">{selectedCar?.transmission}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Fuel:</span>
            <span className="text-gray-600">{selectedCar?.fuelType}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold">Seats:</span>
            <span className="text-gray-600">{selectedCar?.seats}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-base">
            <span className="font-bold">Total Price:</span>
            <span className="font-bold">${selectedCar?.price}</span>
          </div>
        </div>{" "}
        *
        <button
          type="button"
          onClick={handleConfirmBooking}
          className="mt-6 w-full bg-[#22c55e] text-white py-3 rounded-lg font-semibold hover:bg-[#4ade80] transition-all"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
