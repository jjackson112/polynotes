import { useEffect, createContext, useContext, useReducer } from "react";
import { api } from "../api/api";

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

    // initial load once
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get("/notes/favorites")

                // dispatch sends a description of what happens
                dispatch({
                    type:"INIT",
                    payload: res.data || []
                })
            } catch (err) {
                console.error("Failed to load favorites", err)
            }
        }
        fetchFavorites()
    }, [])    

    // toggle with optimistic update + rollback
    const toggleFavorite = async (id) => {
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