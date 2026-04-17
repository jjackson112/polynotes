import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)


    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const response = await api.post("/auth/register", registerForm)
            const data = response.data
            console.log("Successful register")

            login(data.token)

            // clear form 
            setRegisterForm ({
                username: "",
                email: "",
                password: ""
            })

            navigate("/login")


        } catch (err) {
            console.error("Network error:", err)
        } finally {
            setLoading(false)
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
                type="email"
                placeholder="email"
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
            />
            <input
                value={registerForm.password}
                type="password"
                placeholder="password"
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
            />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register