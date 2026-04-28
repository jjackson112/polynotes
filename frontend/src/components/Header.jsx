import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Search, NotebookPen } from "lucide-react";

function Header() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="header-container">
            <div className="brand-icon">
                <NotebookPen size={28} />
                <h1>Polynotes</h1>
            </div>

            <div className="search-box">
                <input type="text" placeholder="Search" />
                <Search size={18} color="#2b211b" />
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    )
}

export default Header;