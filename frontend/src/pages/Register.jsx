import { useState } from "react";
import { api } from "../api/api";

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
            const data = await api.post("/auth/register", registerForm)

        } catch (err) {
            console.error("Network error:", err)
        }
}

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={registerForm.username}
                placeholder="username"
                onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
            />
            <input
                value={registerForm.email}
                placeholder="email"
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
            />
            <input
                value={registerForm.password}
                placeholder="password"
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
            />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register