import React, { useState } from "react";
import axios from "axios";
import "../assets/User.css"; // import CSS styles

function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/endpoint/users/create", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role || "student",
      });
      console.log(response.data);
      // optionally display success message or redirect to another page
    } catch (error) {
      console.log(error);
      // optionally display error message
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
          </select>
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default User;
