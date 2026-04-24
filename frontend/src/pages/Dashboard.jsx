import { useEffect } from "react";
import { api } from "../api/api";
import Header from "../components/Header";

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
            <h1>Dashboard</h1>
            <Header />
        </div>
    )
}

export default Dashboard;