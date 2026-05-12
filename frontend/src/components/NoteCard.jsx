import { Heart } from "react-feather";
import { api } from "../api/api";

function NoteCard({ note, onView, onEdit, onRequestDelete, favorites, setFavorites }) {
    // function will accept a note.id to find the specific note from the notes array
    // user-specific state
    const isFavorited = favorites.includes(note.id)

    // click favorite on note card
    const clickFavorite = async (e) => {
        e.stopPropagation()
        const res = await api.post(`/notes/${note.id}/favorite`)

        setFavorites(prev =>
            res.data.favorited
            ? [...prev, note.id]
            : prev.filter(id => id !== note.id)
        )
    }

    return (
        <div className="note-card" onClick={() => onView(note.id)}>
            <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <Heart 
                    className="favorite-icon"
                    onClick={clickFavorite}
                    fill={isFavorited ? "#654632" : "none"}
                    stroke={isFavorited ? "#654632": "#2b211b"}
                />
            </div>
            
            <p className="note-card-content">
                {note.content.length > 80 
                    ? note.content.slice(0, 80) + "..."
                    : note.content}
            </p>

            {/* Added Edit + Delete Buttons */}
            <div className="note-card-actions">
                {onEdit && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation() // stops the parent handler from firing too - no more seeing the ViewNote when user clicks edit button on NoteList
                            onEdit(note.id)
                        }}>Edit</button>
                )}
                {onRequestDelete && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            onRequestDelete(note)
                        }}>Delete</button>
                )}
            </div>
        </div>
    )
}

export default NoteCard;