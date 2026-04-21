import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { useEffect } from "react";
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";

{/* Test backend connection */}

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => console.log("Backend:", data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Polynotes Frontend</h1>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

//*const { title, content, language, tags } = newNote

export default App