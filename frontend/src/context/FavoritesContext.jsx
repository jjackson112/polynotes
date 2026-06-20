import { useEffect, createContext, useContext, useReducer } from "react";
import { api } from "../api/api";
import { useAuth } from "./AuthContext";

// create context
const FavoritesContext = createContext()

// define reducer - mini state function
function favoritesReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload
        
        case "TOGGLE": {
            const id = action.payload
            const exists = state.includes(id)

            return exists
                ? state.filter(f => f !== id)
                : [...state, id]
        }

        case "ROLLBACK":
            return action.payload
        
        default:
            return state
    }
}

// useReducer is a function allowing you to determine how state changes in response to an action
// const [state, dispatch] = useReducer(reducer, initialArg, init?)
export function FavoriteProvider({ children }) {
    const [favorites, dispatch] = useReducer(favoritesReducer, [])
    const { userLoggedIn } = useAuth()

    // initial load once
    useEffect(() => {
        const token = localStorage.getItem("token")

        // check token before fetch
        if(!token) {
            dispatch({ type: "INIT", payload: [] })
            return
        }

        const fetchFavorites = async () => {
            try {
                const data = await api.get("/notes/favorites")
                console.log("Favorites response:", data)

                const favoriteIds = Array.isArray(data)
                    ? data  
                    : data.favorites || data.items || []
                
                // dispatch sends a description of what happens
                dispatch({
                    type:"INIT",
                    payload: favoriteIds
                })
            } catch (err) {
                console.error("Failed to load favorites", err)
            }
        }
        fetchFavorites()
    }, [userLoggedIn])    

    // toggle with optimistic update + rollback
    const toggleFavorite = async (id) => {
        const token = localStorage.getItem("token")
        if (!token) return

        const previousState = favorites

        // optimistic update
        dispatch({ type: "TOGGLE", payload: id })

        // backend persistence
        try {
            await api.post(`/notes/favorites/${id}`)
        } catch (err) {
            console.error("Failed to sync favorite notes", err)

            // rollback if backend fails + UI updates instantly
            dispatch({
                type: "ROLLBACK",
                payload: previousState
            })
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            { children }
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => useContext(FavoritesContext)