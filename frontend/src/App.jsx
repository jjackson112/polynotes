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
      <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />}/>

          <Route path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/notes/new" 
            element={
              <ProtectedRoute>
                <NewNote />
              </ProtectedRoute>
            } 
          />
          <Route path="/notes" 
            element={
              <ProtectedRoute>
                <NoteList />
              </ProtectedRoute>
            }
          /> 
          <Route path="/notes/:id/edit" 
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            } 
          />
          <Route path="/notes/:id" 
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            } 
          />
          <Route path="/favorites"
            element={
              <ProtectedRoute>
                <FavNoteList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </FavoriteProvider>
  )
}

export default App