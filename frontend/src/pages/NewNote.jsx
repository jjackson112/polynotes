function NewNote() {
    return (
        <main>
            <input 
                placeholder="Note Title"
            />

            <textarea
                placeholder="Write new note"
            />

            <button>Save</button>
        </main>
    )
}

export default NewNote;