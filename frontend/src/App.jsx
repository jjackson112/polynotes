import './App.css'
import Login from './pages/Login';
import Register from './pages/Register'
import { useEffect } from "react";

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
      <Login />
      <Register />
    </div>
  )
}

{/*const { title, content, language, tags } = newNote */}

export default App