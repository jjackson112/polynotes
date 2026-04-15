import { createContext, useState, useEffect } from "react";

// create context
export const AuthContext = createContext()

// provider component
export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)

    // restore session on load
    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    // login function
    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }
    
    // logout function
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    } 

    const userLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, userLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}