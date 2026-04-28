import { useNavigate } from "react-router-dom";

function NewNote() {
    const navigate = useNavigate()

    return (
        <main>
            <input 
                placeholder="Note Title"
            />

            <textarea
                placeholder="Write new note"
            />

            <button onClick={() => navigate(`/notes/${newId}`)}>Save</button>
            <button onClick={() => navigate("/dashboard")}>Cancel</button>
        </main>
    )
}

export default NewNote;