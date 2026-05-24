import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

{/* What authenticated users should see - header + sidebar */}
function AppLayout({ children, sidebarOpen, setSidebarOpen, authMessage }) {
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

export default AppLayout;