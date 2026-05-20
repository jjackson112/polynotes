// <a> reloads the whole page + browser - can also feel slower or reset React state
// Link changes the route instantly with no page reload like a real app
// NavLink is better for sidebar - highlights active page automatically

// User clicks "Notes" → <Link to="/notes"> → URL changes to /notes → React Router sees matching route → renders <NoteList />

import { Link } from "react-router-dom";
import { X } from "lucide-react";

function Sidebar({ open, setOpen }) {

    return (
        <aside className={`sidebar-wrapper ${open ? "open" : ""}`}>
            <button className="close-btn" onClick={() => setOpen(false)}>
                <X size={22} />
            </button>
            
            <nav>
                <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                <Link to="/notes" onClick={() => setOpen(false)}>Notes</Link>
                <Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link>
                <Link to="/languages" onClick={() => setOpen(false)}>Languages</Link>
                <Link to="/tags" onClick={() => setOpen(false)}>Tags</Link>
            </nav>
        </aside>
    )
}

export default Sidebar;