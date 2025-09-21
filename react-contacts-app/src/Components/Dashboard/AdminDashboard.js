import React, { useState, useEffect } from 'react';
import userService from '../../Services/UserService';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Navigation from '../Layout/Navigation';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(''); // 🔹 Added search state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      setMessage('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setMessage('User deleted successfully.');
        fetchUsers(); // Refresh the list
      } catch (error) {
        setMessage('Failed to delete user. Please try again.');
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    // For now, just show an alert
    alert(`Edit functionality for ${user.fullName} will be implemented soon.`);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🔹 Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="mt-5 text-center">
            <div className="card-body">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading users...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Admin Dashboard</h1>
            <Button variant="primary" onClick={fetchUsers}>
              Refresh Users
            </Button>
          </div>
        </div>
      </div>

      {/* 🔹 Search bar */}
      <div className="row mb-3">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {message && (
        <div className="row">
          <div className="col-12">
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-warning'}`} role="alert">
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <Card title={`All Users (${filteredUsers.length})`} className="dashboard-card">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">No users found.</p>
                <Button variant="primary" onClick={fetchUsers}>
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="row">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="col-md-6 col-lg-4 mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="user-avatar me-3">
                            {getInitials(user.fullName)}
                          </div>
                          <div>
                            <h6 className="card-title mb-1">{user.fullName}</h6>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">Phone</small>
                              <p className="mb-1">{user.phone}</p>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Role</small>
                              <p className="mb-1">
                                <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                                  {user.role}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">City</small>
                              <p className="mb-1">{user.city}</p>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">State</small>
                              <p className="mb-1">{user.state}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">Pincode</small>
                              <p className="mb-1">{user.pincode}</p>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Joined</small>
                              <p className="mb-1">{formatDate(user.createdAt)}</p>
                            </div>
                          </div>
                        </div>

                        <Navigation
                          onEdit={() => handleEditUser(user)}
                          onView={() => handleViewUser(user)}
                          onDelete={() => handleDeleteUser(user.id)}
                        />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <div className="user-avatar mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                      {getInitials(selectedUser.fullName)}
                    </div>
                    <h5>{selectedUser.fullName}</h5>
                    <span className={`badge ${selectedUser.role === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-sm-6">
                        <h6 className="text-muted">Email</h6>
                        <p>{selectedUser.email}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="text-muted">Phone</h6>
                        <p>{selectedUser.phone}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="text-muted">City</h6>
                        <p>{selectedUser.city}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="text-muted">State</h6>
                        <p>{selectedUser.state}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="text-muted">Pincode</h6>
                        <p>{selectedUser.pincode}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="text-muted">Member Since</h6>
                        <p>{formatDate(selectedUser.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="warning" onClick={() => handleEditUser(selectedUser)}>
                  Edit User
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(selectedUser.id)}>
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
