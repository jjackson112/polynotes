// state remains in NoteList + FilterNote owns the render UI filter only
import { Filter } from "react-feather";

function FilterNote({ languages, languageFilter, setLanguageFilter}) {
    return (
        <div className="language-form">
            <Filter />

            <form className="language-filter">
                <label htmlFor="language">Filter Languages:</label>
                <select 
                    value={languageFilter}
                    className="language-category"
                    onChange={(e) => setLanguageFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
            </form>   
        </div>
    )
}

export default FilterNote;