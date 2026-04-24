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
                    <section className="welcome-card">
                        <h1>Welcome</h1>
                        <p>Ready to organize?</p>
                    </section>

                    <section className="stats-grid">
                        <div className="card">Total Notes: 12</div>
                        <div className="card">Favorites: 4</div>
                        <div className="card">Archived: 2</div>
                    </section>

                    <section className="notes-grid">
                        <div className="card">
                            <h2>Recent Notes</h2>
                            <p>Here is where the most recent notes will appear</p>
                        </div>

                        <div className="card">
                            <h2>Quick Actions</h2>
                            <button>New Note</button>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;