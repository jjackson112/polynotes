// <a> reloads the whole page + browser - can also feel slower or reset React state
// Link changes the route instantly with no page reload like a real app
// NavLink is better for sidebar - highlights active page automatically

import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/notes">Notes</NavLink>
        </aside>
    )
}

export default Sidebar;