// <a> reloads the whole page + browser - can also feel slower or reset React state
// Link changes the route instantly with no page reload like a real app
// NavLink is better for sidebar - highlights active page automatically

import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

function Sidebar() {
    return (
        <aside>
            <nav>
                <button className="hamburger">
                    <Menu size={22} />
                </button>
                
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/notes">Notes</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/tags">Tags</Link>
            </nav>
        </aside>
    )
}

export default Sidebar;