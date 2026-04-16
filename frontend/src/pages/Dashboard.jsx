import { useEffect } from "react";

// /dashboard  → ProtectedRoute  → Dashboard renders
function Dashboard() {
    useEffect(() => {
        api.get("/auth/protected")
    }, [])

    return <h1>Dashboard (Protected) </h1>
}

export default Dashboard;