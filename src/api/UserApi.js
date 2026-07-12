const API_URL = "https://backend-cars-three.vercel.app";

export const fetchUser = () => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return response.json();
    });
};

export const updateUser = (id, formData) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return response.json();
    });
};