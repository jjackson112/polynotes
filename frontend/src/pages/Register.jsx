import { useState } from "react";

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Successful register")

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        console.log("Register response", data)

        if (!res.ok) {
            console.log("Register unsuccessful", data)
        }

        } catch (err) {
            console.error("Network error:", err)
        }
    }
}