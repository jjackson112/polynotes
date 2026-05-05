import { useState, useEffect } from "react";
import { api } from "../api/api";

const [notes, setNotes] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
    const fetchNotes = async () => {
        try {
            setLoading(true)

            const res = await api.get("/notes")

            setNotes(res.data)
        } catch (err) {
            setError("Failed to load notes.")
        } finally {
            setLoading(false)
        }
    }

    fetchNotes()
}, []) // initialize state and load saved data

if (loading)
    return <p>Loading notes...</p>

if (error)
    return <p>{error}</p>

if (notes.length === 0) 
    return <p>No notes yet.</p>

return (
    <div>
        {notes.map((note) => (
            <div key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
            </div>
        ))}
    </div>
)