const API_URL = "https://backend-cars-three.vercel.app";

export const addToCart = (cartData) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to add car to cart");
    }
    return response.json();
  });
};

export const fetchCart = () => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    return response.json();
  });
};

export const updateCart = (id, cartData) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/cart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update cart");
    }

    return response.json();
  });
};

export const deleteCart = (id) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete cart");
    }

    return response.json();
  });
};
