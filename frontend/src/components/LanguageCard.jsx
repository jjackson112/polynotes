import { Globe } from "lucide-react";

function LanguageCard({ language, count }) {
    const languageIcons = {
        english: `🍔`,
        hawaiian: `🌺`,
        italian: `🍝`,
        mandarin: `🐼`,
        spanish: `🌮`
    }

    return (
        <article className="language-category-card">

            <div className="language-icon">
                {languageIcons[language.toLowerCase()] || <Globe size={42} />}
            </div>

            <h3 className="language-card-title">{language}</h3>

            <p className="language-card-content">{count} notes</p>

        </article>
    )
}

export default LanguageCard;