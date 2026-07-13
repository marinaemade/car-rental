const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchBookings = () => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/bookings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return response.json();
  });
};

export const createBooking = (bookingData) => {
  const token = localStorage.getItem("token");
  console.log("Booking data:", bookingData);
  console.log("Token:", localStorage.getItem("token"));

  return fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return response.json();
  });
};

export const updateBooking = (id, updatedData) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update booking");
    }
    return response.json();
  });
};

export const fetchBookingById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  return response.json();
};
