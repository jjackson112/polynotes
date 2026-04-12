import { useState } from "react";

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Successful register")

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        console.log("Register response", data)

        if (!res.ok) {
            console.log("Register unsuccessful", data)
        }

        } catch (err) {
            console.error("Network error:", err)
        }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="username"
                value="username"
                onChange={(e) => setForm({...form, username: e.target.value})}
            />
            <input
                placeholder="email"
                value= "email"
                onChange={(e) => setForm({...form, email: e.target.value})}
            />
            <input
                placeholder="password"
                value="password"
                onChange={(e) => setForm({...form, password: e.target.value})}
            />
            <button type="submit">Register</button>
        </form>
    )}
}