// central API layer - just call it from here

const BASE_URL = "http://localhost:5000/api";

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });

    if (!res.ok) throw new Error(`GET failed: ${res.status}`)

    return res.json();
  },

  post: async (endpoint, body) => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("POST request failed");

    return res.json();
  },
};