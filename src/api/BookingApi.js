const API_URL = "https://backend-cars-three.vercel.app";

export const fetchBookings = () => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/bookings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      return response.json();
    });
};