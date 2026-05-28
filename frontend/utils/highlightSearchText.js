export function HighlightSearchText(text, searchTerm) {
    if (!searchTerm || !text) return text

    // build a search pattern dynamically - regex
    // returns all matches despite capitalization (g-global, i-case insensitive)
    const regex = new RegExp(`(${SearchTerm})`, "gi")
    
}

export default HighlightSearchText;