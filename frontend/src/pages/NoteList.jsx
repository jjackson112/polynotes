import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function NoteList() {
    const [notes, setNotes] = useState([])
    const [favorites, setFavorites] = useState([]) // always has to be an array

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // selectedNote instead of a boolean - null means the modal is closed + note object opens the modal for that note
    const [selectedNote, setSelectedNote] = useState(null)

    const navigate = useNavigate()

    // effects - fetch notes + favorites
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)

                const res = await api.get("/notes")

                // backend response is not defined by just data
                setNotes(res.items || res.data || [])
            } catch (err) {
                setError("Failed to load notes.")
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, []) // initialize state and load saved data

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
            const res = await api.get("/notes/favorites")
            setFavorites(res) // this is only set once with || [] - not synced with backend
            } catch (err) {
                console.error("Failed to load favorites", err)
            }
        }
        fetchFavorites()
        console.log("Updated favorites", favorites)
    }, []) // tell React to run this effect


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
    
    // derived data
    const sortedNotes = [...notes].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )

    // render guards
    if (loading)
        return <p>Loading notes...</p>

    if (error)
        return <p>{error}</p>

    if (notes.length === 0) 
        return <p> No notes yet.</p>

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
            <div className="view-notes-list">
                {sortedNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onView={handleView}
                        onEdit={handleEdit}
                        onRequestDelete={handleRequestDelete}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                ))}
            </div>
        </>
    )
}

export default NoteList;