import { useEffect, useState, createContext } from "react";
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
        console.log("Updated favorites", favorites)
    }, [])
}

export const 