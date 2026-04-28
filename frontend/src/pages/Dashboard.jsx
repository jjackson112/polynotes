import { useEffect, useState } from "react";
import { api } from "../api/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests to authenticate data

function Dashboard() {
    const [notes, setNotes] = useState([])
    const [total, setTotal] = useState(0)
    const favoriteCount = notes.filter(note => note.favorite).length
    const [pages, setPages] = useState(1)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await api.get("/api/notes") 
                console.log(res.data)

                // wire data into state
                setNotes(res.data.items)
                setTotal(res.data.total)
                setPages(res.data.pages)
                
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="app-layout">
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            <div className="main-wrapper">
                <Header />

                <main className="dashboard-main">
                    <section className="welcome-card">
                        <h2>Welcome</h2>
                        <p>Ready to take notes?</p>
                        <p>You have {total} notes</p>
                    </section>

                    <section className="stats-grid">
                        <div className="card">Total Notes: {total}</div>
                        <div className="card">Favorites: {favoriteCount}</div>
                        <div className="card">Pages: {pages}</div>
                    </section>

                    <section className="notes-grid">
                        <div className="card">
                            <h2>Recent Notes</h2>
                            <div className="recent-notes">
                                {notes.slice(0,3).map(note => (
                                    <div key={note.id}>
                                        <h3>{note.title}</h3>
                                        <p>{note.content}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => navigate("/notes/new")} className="new-note-btn">New Note</button>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;