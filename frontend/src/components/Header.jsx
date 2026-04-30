import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Search, NotebookPen, Menu, X } from "lucide-react";

function Header({ toggleSidebar }) {

    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="header-container">
            <button className="hamburger" onClick={toggleSidebar}>
                <Menu size={22} />
            </button>

            <div className="brand-icon">
                <NotebookPen size={36} />
                <h1 className="header-title">Polynotes</h1>
            </div>

            <div className="search-box">
                <input type="text" placeholder="Search" />
                <Search className="search-icon" size={22} color="#2b211b" />
            </div>

            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    )
}

export default Header;