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

    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post("/api/notes", { title, content });
            navigate("/dashboard")
            console.log("Saved note", res.data)

        } catch (err) {
            console.error("Failed to save note", err)
        } finally {
            setLoading(false)
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
                    required minLength={3}
                    />

                    <textarea
                        className="new-note-content"
                        value={content}
                        placeholder="Write new note"
                        onChange={(e) => setContent(e.target.value)}
                        minLength={10}
                    />
                    <div className="new-note-buttons">
                        <button type="submit" disabled={!title || !content || !loading} className="save-button">{loading ? "Saving" : "Save"}</button>
                        <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )   
}

export default NewNote;