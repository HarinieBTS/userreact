import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({ users }) => {
  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      {users.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        users.map((user) => <ContactCard key={user.id} user={user} />)
      )}
    </div>
  );
};

export default ContactList;
