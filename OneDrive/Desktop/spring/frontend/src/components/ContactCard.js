import React from "react";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
};

export default ContactCard;
