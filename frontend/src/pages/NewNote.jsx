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
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const categories = ["All", "English", "Hawaiian", "Italian", "Mandarin", "Spanish"]
    const [category, setCategory] = useState("All")

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await api.post("/notes", { title, content });
            setSuccess("Note saved successfully.")
            console.log("Saved note", res.data)
            navigate("/dashboard", {state: {message : "Note created"}})
            // navigate after a short delay - 600 is a custom status code
            // setTimeout(() => navigate("/dashboard"), 600);
        } catch (err) {
            console.error("Failed to save note", err)
            setError("Note not saved. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <main className="new-note-page">
                <form className="new-note-form" onSubmit={handleSave}>
                    {error && <p className="new-note-error">{error}</p>}
                    {success && <p className="new-note-success">{success}</p>}
                    <input 
                    className="new-note-title"
                    value={title} // controlled input
                    placeholder="Note Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required minLength={3}
                    />

                    <div className="category-dropdown">  
                        <label className="category-label">Category</label>

                        <select 
                            className="category-select" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="English">English</option>
                            <option value="Hawaiian">Hawaiian</option>
                            <option value="Italian">Italian</option>
                            <option value="Mandarin">Mandarin</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>

                    <textarea
                        className="new-note-content"
                        value={content}
                        placeholder="Write new note"
                        onChange={(e) => setContent(e.target.value)}
                        minLength={10}
                    />
                    <div className="new-note-buttons">
                        <button type="button" className="fav-button">Add to Favorites</button>
                        <button type="submit" disabled={!title || !content || !loading} className="save-button">{loading ? "Saving" : "Save"}</button>
                        <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )   
}

export default NewNote;