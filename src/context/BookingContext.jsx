import { createContext, useContext, useState, useEffect } from "react";
import { updateCart } from "../api/CartApi";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(() => {
    const savedCar = localStorage.getItem("selectedCar");
    return savedCar ? JSON.parse(savedCar) : null;
  });

  const [bookingData, setBookingData] = useState(() => {
    const savedBooking = localStorage.getItem("bookingData");
    return savedBooking
      ? JSON.parse(savedBooking)
      : {
          pickupDate: "",
          returnDate: "",
          pickupLocation: "",
          driverOption: "",
        };
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
  }, [selectedCar]);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  const EditCart = async (id, updatedData) => {
    try {
      await updateCart(id, updatedData);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item,
        ),
      );
    } catch (error) {
      console.error("Error editing cart:", error);
    }
  };

  // const removeFormCart = async (carId) => {
  //   try {
  //     await deleteCart(carId);
  //     setCart((prevCart) => prevCart.filter((item) => item.id !== carId));
  //     setSelectedCar(null);
  //     localStorage.removeItem("selectedCar");
  //   } catch (error) {}
  // };

  return (
    <BookingContext.Provider
      value={{
        selectedCar,
        setSelectedCar,

        bookingData,
        setBookingData,

        cart,
        setCart,
        EditCart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;
