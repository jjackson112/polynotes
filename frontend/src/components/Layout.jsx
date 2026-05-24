import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children, sidebarOpen, setSidebarOpen, authMessage }) {
  return (
    <div className="app-layout">
            <Sidebar 
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

        <div className="main-area">
            <Header 
            toggleSidebar={() => setSidebarOpen(prev => !prev)} 
            authMessage={authMessage}
            />
        </div>

        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout;