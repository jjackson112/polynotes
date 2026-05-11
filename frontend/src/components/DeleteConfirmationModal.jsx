import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteConfirmationModal({ note, onDelete }) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-content">
                <h3>Are you sure you want to delete this note?</h3>
                <button onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note.id)
                }}>Yes</button>
                <button onClick={() => navigate= "/notes"}>No</button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;