function Header() {
    return (
        <header>
            <h2 className="header-container">Dashboard</h2>

            <input
                type="text"
                placeholder="Search notes"
                className="border px-3 py-1 rounded"
            />

            <button>Logout</button>
        </header>
    )
}

export default Header;