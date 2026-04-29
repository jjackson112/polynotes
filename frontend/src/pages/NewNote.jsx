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
        <main>
            <Header />

            <form>
                <input 
                className="note-title"
                value={title} // controlled input
                placeholder="Note Title"
                onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className=""
                    value={content}
                    placeholder="Write new note"
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onSubmit={handleSave}>Save</button>
                <button onClick={() => navigate("/dashboard")}>Cancel</button>
            </form>
        </main>
    )
}

export default NewNote;