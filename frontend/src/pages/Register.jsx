import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

// Register → receive tokens → authenticated → dashboard

function Register() {
    const initialForm = {
        username: "",
        email: "",
        password: ""
    }

    const [registerForm, setRegisterForm] = useState(initialForm)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const response = await api.post("/auth/register", registerForm)
            const data = response.data
            console.log("Successful register")

            // auto-login after registering - smooth UX
            login(data.token)

            // clear form 
            setRegisterForm (initialForm)

            setSuccess("Successfully registered.")
            navigate("/dashboard")

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")

        } finally {
            setLoading(false)
        }
}

    return (
        <>
            <div className="branding">
                <h1 className="branding-title">Polynotes</h1>
                <h2 className="branding-tagline">Organize your language-learning notes.</h2>
            </div>

            {error && (<p className="register-error">{error}</p>)} 
            <div className="register-container">
        
                <form onSubmit={handleSubmit} className="register-form">

                    <input
                        className="register-input"
                        required
                        name="username"
                        value={registerForm.username}
                        type="text"
                        placeholder="username"
                        onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    />
                    <input
                        className="register-input"
                        required
                        name="email"
                        value={registerForm.email}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    />
                    <input
                        className="register-input"
                        required
                        name="password"
                        value={registerForm.password}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    />
                    <button type="submit" className="register-button" disabled={loading}>{loading ? "Registering" : "Register"}</button>
                    <Link to="/" className="already-registered-message">Already registered? Log in here.</Link>
                </form>
            </div>
        </>
    )
}

export default Register