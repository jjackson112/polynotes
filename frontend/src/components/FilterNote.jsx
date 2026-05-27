// state remains in NoteList + FilterNote owns the render UI filter only
import { Filter } from "react-feather";

function FilterNote({ languages, languageFilter, setLanguageFilte, search }) {

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
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                />
            </form>   
        </div>
    )
}

export default FilterNote;