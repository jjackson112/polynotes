import { useState, useEffect } from "react";
import LanguageCard from "../components/LanguageCard";

function LanguageList() {
    const languages = ["English", "Hawaiian", "Italian", "Mandarin", "Spanish"]
    
    const [count, setCount] = useState({}) // tuples, not array {}

    useEffect(() => {
        api.get("/language-counts")
        .then(data => setCount(data))
        .catch(err => console.error(err))
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
                        count={count[language.toLowerCase()] ||0}
                    />
                ))}
            </div>
        </div>
    )
}

export default LanguageList;