import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useFavorites } from "../context/FavoritesContext";

function NoteList() {
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

    // effects - fetch notes + favorites
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await api.get(`/notes?page=${page}&per_page=20`)
                const data = res.data

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
        }
    }

    // Note Card no longer calls API - note is passed as a prop
    const handleRequestDelete = (note) => {
        setSelectedNote(note)
    }

    // render guards
    if (loading && notes.length === 0)
        return <p>Loading notes...</p>

    if (error) 
        return <p>{error}</p>

    return (
        <>
            <Header />
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
            {notes.length === 0 ? (
                <p> No notes yet.</p>
            ) : (
            <div className="view-notes-list">
                {notes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={{
                            ...note,
                            favorite: favorites.includes(note.id)
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
                <button className="next-btn" onClick={() => setPage(prev => prev + 1)} disabled={!hasNext}>Next</button>
            </div>
        </>
    )
}

export default NoteList;