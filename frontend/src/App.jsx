import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import ViewNote from "./pages/ViewNote";

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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard authMessage={authMessage} />
            </ProtectedRoute>
          }
        />
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="/notes" 
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          }
        /> 
        <Route path="/notes/:id" element={<ViewNote />} />
      </Routes>
    </div>
  )
}

export default App