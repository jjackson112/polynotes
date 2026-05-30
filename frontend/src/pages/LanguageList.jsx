import LanguageCard from "../components/LanguageCard";

function LanguageList() {
    const languages = ["English", "Hawaiian", "Italian", "Mandarin", "Spanish"]

    return (
        
        <div className="language-list">
            {languages.map((language) => (
                <LanguageCard key={language} language={language} count={0} />
            ))}
        </div>
    )
}

export default LanguageList;