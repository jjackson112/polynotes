import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api"
import Header from "../components/Header";

// UI input → state → submit → API
// data has to be tracked - it's not just static UI

function NewNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSave = async () => {
        e.prevent.default()

        try {
            const res = await api.post("/api/notes", { title, content });
            navigate("/dashboard")
            console.log("Saved note", res.data)

        } catch (err) {
            console.error("Failed to save note", err)
        }
    }

    return (
        <>
            <Header />
            <main className="new-note-page">
                <form className="new-note-form" onSubmit={handleSave}>
                    <input 
                    className="new-note-title"
                    value={title} // controlled input
                    placeholder="Note Title"
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="new-note-content"
                        value={content}
                        placeholder="Write new note"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="new-note-buttons">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )   
}

export default NewNote;