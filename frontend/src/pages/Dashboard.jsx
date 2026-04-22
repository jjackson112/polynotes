import { useEffect } from "react";
import { api } from "../api/api";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests to authenticate data

function Dashboard() {
    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await api.get("/auth/protected") 
                console.log(data)
                
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Dashboard (Protected)</h1>
        </div>
    )
}

export default Dashboard;