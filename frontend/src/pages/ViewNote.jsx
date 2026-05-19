// clean way to structure a growing app - not everything needs to be on the list page
// route parameters - params - placeholders in the URL
// each note has its own id, page, URL - SoC
// NoteList - lists all data and params tell the backend which note 

import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function ViewNote() {
    const { id } = useParams() // use id to fetch the note

    const [note, setNote] = useState(null)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                console.log("Fetching note", id)

                const res = await api.get(`/notes/${id}`)

                console.log("Response", res)
                setNote(res)
                
            } catch (err) {
                console.log("Failed to load note", err)
            }
        }

        fetchNote()
    }, [id])

    if (!note) 
        return <p>Loading...</p>

    return (
        <>
            <Header />

            <main className="view-note-container">
                <h1 className="view-note-title">{note.title}</h1>
                <p className="view-note-content">{note.content}</p>
                <div className="view-note-meta">
                    <p className="note-chip">Language: {note.language}</p>
                    <p className="note-chip">Tag(s): {note.tags}</p>
                </div>
            </main>
        </>
    )
}

export default ViewNote;