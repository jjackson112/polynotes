import { useEffect, useState } from "react";
import { api } from "../api/api";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useFavorites } from "../context/FavoritesContext";

// /dashboard  → ProtectedRoute  → Dashboard renders
// protected logic will live here - GET requests to authenticate data

function Dashboard({ authMessage, sidebarOpen, setSidebarOpen }) {
    const [notes, setNotes] = useState([])
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(1)

    const navigate = useNavigate()
    const location = useLocation()

    const { favorites, toggleFavorite } = useFavorites()
    const favoriteCount = favorites.length

    const username = localStorage.getItem("username")

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

    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    return (
        <div className="dashboard-layout">
            <div className="main-wrapper">
                <main className="dashboard-main">
                    <section className="welcome-card">
                        <h2>Welcome { username ? `, ${username}` : ""}👋</h2>
                        <p>Ready to take notes?</p>
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
                                {notes.slice(0,6).map(note => (
                                    <NoteCard 
                                        key={note.id} 
                                        note={{
                                            ...note,
                                            favorite: favorites.includes(note.id)
                                        }}
                                        toggleFavorite={toggleFavorite}
                                        onView={handleView} 
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;