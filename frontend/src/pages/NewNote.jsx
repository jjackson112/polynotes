import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// NewNote → API POST → DB saves → NoteList GET → UI renders// UI input → state → submit → API
// data has to be tracked - it's not just static UI

function NewNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // const languages = ["All", "English", "Hawaiian", "Italian", "Mandarin", "Spanish"] note_validation
    const [languageCategory, setLanguageCategory] = useState("All")

    const [tag, setTag] = useState("")

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await api.post("/notes", { title, content, language: languageCategory === "All" ? "English" : languageCategory, tag });
            console.log("Saved note", res)

            setTimeout(() => setSuccess("Note saved successfully."), 2000);
            navigate("/notes") // fake refresh but actually refetches data for dashboard

            setTitle("")
            setContent("")
            setLanguageCategory("All")
            setTag("")
            
            // navigate after a short delay - 600 is a custom status code

            // console.log("TOKEN:", localStorage.getItem("token"));
            console.log("REQUEST PAYLOAD:", { title, content, language: languageCategory, tag });
            console.log("RESPONSE:", res);

        } catch (err) {
            console.error("Failed to save note", err)
            setError("Note not saved. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
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

                    <div className="form-metadata">
                        <div className="category-dropdown">  
                            <label className="category-label">Language</label>

                            <select 
                                className="category-select" 
                                value={languageCategory}
                                onChange={(e) => setLanguageCategory(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="english">English</option>
                                <option value="hawaiian">Hawaiian</option>
                                <option value="italian">Italian</option>
                                <option value="mandarin">Mandarin</option>
                                <option value="spanish">Spanish</option>
                            </select>
                        </div>

                        <div className="tag-field">
                            <label className="tag-label">Tag</label>
        
                            <input
                                className="tag-input"
                                type="text"
                                placeholder="grammar, verb, vocab"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                    </div>

                    <textarea
                        className="new-note-content"
                        value={content}
                        placeholder="Write new note"
                        onChange={(e) => setContent(e.target.value)}
                        minLength={8}
                    />
                    <div className="new-note-buttons">
                        <button type="submit" disabled={!title || !content || loading} className="save-button">{loading ? "Saving" : "Save"}</button>
                        <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )   
}

export default NewNote;