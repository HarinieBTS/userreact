import React, { useState, useEffect } from "react";

const AddUser = ({ onAddUser, editUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
    }
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      console.log("Please fill out all fields");
      return;
    }

    const userData = { id: editUser ? editUser.id : Date.now(), name, email };
    onAddUser(userData);

    console.log(editUser ? "User updated:" : "User added:", userData);

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editUser ? "Edit User" : "Add User"}</h2>
      <input type="text" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} required />
      <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">{editUser ? "Save Changes" : "Add User"}</button>
    </form>
  );
};

export default AddUser;
