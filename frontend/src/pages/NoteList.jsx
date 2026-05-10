import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";

function NoteList() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

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
    
    const sortedNotes = [...notes].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )

    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    // after clicking edit button from list, navigate to Edit Note page
    // Edit Note page will handle the logic
    const handleEdit = (id) => {
        navigate(`/notes/${id}/edit`) 
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`)
            setNotes(prev => prev.filter(n => n.id !== id))
        } catch (err) {
            console.error("Failed to delete note", err)
        }
    }

    if (loading)
        return <p>Loading notes...</p>

    if (error)
        return <p>{error}</p>

    if (notes.length === 0) 
        return <p> No notes yet.</p>

    return (
        <>
            <Header />
            <div className="view-notes-list">
                {sortedNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onView={() => navigate(`/notes/${note.id}`)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    )
}

export default NoteList;