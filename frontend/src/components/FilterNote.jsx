// state remains in NoteList + FilterNote owns the render UI filter only
// use for language + tag filtering only for search

import { Filter } from "react-feather";

function FilterNote({ languages, languageFilter }) {

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
                        <option key={language} value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</option>
                    ))}
                </select>
            </form>   

        </div>
    )
}

export default FilterNote;