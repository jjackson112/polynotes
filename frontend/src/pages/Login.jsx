import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

{/* useEffect → checks localStorage → restores login */}

{/* Create state for login form */}
function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const { token, login, logout, userLoggedIn } = useAuth();

    const navigate = useNavigate();

    // test function for protected route
    const hitProtectedRoute = async () => {

        if (!token) {
            console.error("No token found")
            return
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/protected", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            console.log("Protected response:", data)

        } catch (err) {
            console.log("Error", err)
        }
    }  

    {/* Fetch all notes */}
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Logging in")

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        // console.log("Login response", data)

        if (!res.ok) {
            console.error("Login failed", data)
            return // stop execution so this doesn't run on failure
        }

        // centralized auth replacing stored token + updating login state
        login(data.token)
        // after login succeeds user is directed to the dashboard
        navigate("/dashboard")

        // clear form after logging in 
        setForm({ username: "", password: ""})

    } catch (err) {
        console.error("Network error:", err)
    }
} 

    return (
        <div>
            {userLoggedIn ? (
                <div>
                    <h2>Logged in</h2>
                    <button onClick={logout}>Logout</button>
                    <button onClick={hitProtectedRoute}>Test Protected Route</button>
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