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
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                setNotes(res) 
            } catch {
                console.error("Failed to load notes", err)
            }
        }
        fetchNotes()
    }, [])

    const favoriteNotes = notes.filter(note => favorites.includes(note.id))

    return (
            <>
                <Header />

                <div className="note-list-header">
                    <h2 className="all-notes-title">Favorite Notes</h2>
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
                                onRequestDelete={handleRequestDelete}
                            />
                            )
                    ))}
                </div>
            </>
        )
}

export default FavNoteList;