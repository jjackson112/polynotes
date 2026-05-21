import { api } from "../api/api";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { useFavorites } from "../context/FavoritesContext";

// GET favorite ids list + filter?

function FavNoteList() {
    const [favNotes, setFavNotes] = useState([])
    const {favorites, toggleFavorite } = useFavorites()

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