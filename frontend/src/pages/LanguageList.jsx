import LanguageCard from "../components/LanguageCard";

function LanguageList() {
    const languages = ["English", "Hawaiian", "Italian", "Mandarin", "Spanish"]

    return (
        <div className="language-page">
            <div className="language-title">
                <h2>Languages</h2>
            </div>

            <div className="language-list">
                {languages.map((language) => (
                    <LanguageCard key={language} language={language} count={0} />
                ))}
            </div>
        </div>
    )
}

export default LanguageList;