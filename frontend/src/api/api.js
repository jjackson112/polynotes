// central API layer - just call it from here
// API layer separately looks into localStorage
// inject token from context - make API depend on token
// exporting a static object > move API into a factory function

const BASE_URL = "http://localhost:5000/api";

// global 401 handling + unified error handling + JSON parsing
const handleResponse = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem("token")
    window.dispatchEvent(new Event("auth:expired"))
    throw new Error("401 - Unauthorized")
  }

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`${res.status} - ${errorText}`)
  }

  return res.json()
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