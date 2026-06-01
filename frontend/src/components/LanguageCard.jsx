import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

function LanguageCard({ language }) {
    const languageIcons = {
        english: `🍔`,
        hawaiian: `🌺`,
        italian: `🍝`,
        mandarin: `🐼`,
        spanish: `🌮`
    }

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