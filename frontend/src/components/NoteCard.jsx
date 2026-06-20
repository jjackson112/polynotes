import { Heart } from "react-feather";
import { HighlightSearchText } from "../../utils/highlightSearchText";
import { Edit2, Trash2 } from "react-feather";

function NoteCard({ note, onEdit, onView, onRequestDelete, toggleFavorite, searchTerm }) {
    const updated_timestamp = note.updated_at 
        ? new Date(note.updated_at).toLocaleDateString() // created timestamp
        : "Never"
    const content = note.content || ""

    const showLanguage = note.language.charAt(0).toUpperCase() + note.language.slice(1)

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

            <p className="note-card-timestamp">
                {note.updated_at && (
                    <>
                        <span>Updated: {updated_timestamp}</span>
                    </>
                )}
            </p>

            <div className="note-card-meta">
                <p className="language-banner">{showLanguage}</p>
                <p className="tag-banner">{note.tags?.map(tag => `#${tag}`).join(" ")}</p>
            </div>

            {/* Added Edit + Delete Buttons */}
            <div className="note-card-actions">
                {onEdit && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation() // stops the parent handler from firing too - no more seeing the ViewNote when user clicks edit button on NoteList
                            onEdit(note.id)
                        }}><Edit2 size={16} /></button>
                )}
                {onRequestDelete && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            onRequestDelete(note)
                        }}><Trash2 size={16} /></button>
                )}
            </div>
        </article>
    )
}

export default NoteCard;