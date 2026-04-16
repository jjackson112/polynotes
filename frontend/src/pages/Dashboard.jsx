import { useEffect } from "react";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests
function Dashboard() {
    useEffect(() => {
        api.get("/auth/protected")
    }, [])

    return <h1>Dashboard (Protected) </h1>
}

export default Dashboard;