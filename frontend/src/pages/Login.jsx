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
            console.error("Network error:", err)
        }
    } 

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div>
            {userLoggedIn ? (
                <div>
                    <h2>Logged in</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        value={form.username} // controlled input by React not the browser
                        placeholder="username"
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    <input
                        value={form.password} // controlled input always matches what's in the input + re-renders properly
                        placeholder="password"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    )
}

export default Login