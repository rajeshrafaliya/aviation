import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ user, isOpen, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'sessions', label: 'Sessions', icon: 'Monitor' }
  ];

  const getRoleColor = (role) => {
    const colors = {
      'Training Manager': 'bg-primary text-primary-foreground',
      'Instructor': 'bg-accent text-accent-foreground',
      'Examiner': 'bg-secondary text-secondary-foreground',
      'Examination Manager': 'bg-warning text-warning-foreground'
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success text-success-foreground',
      'Inactive': 'bg-error text-error-foreground',
      'Suspended': 'bg-warning text-warning-foreground',
      'Pending': 'bg-muted text-muted-foreground'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      action: 'Question Bank Access',
      module: 'Module 1 - Mathematics',
      timestamp: '2025-07-17T07:20:00',
      details: 'Accessed question bank for review'
    },
    {
      id: 2,
      action: 'Paper Generation',
      module: 'Module 2 - Physics',
      timestamp: '2025-07-17T06:45:00',
      details: 'Generated examination paper AME-2024-M2-001'
    },
    {
      id: 3,
      action: 'Profile Update',
      module: 'System',
      timestamp: '2025-07-17T06:30:00',
      details: 'Updated contact information'
    }
  ];

  // Mock session data
  const activeSessions = [
    {
      id: 1,
      device: 'Windows Desktop',
      browser: 'Chrome 120.0',
      ipAddress: '192.168.1.45',
      location: 'Mumbai, India',
      loginTime: '2025-07-17T06:00:00',
      lastActivity: '2025-07-17T07:25:00',
      status: 'Active'
    },
    {
      id: 2,
      device: 'Android Mobile',
      browser: 'Chrome Mobile 120.0',
      ipAddress: '192.168.1.67',
      location: 'Mumbai, India',
      loginTime: '2025-07-16T14:30:00',
      lastActivity: '2025-07-16T18:45:00',
      status: 'Expired'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <p className="text-foreground font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Username</label>
                    <p className="text-foreground font-medium">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="text-foreground font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Role</label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3">Account Status</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Created</label>
                    <p className="text-foreground font-medium">{formatTimestamp(user.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Login</label>
                    <p className="text-foreground font-medium">{formatTimestamp(user.lastLogin)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Updated</label>
                    <p className="text-foreground font-medium">{formatTimestamp(user.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Assigned Modules</h4>
              <div className="flex flex-wrap gap-2">
                {user.assignedModules.map((module, index) => (
                  <span key={index} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">System Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(user.permissions || {}).map(([permission, granted]) => (
                  <div key={permission} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={granted ? 'CheckCircle' : 'XCircle'} 
                        size={16} 
                        className={granted ? 'text-success' : 'text-error'} 
                      />
                      <span className="text-sm text-foreground capitalize">
                        {permission.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <span className={`text-xs font-medium ${granted ? 'text-success' : 'text-error'}`}>
                      {granted ? 'Granted' : 'Denied'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Recent Activity</h4>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Activity" size={16} className="text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground">{activity.action}</h5>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                    <span className="text-xs text-accent">{activity.module}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sessions':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Active Sessions</h4>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Monitor" size={16} className="text-muted-foreground" />
                      <div>
                        <h5 className="font-medium text-foreground">{session.device}</h5>
                        <p className="text-sm text-muted-foreground">{session.browser}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.status === 'Active' ?'bg-success text-success-foreground' :'bg-muted text-muted-foreground'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-muted-foreground">IP Address</label>
                      <p className="text-foreground font-mono">{session.ipAddress}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Location</label>
                      <p className="text-foreground">{session.location}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Login Time</label>
                      <p className="text-foreground">{formatTimestamp(session.loginTime)}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Last Activity</label>
                      <p className="text-foreground">{formatTimestamp(session.lastActivity)}</p>
                    </div>
                  </div>
                  {session.status === 'Active' && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="LogOut"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Terminate Session
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-medium">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(user)}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit User
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;