import './App.css'
import { useEffect } from "react";

{/* Test backend connection */}

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }, [])

  return <h1>Polynotes Frontend</h1>
}


    const { title, content, language, tags } = newNote

export default App
