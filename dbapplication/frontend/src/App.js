import React, { useState, useEffect } from 'react';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users'); // Correct API endpoint
      console.log('Fetched Users:', response.data); // Debug fetched users
      setUsers(response.data);
    } catch (error) {
      console.error('Error Fetching Users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the app loads
  }, []);

  return (
    <div className="App">
      <h1 className="text-center my-4">Database App</h1>
      <AddUserForm fetchUsers={fetchUsers} />
      <UserTable fetchUsers={fetchUsers} users={users} />
    </div>
  );
}

export default App;
