import { useState, useEffect } from "react";
import { api } from "../api/api";
import LanguageCard from "../components/LanguageCard";

function LanguageList() {
    const languages = ["English", "Hawaiian", "Italian", "Mandarin", "Spanish"]
    
    const [counts, setCounts] = useState({}) // tuples, not array {}

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                setLoading(true)
                setError("")

                const data = await api.get("/notes/language-counts")
                setCounts(data)
            } catch (err) {
                console.log(err)
                setError("Failed to fetch languages.")
            } finally {
                setLoading(false)
            }
        }
        
        fetchLanguages()
    }, [])

    return (
        <div className="language-page">
            <div className="language-title">
                <h2>Languages</h2>
            </div>

            <div className="language-list">
                {languages.map((language) => (
                    <LanguageCard 
                        key={language} 
                        language={language} 
                        count={count[language.toLowerCase()] || 0}
                    />
                ))}
            </div>
        </div>
    )
}

export default LanguageList;