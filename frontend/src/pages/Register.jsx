import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await api.post("/auth/register", registerForm)
            console.log("Successful register")

            // centralized auth replacing stored token + updating login state - successful login
            login(data.token)
            navigate("/dashboard")

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