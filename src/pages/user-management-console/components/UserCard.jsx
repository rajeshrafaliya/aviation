import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onToggleStatus, onViewDetails }) => {
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

  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Mail" size={14} className="mr-2" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Clock" size={14} className="mr-2" />
          <span>Last login: {formatLastLogin(user.lastLogin)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="BookOpen" size={14} className="mr-2" />
          <span>{user.assignedModules.length} modules assigned</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(user)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Edit
          </Button>
        </div>
        <Button
          variant={user.status === 'Active' ? 'outline' : 'default'}
          size="sm"
          onClick={() => onToggleStatus(user)}
          iconName={user.status === 'Active' ? 'UserX' : 'UserCheck'}
          iconPosition="left"
          iconSize={14}
        >
          {user.status === 'Active' ? 'Suspend' : 'Activate'}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;