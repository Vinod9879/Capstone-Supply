import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Services/AuthService';
import userService from '../../Services/UserService';
import Card from '../Common/Card';
import Button from '../Common/Button';

const UserDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const profileData = await userService.getUserById(user.id);
      setProfile(profileData);
    } catch (error) {
      setMessage('Failed to load profile information.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="mt-5 text-center">
            <div className="card-body">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your profile...</p>
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
          <h1 className="h2 mb-4">Welcome, {user?.fullName || 'User'}!</h1>
        </div>
      </div>

      {message && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <Card title="Your Profile Information" className="dashboard-card">
            {profile ? (
              <div className="row">
                <div className="col-md-3 text-center mb-3">
                  <div className="user-avatar mx-auto">
                    {getInitials(profile.fullName)}
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="text-muted">Full Name</h6>
                      <p className="mb-3">{profile.fullName}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">Email</h6>
                      <p className="mb-3">{profile.email}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">Phone</h6>
                      <p className="mb-3">{profile.phone}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">Role</h6>
                      <p className="mb-3">
                        <span className="badge bg-primary">{profile.role}</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">City</h6>
                      <p className="mb-3">{profile.city}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">State</h6>
                      <p className="mb-3">{profile.state}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">Pincode</h6>
                      <p className="mb-3">{profile.pincode}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted">Member Since</h6>
                      <p className="mb-3">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted">No profile information available.</p>
                <Button variant="primary" onClick={fetchUserProfile}>
                  Refresh Profile
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="col-md-4">
          <Card title="Quick Actions" className="dashboard-card">
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={fetchUserProfile}>
                Refresh Profile
              </Button>
              <Button variant="outline-secondary" disabled>
                Edit Profile (Coming Soon)
              </Button>
              <Button variant="outline-info" disabled>
                Change Password (Coming Soon)
              </Button>
            </div>
          </Card>

          <Card title="Account Status" className="dashboard-card">
            <div className="text-center">
              <div className="user-avatar mx-auto mb-3">
                {getInitials(user?.fullName || 'U')}
              </div>
              <h5>{user?.fullName || 'User'}</h5>
              <p className="text-muted">{user?.email}</p>
              <span className="badge bg-success">Active</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
