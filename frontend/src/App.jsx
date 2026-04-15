import './App.css'
import Login from './pages/Login';
import { useEffect } from "react";
import { AuthProvider } from './context/AuthContext';

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
    </div>
  )
}

//*const { title, content, language, tags } = newNote

<AuthProvider>
  <App />
</AuthProvider>
export default App