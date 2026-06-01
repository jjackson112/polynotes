import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LanguageCard({ language }) {
    const languageIcons = {
        english: `🍔`,
        hawaiian: `🌺`,
        italian: `🍝`,
        mandarin: `🐼`,
        spanish: `🌮`
    }

    const [count, setCount] = useState([])

    useEffect(() => {
        api.get("/language-counts")
        .then(data => setCount(data))
        .catch(err => console.error(err))
    }, [])

    return (
        <Link to={`/notes?language=${language.toLowerCase()}`} className="language-category-link">
            <article className="language-category-card">

                <div className="language-icon">
                    {languageIcons[language.toLowerCase()] || <Globe size={42} />}
                </div>

                <h3 className="language-card-title">{language}</h3>

            </article>
        </Link>
    )
}

export default LanguageCard;