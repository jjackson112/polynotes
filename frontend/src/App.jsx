import './App.css'
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { FavoriteProvider } from './context/FavoritesContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import ViewNote from "./pages/ViewNote";
import EditNote from "./pages/EditNote";
import FavNoteList from './pages/FavNoteList';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authMessage, setAuthMessage] = useState("")
  const [search, setSearch] = useState("")

  {/* Test backend connection */}
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => console.log("Backend:", data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const handleExpiredToken = () => {
      setAuthMessage("Session expired. Please log in again.")
    }

    window.addEventListener("auth:expired", handleExpiredToken)

    return () => {
      window.removeEventListener("auth:expired", handleExpiredToken)
    }
  }, [])

  return (
    <FavoriteProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Route>

      {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <AppLayout 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
              authMessage={authMessage}
              search={search}
              setSearch={setSearch}
            />
          </ProtectedRoute>
        }>          

          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/notes/new" element={<NewNote />}/>
          <Route path="/notes" element={<NoteList />}/> 
          <Route path="/notes/:id" element={<ViewNote />}/>
          <Route path="/notes/:id/edit" element={<EditNote />}/>
          <Route path="/favorites" element={<FavNoteList />}/>
          <Route path="/languages" element={}/>
          <Route path="/tags" element={}/>
        </Route>

      </Routes>
    </FavoriteProvider>
  )
}

export default App