import { useEffect, useState } from "react";
import { api } from "../api/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NoteCard from "../components/NoteCard";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests to authenticate data

function Dashboard({ authMessage }) {
    const [notes, setNotes] = useState([])
    const [total, setTotal] = useState(0)
    const favoriteCount = notes.filter(note => note.favorite).length
    const [pages, setPages] = useState(1)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await api.get("/notes") 
                console.log(res)

                // wire data into state
                setNotes(res.items)
                setTotal(res.total)
                setPages(res.pages)
                
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [location.state?.refresh])

    return (
        <div className="app-layout">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="main-wrapper">
                <Header toggleSidebar={() => setSidebarOpen(v => !v)} authMessage={authMessage} />

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
                                    <NoteCard key={note.id} note={note} />
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