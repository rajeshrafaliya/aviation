import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardHeader = ({ user, currentTime }) => {
  const getRoleColor = (role) => {
    const roleColors = {
      'Training Manager': 'bg-primary text-primary-foreground',
      'Instructor': 'bg-accent text-accent-foreground',
      'Examiner': 'bg-secondary text-secondary-foreground',
      'Examination Manager': 'bg-warning text-warning-foreground'
    };
    return roleColors[role] || 'bg-muted text-muted-foreground';
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user.name}
            </h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                <Icon name="Shield" size={14} className="mr-2" />
                {user.role}
              </span>
              <span className="text-sm text-muted-foreground">
                {user.institute}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Current Time</div>
          <div className="text-lg font-semibold text-foreground font-mono">
            {formatDateTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;