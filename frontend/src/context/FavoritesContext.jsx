import { useEffect, useState, createContext } from "react";
import { api } from "../api/api";

// create context
const FavoriteContext = createContext()

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]) 
}
