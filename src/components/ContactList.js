import React from "react";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> - {contact.email} - {contact.phone} 
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
