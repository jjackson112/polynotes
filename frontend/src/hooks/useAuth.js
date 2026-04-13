import { useState, useEffect } from "react";

export function useAuth() {
    const [token, setToken] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    // restore session on load
    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
            setUserLoggedIn(true)
        }
    }, [])

    // login function
    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        setUserLoggedIn(true)
    }
    
    // logout function
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUserLoggedIn(false)
    } 

    return {
        token,
        userLoggedIn,
        login,
        logout
    }
}
