// clean way to structure a growing app - not everything needs to be on the list page
// route parameters - params - placeholders in the URL
// each note has its own id, page, URL - SoC
// NoteList - lists all data and params tell the backend which note 

import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";

function ViewNote() {
    const { id } = useParams() // use id to fetch the note

    const [note, setNote] = useState(null)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`)
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
        <main>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <p>{note.language}</p>
            <p>{note.tag}</p>
        </main>
    )
}

export default ViewNote;