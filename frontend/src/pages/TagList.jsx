import { useState, useEffect } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { Hash } from "react-feather";


// envision a tag cloud - how does frontend know how big the tag cloud gets for each tag?
// new Flask route? - keep count of how many notes belong to each tag

const tagSize = (count) => {
    if (count >= 10) return "tag-bubble-xl"
    if (count >= 5) return "tag-bubble-lg"
    if (count >= 2) return "tag-bubble-md"
    return "tag-bubble-sm"
}

return (
    <Link to={`/notes?tag=${tag}`} className={`tag-bubble ${getTagSize(count)}`}>
        <span><Hash/></span>
        <p>{count}</p>
    </Link>
)