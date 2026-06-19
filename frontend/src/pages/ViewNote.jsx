// clean way to structure a growing app - not everything needs to be on the list page
// route parameters - params - placeholders in the URL
// each note has its own id, page, URL - SoC
// NoteList - lists all data and params tell the backend which note 

import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { Edit2, Trash2 } from "react-feather";

function ViewNote() {
    const { id } = useParams() // use id to fetch the note

    const [note, setNote] = useState(null)

    const navigate = useNavigate()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

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

    // event handler for delete button
      const handleDelete = async () => {
        try {
            await api.delete(`/notes/${id}`)
            navigate("/notes")

        } catch (err) {
            console.error("Failed to delete note", err)
        }
    }

    // render guard
    if (!note) 
        return <p>Loading...</p>

    return (
        <>
            <main>
                {showDeleteModal && (
                    <DeleteConfirmationModal
                        note={note}
                        onDelete={handleDelete}
                        onClose={() => setShowDeleteModal(false)}
                    />
                )}
                
                <div className="view-note-container">
                    <div className="view-note-actions">
                        <button onClick={() => navigate(`/notes/${note.id}/edit`)}><Edit2 size={16} />Edit</button>
                        <button onClick={() => setShowDeleteModal(true)}><Trash2 size={16} />Delete</button>
                    </div>

                    <h1 className="view-note-title">{note.title}</h1>
                    <p className="view-note-content">{note.content}</p>
                    <div className="view-note-meta">
                        <p className="note-chip">Language: {note.language}</p>
                        <p className="note-chip">Tag(s): {(note.tags.join(", "))}</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ViewNote;