import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";

// GET notes, GET favorite ids list + filter?
// FavoriteContext provides ids, not fetching of favorite notes

function FavNoteList() {
    const [notes, setNotes] = useState([])
    const { toggleFavorite } = useFavorites()

    const navigate = useNavigate()

    const [pages, setPages] = useState(0)
    const [hasPrev, setHasPrev] = useState(false)
    const [hasNext, setHasNext] = useState(false) 

    // read URL query from Header - search results page 
    const [searchParams, setSearchParams] = useSearchParams()
    
    // value that controlls the search results
    const searchFromURL = searchParams.get("search") || "" 

    const pageFromURL = Number(searchParams.get("page")) || 1
    
    useEffect(() => {
        const fetchFavoriteNotes = async () => {
            try {
                const res = await api.get(`/notes/favorites/notes?page=${pageFromURL}&per_page=12`)
                setNotes(res.items || []) 
                setPages(res.pages || 0)
                setHasNext(Boolean(res.has_next))
                setHasPrev(Boolean(res.has_prev))
            } catch (err) {
                console.error("Failed to load notes", err)
            }
        }
        fetchFavoriteNotes()
    }, [pageFromURL])

    // handle pagination - pagefromURL is driven by URL
    const updatePage = (newPage) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", newPage)
        setSearchParams(params)
    }

    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    return (
        <>
        <div className="fav-list-header">
            <h2 className="fav-notes-title">Favorite Notes</h2>
        </div>
        
        <div className="fav-notes-list">
            {notes.length === 0 ? (
                <p>No favorite notes yet.</p>
            ) : (
                notes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={{
                            ...note,
                            favorite: true
                        }}
                        onView={handleView}
                        toggleFavorite={toggleFavorite}
                    />
                    ))
            )}
        </div>

            <div className="pagination">
                <button className="prev-btn" onClick={() => updatePage(pageFromURL - 1)} disabled={!hasPrev}>Previous</button>

                    {[...Array(pages)].map((_, index) => {
                        const pageNumber = index +1 
                        return (
                            <button 
                                key={pageNumber} 
                                onClick={() => updatePage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}
                <button className="next-btn" onClick={() => updatePage(pageFromURL + 1)} disabled={!hasNext}>Next</button>
            </div>
        </>
    )
}

export default FavNoteList;