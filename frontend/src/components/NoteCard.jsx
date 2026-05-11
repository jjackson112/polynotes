import { Heart } from "react-feather";

function NoteCard({ note, onView, onEdit, onDelete }) {
    return (
        <div className="note-card" onClick={() => onView(note.id)}>
            <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <Heart 
                    className="favorite-icon"
                    fill={note.favorite ? "#654632" : "none"}
                    stroke={note.favorite ? "#654632": "#2b211b"}
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
                {onDelete && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(note.id)
                        }}>Delete</button>
                )}
            </div>
        </div>
    )
}

export default NoteCard;