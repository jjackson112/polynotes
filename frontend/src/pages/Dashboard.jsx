import { useEffect } from "react";
import { api } from "../api/api";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests
function Dashboard() {
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get("/auth/protected") 
                const data = response.data 
                console.log(data)
                
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    return <h1>Dashboard (Protected) </h1>
}

export default Dashboard;