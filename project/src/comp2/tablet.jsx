import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./tab.css";

export default function Table() {
  console.log(import.meta.env.VITE_API_URL);
  const [user, setuser] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setuser(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleSubmit = (id) => {
    alert("are you sure you want delete this ");
    fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("user deleted");
        setuser(user.filter((u) => u._id !== id));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div className="admin-container">
        <h2>Admin Page</h2>

        <NavLink to="/add">
          <button className="add-btn">Add User</button>
        </NavLink>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {user.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.age}</td>
                  <td>{u.course}</td>
                  <td>
                    <NavLink to={`/update/${u._id}`}>
                      <button className="action-btn edit-btn">Edit</button>
                    </NavLink>

                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleSubmit(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
