import { useState } from "react";

function DeleteConfirmationModal({ note, onDelete, onClose }) {

    // so the user cannot continue to click delete when request is ongoing
    const [loading, setLoading] = useState(false)

    const handleLoading = async () => {
        setLoading(true)
        try {
            await onDelete(note.id)
            onClose() // optional, clean UX
        } finally {
            setLoading(false)
        }
    }

    // yes - run delete + no - close modal

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-content">
                <h3>Are you sure you want to delete this note?</h3>
                <button className="delete-modal-btn"
                    onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note.id)
                    }}>
                    {loading ? "Deleting" : "Yes"}
                </button>
                <button className="delete-modal-btn"
                    onClick={handleLoading}
                    disabled={loading}
                    >No
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;