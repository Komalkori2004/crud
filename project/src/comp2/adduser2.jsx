import { useState, useEffect } from "react";
import './add.css'



export default function AddUser() {
    const [name, setname] = useState("")
    const [age, setage] = useState("")
    const [course, setcourse] = useState("")


  const handleSubmit = async (e) => {
  e.preventDefault();

  const UserData = { name, age, course };

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      }
    );

    const data = await res.json();
    console.log("response from server", data);

    alert("User Added Successfully ✅");

    setname("");
    setage("");
    setcourse("");

    window.location.href = "/";
  } catch (err) {
    console.log("error", err);
    alert("Something went wrong ❌");
  }
};



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
