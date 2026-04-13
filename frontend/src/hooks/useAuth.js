import { useState, useEffect } from "react";

export function useAuth() {
    // token !== null means user is logged in - do I need both?
    const [token, setToken] = useState(null)
    const userLoggedIn = !!token // is this value truthy? Is there a token?

    // restore session on load
    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
            userLoggedIn(true)
        }
    }, [])

    // login function
    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        userLoggedIn(true)
    }
    
    // logout function
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        userLoggedIn(false)
    } 

    return {
        token,
        userLoggedIn,
        login,
        logout
    }
}
