import { useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

{/* useEffect → checks localStorage → restores login */}
{/* Login → receive tokens → authenticated → dashboard */}

{/* Create state for login form */}
function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Logging in")

        try {
            const data = await api.post("/auth/login", form)
            console.log("Login response:", data)

            if (!data.token) {
                throw new Error(data.error || "No token required from server")
            }
            
            // centralized auth replacing stored token + updating login state - successful login
            login(data.token)

            // after login succeeds user is directed to the dashboard
            // optional - login(data.token) triggers login() like navigate("/dashboard")

            // clear form after logging in 
            setForm({ username: "", password: ""})

            navigate("/dashboard")

        } catch (err) {
            console.log("Login error", err)
            setError(err.message || "Login failed")
        }
    } 

    const handleChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.value]: e.target.value
        })
    }

    return (
        <div className="container">
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
                <p>Login to continue</p>
                
                <input
                    className="login-input"
                    type="text"
                    name="identifier"
                    value={form.identifier} // controlled input by React not the browser
                    placeholder="username or email"
                    onChange={handleChange}
                />
                <input
                    className="login-input"
                    type="password"
                    name="identifier"
                    value={form.password} // controlled input always matches what's in the input + re-renders properly
                    placeholder="password"
                    onChange={handleChange}
                />
                <button type="submit" className="login-button">Login</button>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    )
}

export default Login