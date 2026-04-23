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
        <header>
            <h2 className="header-container">Dashboard</h2>

            <input
                type="text"
                placeholder="Search notes"
                className="border px-3 py-1 rounded"
            />

            <button className={handleLogout}>Logout</button>
        </header>
    )
}

export default Header;