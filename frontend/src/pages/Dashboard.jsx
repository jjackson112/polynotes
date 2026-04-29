import { useEffect, useState } from "react";
import { api } from "../api/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Heart } from "react-feather";

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
                const res = await api.get("/notes") 
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
                        <div className="note-cards">
                            <h2>Recent Notes</h2>
                            <button onClick={() => navigate("/notes/new")} className="new-note-btn">New Note</button>
                            <div className="recent-notes">
                                {notes.slice(0,3).map(note => (
                                    <div key={note.id} className="note-card">
                                        <div className="note-card-header">
                                            <h3 className="note-card-title">{note.title}</h3>
                                            <Heart 
                                                className="favorite-icon"
                                                fill={note.favorite ? "#2b211b" : "none"}
                                                stroke="#2b211b"
                                            />
                                        </div>

                                        <p className="note-card-content">
                                            {note.content.length > 80 
                                                ? note.content.slice(0, 80) + "..."
                                                : note.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;