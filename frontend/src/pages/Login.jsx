import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

{/* useEffect → checks localStorage → restores login */}

{/* Create state for login form */}
function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const { login, logout, userLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(userLoggedIn) {
            navigate("/dashboard")
        }
    }, [userLoggedIn, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Logging in")

        try {
            const data = await api.post("/auth/login", form)

            // centralized auth replacing stored token + updating login state - successful login
            login(data.token)

            // after login succeeds user is directed to the dashboard
            // optional - login(data.token) triggers login() like navigate("/dashboard")

            // clear form after logging in 
            setForm({ username: "", password: ""})

        } catch (err) {
            setError(err.message || "Login failed")
        }
    } 

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="container">
            {error && <p>{error}</p>}

            {userLoggedIn ? (
                <div>
                    <h2>Logged in</h2>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Polynotes</h1>
                    <p>Login to continue</p>

                    <input
                        className="login-input"
                        value={form.username} // controlled input by React not the browser
                        placeholder="username"
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    <input
                        className="login-input"
                        value={form.password} // controlled input always matches what's in the input + re-renders properly
                        type="password"
                        placeholder="password"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
            )}
        </div>
    )
}

export default Login