import { useEffect, useState } from "react";
import { api } from "../api/api";
import NoteCard from "../components/NoteCard";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

// GET notes, GET favorite ids list + filter?
// FavoriteContext provides ids, not fetching of favorite notes

function FavNoteList() {
    const [notes, setNotes] = useState([])
    const {favorites, toggleFavorite } = useFavorites()

    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                setNotes(res.items || []) 
            } catch (err) {
                console.error("Failed to load notes", err)
            }
        }
        fetchNotes()
    }, [])

    const favoriteNotes = notes.filter(note => favorites.includes(note.id))

    const handleView = (id) => {
        navigate(`/notes/${id}`)
    }

    return (
        <>
        <div className="fav-list-header">
            <h2 className="fav-notes-title">Favorite Notes</h2>
        </div>
        <div className="fav-notes-list">
            {favoriteNotes.length === 0 ? (
                <p>No favorite notes yet.</p>
            ) : (
                favoriteNotes.map(note => (
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
        </>
    )
}

export default FavNoteList;