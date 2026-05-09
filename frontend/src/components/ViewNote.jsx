// clean way to structure a growing app - not everything needs to be on the list page
// route parameters - params - placeholders in the URL
// each note has its own id, page, URL - SoC

import { Params } from "react-router-dom";

function ViewNote() {
    const { id } = useParams() // use id to fetch the note


    return (

    )
}