import { useEffect } from "react";
import { api } from "../api/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

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
        <div className="app-layout">
            <Sidebar />

            <div className="main-wrapper">
                <Header />

                <main className="dashboard-main">
                    <h1>Welcome</h1>

                    <section>
                        <h2>Recent Notes</h2>
                    </section>

                    <section>
                        <h2>Quick Actions</h2>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;