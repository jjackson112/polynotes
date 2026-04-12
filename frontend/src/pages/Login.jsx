import { useState } from "react";

{/* Create state for login form */}
function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
}

{/* Fetch all notes */}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Logging in")

    const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    })
}

