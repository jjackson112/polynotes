import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";

{/* Test backend connection */}

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => console.log("Backend:", data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard notes={notes}/>
            </ProtectedRoute>
          }
        />
        <Route path="/notes/new" element={<NewNote onNoteCreated={setNotes}/>} />
      </Routes>
    </div>
  )
}

//*const { title, content, language, tags } = newNote

export default App