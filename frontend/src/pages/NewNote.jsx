import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// UI input → state → submit → API
// data has to be tracked - it's not just static UI

function NewNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSave = async () => {
        try {
            const res = await api.post("/api/notes", { title, content });
            navigate(`/notes/${res.data.id}`)
        } catch (err) {
            console.error("Failed to save note", err)
        }
    }

    return (
        <main>
            <Header />
            <Sidebar />

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