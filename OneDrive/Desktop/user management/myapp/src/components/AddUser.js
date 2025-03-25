import React, { useState } from "react";
import "./App.css"; // Import CSS for styling

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track user being edited

  // Add a new user
  const handleAddUser = () => {
    if (name.trim() === "" || email.trim() === "") {
      alert("Please enter both name and email.");
      return;
    }

    const newUser = { id: users.length + 1, name, email };
    setUsers([...users, newUser]);
    console.log("Added User:", newUser); // Logs only when the button is clicked

    setName("");
    setEmail("");
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    console.log(`Deleted user with ID: ${id}`);
  };

  // Start editing a user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setEditingId(id);
    }
  };

  // Save edited user
  const handleSaveUser = () => {
    setUsers(users.map((user) =>
      user.id === editingId ? { ...user, name, email } : user
    ));
    console.log(`Updated user with ID: ${editingId}`); // Log when saving edits
    setEditingId(null);
    setName("");
    setEmail("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add User</h2>
      <div className="form-box">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // No logging here
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // No logging here
        />

        {editingId ? (
          <button onClick={handleSaveUser}>Save Changes</button>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>

      {/* User List */}
      <div className="user-list">
        <h3>Users List:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button className="edit-btn" onClick={() => handleEditUser(user.id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddUser;
