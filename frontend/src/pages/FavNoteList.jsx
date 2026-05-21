import { useEffect, useState } from "react";
import { api } from "../api/api";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { useFavorites } from "../context/FavoritesContext";

// GET notes, GET favorite ids list + filter?
// FavoriteContext provides ids, not fetching of favorite notes

function FavNoteList() {
    const [favNotes, setFavNotes] = useState([])
    const {favorites, toggleFavorite } = useFavorites()
    
    useEffect(() => {
        const fetchFavoriteNotes = async () => {
            try {
                const res = await api.get("/notes/favorites")
                setFavorites(res) 
            } catch {
                console.error("Failed to load favorites", err)
            }
        }
        fetchFavoriteNotes()
    }, [])

    const favoriteNotes = note.filter(note => favoriteNotes.includes(note.id))

    return (
            <>
                <Header />

                <div className="note-list-header">
                    <h2 className="all-notes-title">Favorite Notes</h2>
                </div>

                <div className="fav-notes-list">
                    {favoriteNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={{
                                ...note,
                                favorite: true
                            }}
                            onView={handleView}
                            onEdit={handleEdit}
                            toggleFavorite={toggleFavorite}
                            onRequestDelete={handleRequestDelete}
                        />
                    ))}
                </div>
            </>
        )
}

export default FavNoteList;