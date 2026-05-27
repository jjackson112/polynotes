import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Search, NotebookPen, Menu, X } from "lucide-react";

function Header({ toggleSidebar, authMessage, search, setSearch }) {

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleSearchSubmit = (e) => {
        e.preventDefault()
    }
    
    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="header-container">
            {authMessage && <p>{authMessage}</p>}
            
            <button className="hamburger" onClick={toggleSidebar}>
                <Menu size={22} />
            </button>

            <div className="brand-icon">
                <NotebookPen size={36} />
                <h1 className="header-title">Polynotes</h1>
            </div>

            <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="search-box">
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" 
                    />
                    <button 
                        type="submit" 
                        id="search-icon"
                    >
                        <Search size={22} color="#2b211b" />
                    </button>
                </div>
            </form>

            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    )
}

export default Header;