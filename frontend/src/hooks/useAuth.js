import { useState, useEffect } from "react";

export function useAuth() {
    // token !== null means user is logged in - do I need both?
    const [token, setToken] = useState(null)

    // no setter needed - it's a derived state
    // is this value truthy? Is there a token?
    const userLoggedIn = !!token 

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

    return {
        token,
        userLoggedIn,
        login,
        logout
    }
}
