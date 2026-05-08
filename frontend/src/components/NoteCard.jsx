import { Heart } from "react-feather";

function NoteCard() {
    return (
        <div key={note.id} className="note-card">
            <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <Heart 
                    className="favorite-icon"
                    fill={note.favorite ? "#654632" : "none"}
                    stroke={note.favorite ? "#654632": "#2b211b"}
                />
            
                <p className="note-card-content">
                    {note.content.length > 80 
                        ? note.content.slice(0, 80) + "..."
                        : note.content}
                </p>
            </div>
        </div>
    )
}