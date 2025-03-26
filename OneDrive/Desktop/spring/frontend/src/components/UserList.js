import React from "react";
import { useNavigate } from "react-router-dom";

const UserList = ({ users = [], onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="user-list">
      <h3>Users List:</h3>
      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button
                className="edit-btn"
                onClick={() => {
                  console.log("Edit clicked for user:", user);
                  onEdit(user.id);
                  navigate("/"); // Redirect to AddUser form
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  console.log("Delete clicked for user:", user.id);
                  onDelete(user.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
