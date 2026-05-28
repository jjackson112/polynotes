import { Heart } from "react-feather";
import { HighlightSearchText } from "../../utils/highlightSearchText";

function NoteCard({ note, onEdit, onView, onRequestDelete, toggleFavorite, searchTerm }) {
    const content = note.content || ""

    return (
        <article className="note-card"  onClick={() => onView(note.id)}>
            <div className="note-card-header">
                <h3 className="note-card-title">{HighlightSearchText(note.title, searchTerm)}</h3>
                <Heart 
                    className="favorite-icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(note.id)
                    }}
                    fill={note.favorite ? "#654632" : "none"}
                    stroke={note.favorite ? "#654632": "#2b211b"}
                />
            </div>
            
            <p className="note-card-content">
                {HighlightSearchText(content.length > 80 
                    ? content.slice(0, 80) + "..."
                    : content, searchTerm)}
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
        </article>
    )
}

export default NoteCard;