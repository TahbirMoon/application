import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    if (!name || !email || !age) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      console.log('Submitting:', { name, email, age }); // Debug submitted values
      const response = await axios.post('http://localhost:3000/add-user', { // Correct API endpoint
        name,
        email,
        age,
      });
      console.log('Server Response:', response.data); // Debug server response
      alert('User added successfully!');
      fetchUsers(); // Refresh the user list dynamically
      setName(''); // Clear form fields
      setEmail('');
      setAge('');
    } catch (error) {
      console.error('Error Adding User:', error.response ? error.response.data : error.message);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container my-4">
      <h2 className="mb-3">Add User</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age:</label>
        <input
          type="number"
          id="age"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Add User</button>
    </form>
  );
};

export default AddUserForm;
