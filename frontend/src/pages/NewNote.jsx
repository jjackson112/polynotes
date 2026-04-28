import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI input → state → submit → API
// data has to be tracked - it's not just static UI

function NewNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSave = async () => {
        await api.post("/api/notes", { title, content })
    }

    return (
        <main>
            <input 
                placeholder="Note Title"
            />

            <textarea
                placeholder="Write new note"
            />

            <button onSubmit={handleSave}>Save</button>
            <button onClick={() => navigate("/dashboard")}>Cancel</button>
        </main>
    )
}

export default NewNote;