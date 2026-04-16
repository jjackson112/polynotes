// central API layer - just call it from here

const BASE_URL = "http://localhost:5000/api";

export const api = {
    get: async (endpoint) => {
        const token = localStorage.getItem("token")

        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        })

        return res.json()
    }
}