import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import NoteCard from "../components/NoteCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { Filter } from "react-feather";

function NoteList() {
    console.log("NoteList mounted")
    const [notes, setNotes] = useState([])
    const [pages, setPages] = useState(0)

    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)

    // selectedNote instead of a boolean - null means the modal is closed + note object opens the modal for that note
    const [selectedNote, setSelectedNote] = useState(null)

    const navigate = useNavigate()

    const { favorites, toggleFavorite } = useFavorites()

    // own state for search + filter
    const [search, setSearch] = useState("")
    const [languages, setLanguages] = useState([]) // fetch from backend
    const [languageFilter, setLanguageFilter] = useState("All")

    // effects - fetch notes + favorites
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                setError(null)

                const data = await api.get(`/notes?page=${page}&per_page=20`)

                // backend response is not defined by just data
                setNotes(data.items || [])
                setPages(data.pages || 0)
                setHasNext(Boolean(data.has_next))
                setHasPrev(Boolean(data.has_prev))

            } catch (err) {
                setError("Failed to load notes.")
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [page]) // initialize state and load saved data

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await api.get(`/notes/languages`)
                setLanguages(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchLanguages()
    }, [])

    // handlers
    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    // after clicking edit button from list, navigate to Edit Note page
    // Edit Note page will handle the logic
    const handleEdit = (id) => {
        navigate(`/notes/${id}/edit`) 
    }

    // remove note locally + stays on the same page (UI update + refresh)
    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`)
            setNotes(prev => prev.filter(n => n.id !== id))

            setSelectedNote(null) // cleaner architecture
        } catch (err) {
            console.error("Failed to delete note", err)
            console.error("Backend response:", err.response?.data)
            console.error("Status:", err.response?.status)
            setError("Cannot load note list.")
        }
    }

    // Note Card no longer calls API - note is passed as a prop
    const handleRequestDelete = (note) => {
        setSelectedNote(note)
    }

    // console.log("RENDER notes:", notes)
    // console.log("RENDER notes length:", notes.length)
    // console.log("RENDER favorites:", favorites)
    // console.log("RENDER error:", error)
    // console.log("RENDER loading:", loading)

    // render guards
    if (loading && notes.length === 0)
        return <p>Loading notes...</p>

    if (error && notes.length === 0) 
        return <p>{error}</p>

    return (
        <>
            {error && <p>{error}</p>}
            <div className="notes-page">
                <div className="note-list-header">
                    <h2 className="all-notes-title">All Notes</h2>
                    <button onClick={() => navigate("/notes/new")} className="new-note-btn">New Note</button>
                </div>

                {selectedNote && (
                    <DeleteConfirmationModal
                        note={selectedNote}
                        onDelete={handleDelete}
                        onClose={() => setSelectedNote(null)}
                    />
                )}

                <div className="language-form">
                    <Filter />
                    <form className="language-filter">
                        <label htmlFor="language">Filter Languages:</label>
                        <select 
                            value={languageFilter}
                            className="language-category"
                            onChange={(e) => setLanguageFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            {languages.map(language => (
                                <option key={language} value={language}>{language}</option>
                            ))}
                        </select>
                    </form>   
                </div>

                {notes.length === 0 ? (
                    <p> No notes yet.</p>
                ) : (
                <div className="view-notes-list">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={{
                                ...note,
                                favorite: Array.isArray(favorites) && favorites.includes(note.id)
                            }}
                            onView={handleView}
                            toggleFavorite={toggleFavorite}
                            onEdit={handleEdit}
                            onRequestDelete={handleRequestDelete}
                        />
                    ))}
                </div>
                )}

                <div className="pagination">
                    <button className="prev-btn" onClick={() => setPage(prev => prev - 1)} disabled={!hasPrev}>Previous</button>
                    
                    {[...Array(pages)].map((_, index) => {
                        const pageNumber = index +1 

                        return (
                            <button 
                                key={pageNumber} 
                                onClick={() => setPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}

                    <button className="next-btn" onClick={() => setPage(prev => prev + 1)} disabled={!hasNext}>Next</button>
                </div>
            </div>
        </>
    )
}

export default NoteList;