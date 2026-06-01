import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import FilterNote from "../components/FilterNote";

// search results page from Header

function NoteList() {
    const [notes, setNotes] = useState([])
    const [pages, setPages] = useState(0)

    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)

    // selectedNote instead of a boolean - null means the modal is closed + note object opens the modal for that note
    const [selectedNote, setSelectedNote] = useState(null)

    const navigate = useNavigate()

    const { favorites, toggleFavorite } = useFavorites()

    // fetch from backend
    const [languages, setLanguages] = useState([]) 

    // read URL query from Header - search results page 
    const [searchParams, setSearchParams] = useSearchParams()
    // value that controlls the search results
    const searchFromURL = searchParams.get("search") || "" 

    const [languageFilter, setLanguageFilter] = searchParams.get("language") || "All"
    const [tagFilter, setTagFilter] = searchParams.get("tag") || ""

    const pageFromURL = Number(searchParams.get("page")) || 1

    // event handler when user chooses a language
    const handleLanguageChange = (e) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams) // copy current params

        if (value === "All") {
            params.delete("language")
        } else {
            params.set("language", value)
        }

        // reset pagination whenever a filter changes - UX 
        params.set("page", pageNumber)
        setSearchParams(params)
    }

    // effects - fetch notes + favorites
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                setError(null)

                // query parameters
                const params = new URLSearchParams({
                    page: pageFromURL,
                    per_page: 20
                })

                if (languageFilter !== "All") {
                    params.append("language", languageFilter)
                }

                if (searchFromURL.trim()) {
                    params.append("search", searchFromURL.trim())
                }

                if (tagFilter.trim()) {
                    params.append("tag", tagFilter.trim())
                }

                const filter_endpoint = `/notes?${params.toString()}`

                const data = await api.get(filter_endpoint)

                // backend response is not defined by just data
                setNotes(data.items || [])
                setPages(data.pages || 0)
                setHasNext(Boolean(data.has_next))
                setHasPrev(Boolean(data.has_prev))

            } catch (err) {
                setError("Failed to load notes.")
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [pageFromURL, languageFilter, searchFromURL, tagFilter]) // initialize state and load saved data

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await api.get("/notes/languages")
                setLanguages(data)
                console.log("Languages", data)

            } catch (err) {
                console.log("Language error", err)
            }
        }

        fetchLanguages()
    }, [])

    // handlers
    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    // after clicking edit button from list, navigate to Edit Note page
    // Edit Note page will handle the logic
    const handleEdit = (id) => {
        navigate(`/notes/${id}/edit`) 
    }

    // remove note locally + stays on the same page (UI update + refresh)
    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`)
            setNotes(prev => prev.filter(n => n.id !== id))

            setSelectedNote(null) // cleaner architecture
        } catch (err) {
            console.error("Failed to delete note", err)
            console.error("Backend response:", err.response?.data)
            console.error("Status:", err.response?.status)
            setError("Cannot load note list.")
        }
    }

    // Note Card no longer calls API - note is passed as a prop
    const handleRequestDelete = (note) => {
        setSelectedNote(note)
    }

    // console.log("RENDER notes:", notes)
    // console.log("RENDER notes length:", notes.length)
    // console.log("RENDER favorites:", favorites)
    // console.log("RENDER error:", error)
    // console.log("RENDER loading:", loading)

    // render guards
    if (loading && notes.length === 0 && !tagFilter)
        return <p>Loading notes...</p>

    if (error && notes.length === 0) 
        return <p>{error}</p>

    return (
        <>
            {error && <p>{error}</p>}
            <div className="notes-page">
                <div className="note-list-header">
                    <h2 className="all-notes-title">All Notes</h2>
                    <button onClick={() => navigate("/notes/new")} className="new-note-btn">New Note</button>
                </div>

                {selectedNote && (
                    <DeleteConfirmationModal
                        note={selectedNote}
                        onDelete={handleDelete}
                        onClose={() => setSelectedNote(null)}
                    />
                )}

                <FilterNote 
                    languages={languages}
                    languageFilter={languageFilter}
                    handleLanguageChange={handleLanguageChange}
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                />

                {notes.length === 0 ? (
                    <p> No notes yet.</p>
                ) : (
                <div className="view-notes-list">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={{
                                ...note,
                                favorite: Array.isArray(favorites) && favorites.includes(note.id)
                            }}
                            searchTerm={searchFromURL}
                            onView={handleView}
                            toggleFavorite={toggleFavorite}
                            onEdit={handleEdit}
                            onRequestDelete={handleRequestDelete}
                        />
                    ))}
                </div>
                )}

                <div className="pagination">
                    <button className="prev-btn" onClick={() => setPage(prev => prev - 1)} disabled={!hasPrev}>Previous</button>
                    
                    {[...Array(pages)].map((_, index) => {
                        const pageNumber = index +1 

                        return (
                            <button 
                                key={pageNumber} 
                                onClick={() => setPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}

                    <button className="next-btn" onClick={() => setPage(prev => prev + 1)} disabled={!hasNext}>Next</button>
                </div>
            </div>
        </>
    )
}

export default NoteList;