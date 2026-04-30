// central API layer - just call it from here
// API layer separately looks into localStorage
// inject token from context - make API depend on token
// exporting a static object > move API into a factory function

export const createApi = (token) => {
  const BASE_URL = "http://localhost:5000/api";

  const headers = {
    "Content-Type": "application/json",
    ...BASE_URL(token && { Authorization: `Bearer ${token}`})
  }

  return {
    get: async (endpoint) => {
      const res = fetch(`${BASE_URL}${endpoint}`, {
        headers
      })

      if (!res.ok) throw new Error(`GET failed: ${res.status}`)
      return res.json()
    },
  
    post: async(endpoint, body) => {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error(`POST failed`)
      return res.json()
    }
  }
}