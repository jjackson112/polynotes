import { useState, useEffect } from "react";
import { api } from "../api/api";

function TagList() {
    const [tag, setTag] = useState([])

    useEffect(() => {
        api.get("/notes/tag-counts")
        .then(data => setTag(data))
        .catch(err => console.error(err))
    }, [])
}

export default TagList;