import { useState, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import './edit.css'

export default function Update() {

    const [name, setname] = useState("")
    const [age, setage] = useState("")
    const [course, setcourse] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:4000/update/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setname(data.name)
                setage(data.age)
                setcourse(data.course)

            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                age: age,
                course: course
            })

        })
            .then(() => {
                alert("user update!")
                navigate("/")
            })
            .catch((err) => {
                console.log("error", err)
            })


    }

    return (<>

        <div className="update-container">
            <div className="update-card">
                <h1>Edit User</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setcourse(e.target.value)}
                    />

                    <button>Update</button>
                </form>
            </div>
        </div>






    </>)


}