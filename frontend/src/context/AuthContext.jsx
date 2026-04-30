import { createContext, useState, useEffect } from "react";

// create context
export const AuthContext = createContext()

// provider component
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token")
    })

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

    const userLoggedIn = Boolean(token)

    return (
        <AuthContext.Provider value={{ token, login, logout, userLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}