import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Header() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="header-container">
            <input
                type="text"
                placeholder="Search notes"
                className="border px-3 py-1 rounded"
            />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    )
}

export default Header;