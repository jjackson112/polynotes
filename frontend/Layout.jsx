import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="app-shell">
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} />

      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;