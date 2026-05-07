import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
                setNotes(res.items || res.data)
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
        return <p>No notes yet.</p>
    }

    return (
        <>
            <Header />
            <div className="view-notes-list">
                    {notes.map((note) => (
                        <div key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button onClick={() => handleEdit=(note.id)} className="edit-note-list">Edit</button>
                            <button onClick={() => handleDelete(note.id)} className="delete-note">Delete</button>
                        </div>
                    ))}
                </div>
        </>
    )

export default NoteList;