export function HighlightSearchText(text, searchTerm) {
    if (!searchTerm || !text) return text

    // build a search pattern dynamically - regex
    // returns all matches despite capitalization (g-global, i-case insensitive)
    const regex = new RegExp(`(${searchTerm})`, "gi")

    // split the text to get the capturing group (${searchTerm})
    // matched text is reserved - treat it differently
    const parts = text.split(regex)

    return parts.map((part, index) =>
        
    )
}

export default HighlightSearchText;