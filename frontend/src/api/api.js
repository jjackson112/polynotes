// central API layer - just call it from here
// API layer separately looks into localStorage
// inject token from context - make API depend on token
// exporting a static object > move API into a factory function

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// global 401 handling + unified error handling + JSON parsing
const handleResponse = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem("token")
    window.dispatchEvent(new Event("auth:expired"))
    throw new Error("Invalid username/email or password")
  }

  if (res.status === 204) {
    return null
  }

  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `${res.status} - Request failed`)
  }

  return data
}

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })

    return handleResponse(res);
  },

  post: async (endpoint, body) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });

    return handleResponse(res);
  },

  patch: async (endpoint, body) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    })

    return handleResponse(res)
  },

  delete: async (endpoint) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
    })

    return handleResponse(res)
  }
}