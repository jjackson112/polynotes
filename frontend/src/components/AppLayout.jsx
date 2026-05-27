import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

{/* What authenticated users should see - header + sidebar */}
function AppLayout({ sidebarOpen, setSidebarOpen, authMessage, search, setSearch }) {
  return (
    <>
        <div className="app-layout">
            {/* Column 1 */}
            <Sidebar 
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            <div className="main-area">
                <Header 
                toggleSidebar={() => setSidebarOpen(prev => !prev)} 
                authMessage={authMessage}
                search={search}
                setSearch={setSearch}
                />

                <main className="page-content">
                    <Outlet />   {/* 🔥 this is what renders NoteList */}
                </main>
            </div>
        </div>
    </>
  )
}

export default AppLayout;