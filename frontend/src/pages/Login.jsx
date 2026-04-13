import { useState, useEffect } from "react";

{/* useEffect → checks localStorage → restores login */}

{/* Create state for login form */}
function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    // app load to initialize state
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setUserLoggedIn(true)
        }
    }, []) 

    {/* Fetch all notes */}
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Logging in")

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        console.log("Login response", data)

        if (!res.ok) {
            console.error("Login failed", data)
            return // stop execution so this doesn't run on failure
        }

        // Store token - persistence layer to restore on reload
        localStorage.setItem("token", data.token)

        // Update state
        setUserLoggedIn(true)

    } catch (err) {
        console.error("Network error:", err)
    }
}

    // test function for protected route
    const hitProtectedRoute = async () => {
        const token = localStorage.getItem("token")

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

    return (
        <div>
            {userLoggedIn ? (
                <h2>Logged in</h2>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="username"
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    <input
                        placeholder="password"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    <button type="submit">Login</button>
                </form>
            )}
            <button onClick={hitProtectedRoute}>Test protected route</button>
        </div>
    )
}

export default Login