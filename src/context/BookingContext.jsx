import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingData, setBookingData] = useState({
    pickupData: "",
    returnData: "",
    pickupLocation: "",
    driverOption: "",
  });
  const [cart, setCart] = useState([]);
  const removeFormCart = (carId) => {
    setCart((prevCart) => prevCart.filter((item) => item !== carId));
    setSelectedCar(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCar,
        setSelectedCar,

        bookingData,
        setBookingData,

        cart,
        setCart,
        removeFormCart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;
