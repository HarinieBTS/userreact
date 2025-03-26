import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import AddUser from "./AddUser";
import UserList from "./UserList";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("authToken"));
    if (tokenData && tokenData.expiry > Date.now()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
    }
  }, []);

  const handleAddUser = (newUser) => {
    if (editUser) {
      setUsers(users.map(user => user.id === editUser.id ? newUser : user));
      setEditUser(null);
    } else {
      setUsers([...users, { id: uuidv4(), ...newUser }]);
    }
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditUser(userToEdit);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { id: uuidv4(), ...newContact }]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <div className="nav-links">
            <Link to="/">User Management</Link>
            <Link to="/contacts">Contact Management</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <div className="page-container">
                  <h1>User Management</h1>
                  <div className="management-container">
                    <div className="form-section">
                      <AddUser onAddUser={handleAddUser} editUser={editUser} />
                    </div>
                    <div className="list-section">
                      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                    </div>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/contacts"
            element={
              isAuthenticated ? (
                <div className="page-container">
                  <h1>Contact Management</h1>
                  <div className="management-container">
                    <div className="form-section">
                      <AddContact onAdd={handleAddContact} />
                    </div>
                    <div className="list-section">
                      <ContactList contacts={contacts} onDelete={handleDeleteContact} />
                    </div>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
