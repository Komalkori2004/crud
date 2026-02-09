import { useState, useEffect } from "react";
import './add.css'



export default function AddUser() {
    const [name, setname] = useState("")
    const [age, setage] = useState("")
    const [course, setcourse] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        const UserData = {
            name: name,
            age: age,
            course: course,
        }


        fetch("http://localhost:4000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData)

        })
            .then((res) => res.json())
            .then((data) => {
                console.log("response from server", data)
            })

            .catch((err) => {
                console.log("error", err)
            })
            .then(() => {
                setname("");
                setage("");
                setcourse("");
                alert("User Added")

                window.location.href = "/";
            });




    }



    return (<>


        <div className="add-container">
            <div className="add-card">
                <h2>Add User</h2>

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

                    <button>Add</button>
                </form>
            </div>
        </div>


    </>)


}
