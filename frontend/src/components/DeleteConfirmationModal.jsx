import { useState } from "react";

function DeleteConfirmationModal({ note, onDelete, onClose }) {

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-content">
                <h3>Are you sure you want to delete this note?</h3>
                <button className="delete-modal-btn"
                    onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note.id)
                }}>Yes</button>
                <button className="delete-modal-btn"
                    onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;