import { useEffect, useState, createContext, useContext } from "react";
import { api } from "../api/api";

// create context
const FavoritesContext = createContext()

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]) 
    
    // initial load once
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get("/notes/favorites")
                setFavorites(res) // this is only set once with || [] - not synced with backend
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
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            { children }
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => useContext(FavoritesContext)