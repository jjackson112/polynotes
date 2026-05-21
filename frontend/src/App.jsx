import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import ViewNote from "./pages/ViewNote";
import EditNote from "./pages/EditNote";
import { FavoriteProvider } from './context/FavoritesContext';
import FavNoteList from './pages/FavNoteList';

{/* Test backend connection */}

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => console.log("Backend:", data))
      .catch(err => console.error(err))
  }, [])

  const [authMessage, setAuthMessage] = useState("")

  useEffect(() => {
    const handleExpiredToken = () => {
      setAuthMessage("Session expired. Please log in again.")
    }

    window.addEventListener("auth:expired", handleExpiredToken)

    return () => {
      window.removeEventListener("auth:expired", handleExpiredToken)
    }
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <FavoriteProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard 
                authMessage={authMessage}
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          }
        />
        <Route path="/notes/new" 
          element={
            <ProtectedRoute>
              <NewNote 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          } 
        />
        <Route path="/notes" 
          element={
            <ProtectedRoute>
              <NoteList 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          }
        /> 
        <Route path="/notes/:id/edit" 
          element={
            <ProtectedRoute>
              <EditNote 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          } 
        />
        <Route path="/notes/:id" 
          element={
            <ProtectedRoute>
              <ViewNote 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          } 
        />
        <Route path="/favorites"
          element={
            <ProtectedRoute>
              <FavNoteList 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </FavoriteProvider>
  )
}

export default App