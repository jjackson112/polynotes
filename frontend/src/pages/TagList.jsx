import { useState, useEffect } from "react";
import { api } from "../api/api";
import TagBubble from "../components/TagBubble";

function TagList() {
    const [tags, setTags] = useState({}) // objects, not an array {}

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true)
                setError("")

                const data = await api.get("/notes/tag-counts")
                setTags(data)
            } catch {
                console.error(err)
                setError("Failed to get tags")
            } finally {
                setLoading(false)
            }
        }
        
        fetchTags()
    }, [])

    // Object.entries(tags) converts tags into key-value pairs { grammar: 4, poetry: 2 } into [["grammar", 4], ["poetry", 2]] so .map() can occur

    return (
        <div className="tag-page">
            <div className="tag-title">
                <h2>Tags</h2>
            </div>

            <div className="tag-cloud">
                {Object.entries(tags).map(([tag, count]) => (
                    <TagBubble
                        key={tag}
                        tag={tag}
                        count={count}
                    />
                ))}
            </div>
        </div>
    )
}

export default TagList;