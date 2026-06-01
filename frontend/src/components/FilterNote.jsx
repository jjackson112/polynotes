// state remains in NoteList + FilterNote owns the render UI filter only
// use for language + tag filtering only for search

import { Filter, Hash } from "react-feather";

function FilterNote({ languages, languageFilter, setLanguageFilter, tagFilter, setTagFilter }) {

    return (
        <div className="filter-section">
            <div className="filter-language-div">
                <Filter />
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
            </div>
            
            <div className="filter-tag-div">
                <Hash />
                <label>Tag(s):</label>
                <input
                    type="text"
                    className="tag-filter"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    placeholder="tag search"
                />
            </div>
        </div>   

    )
}

export default FilterNote;