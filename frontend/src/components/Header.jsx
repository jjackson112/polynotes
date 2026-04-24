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
            <h2>Dashboard</h2>

            <input
                type="text"
                placeholder="Search notes"
                className="border px-3 py-1 rounded"
            />

            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>
    )
}

export default Header;