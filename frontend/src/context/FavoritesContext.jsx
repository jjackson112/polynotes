import { useEffect, createContext, useContext, useReducer } from "react";
import { api } from "../api/api";

// create context
const FavoritesContext = createContext()

// useReducer is a function allowing you to determine how state changes in response to an action
const [favorites, dispatch] = useReducer(favoritesReducer, [])

function favoritesReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload
        
        case "TOGGLE": {}

        case "ROLLBACK":
            return action.payload
        
        default:
            return state
    }
}

export function FavoriteProvider({ children }) {
    
    // initial load once
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get("/notes/favorites")
                setFavorites(res.data || []) // this is only set once with || [] - not synced with backend
            } catch (err) {
                console.error("Failed to load favorites", err)
            }
        }
        fetchFavorites()
    }, [])

    // toggle function used everywhere - so Dashboard can re-render + doesn't crowd favorites
    const toggleFavorite = async (id) => {
        setFavorites(prev => {
            const exists = prev.includes(id)

            return exists
                ? prev.filter(f => f !== id)
                : [...prev, id]
        })

        // backend persistence
        try {
            await api.post(`/notes/favorites/${id}`)
        } catch (err) {
            console.error("Failed to sync favorite notes", err)
        }

            // rollback if backend fails + UI updates instantly
            setFavorites(prev =>
                exists
                    ? [...prev, id]
                    : prev.filter(f => f !== id)
            )
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            { children }
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => useContext(FavoritesContext)