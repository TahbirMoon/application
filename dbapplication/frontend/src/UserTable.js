import React from 'react';
import axios from 'axios';

const UserTable = ({ fetchUsers, users }) => {
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete-user/${id}`); // Correct API endpoint
      console.log('Delete Response:', response.data); // Debug delete response
      alert('User deleted successfully!');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error Deleting User:', error.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">User List</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
