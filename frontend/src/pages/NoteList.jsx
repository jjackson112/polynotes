import { useState } from "react";

const [notes, setNotes] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)