import { api } from "../api/api";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";

function FavNoteList() {

    
    return (
            <>
                <Header />
                <div className="note-list-header">
                    <h2 className="all-notes-title">All Notes</h2>
                    <button onClick={() => navigate("/notes/new")} className="new-note-btn">New Note</button>
                </div>
                {selectedNote && (
                    <DeleteConfirmationModal
                        note={selectedNote}
                        onDelete={handleDelete}
                        onClose={() => setSelectedNote(null)}
                    />
                )}
                <div className="view-notes-list">
                    {sortedNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onView={handleView}
                            onEdit={handleEdit}
                            onRequestDelete={handleRequestDelete}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    ))}
                </div>
            </>
        )
}

export default FavNoteList;