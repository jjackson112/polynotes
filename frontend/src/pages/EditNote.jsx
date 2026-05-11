import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

// NewNote is create only, EditNote is update only

function EditNote() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [languageCategory, setLanguageCategory] = useState("")
    const [tag, setTag] = useState("")

    const [loading, setLoading] = useState(false)

    // load existing note
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`) 
                // verify fetch is running
                console.log("Edit note id:", id)

                setTitle(res.title)
                setContent(res.content)
                setLanguageCategory(res.language)
                setTag(res.tag || []) // to change the UI if there are multiple tags
                
            } catch (err) {
                console.error(err)
            }
        }
        fetchNote()
    }, [id])

    // save update
    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.patch(`/notes/${id}`, {
                title,
                content,
                language: languageCategory === "All" ? "English" : languageCategory,
                tags: tag ? [tag] : []
            })

            navigate("/notes")
        } catch (err) {
            console.error("Failed to update note", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />

            <main className="edit-note-page">
                <form className="edit-note-form" onSubmit={handleUpdate}>

                    <input 
                    className="edit-note-title"
                    value={title} 
                    placeholder="Edit Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required minLength={3}
                    />

                    <div className="form-metadata">
                        <div className="category-dropdown">  
                            <label className="category-label">Language</label>

                            <select 
                                className="category-select" 
                                value={languageCategory || "english"}
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
                        className="edit-note-content"
                        value={content}
                        placeholder="Edit note"
                        onChange={(e) => setContent(e.target.value)}
                        minLength={8}
                    />
                    <div className="new-note-buttons">
                        <button type="button" className="fav-button">Add to Favorites</button>
                        <button type="submit" disabled={loading} className="save-button">{loading ? "Saving" : "Save"}</button>
                        <button type="button" className="cancel-button" onClick={() => navigate("/notes")}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )   
}

export default EditNote;