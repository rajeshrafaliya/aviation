import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, userRole }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const iconMap = {
      approval: 'Clock',
      deadline: 'AlertTriangle',
      system: 'Settings',
      blueprint: 'FileText',
      user: 'UserPlus',
      exam: 'Calendar',
      backup: 'Database'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (priority) => {
    const colorMap = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-muted-foreground bg-muted/10 border-border'
    };
    return colorMap[priority] || 'text-muted-foreground bg-muted/10 border-border';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime.toLocaleDateString('en-IN');
  };

  const getRoleSpecificNotifications = () => {
    return notifications.filter(notification => {
      switch (userRole) {
        case 'Training Manager':
          return true; // See all notifications
        case 'Instructor':
          return ['approval', 'blueprint', 'system'].includes(notification.type);
        case 'Examiner':
          return ['deadline', 'blueprint', 'exam'].includes(notification.type);
        case 'Examination Manager':
          return ['exam', 'system', 'backup'].includes(notification.type);
        default:
          return false;
      }
    });
  };

  const getFilteredNotifications = () => {
    const roleNotifications = getRoleSpecificNotifications();
    if (filter === 'all') return roleNotifications;
    return roleNotifications.filter(notification => notification.priority === filter);
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'All', count: getRoleSpecificNotifications().length },
    { value: 'high', label: 'High', count: getRoleSpecificNotifications().filter(n => n.priority === 'high').length },
    { value: 'medium', label: 'Medium', count: getRoleSpecificNotifications().filter(n => n.priority === 'medium').length },
    { value: 'low', label: 'Low', count: getRoleSpecificNotifications().filter(n => n.priority === 'low').length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Icon name="Bell" size={20} className="text-muted-foreground" />
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-150 ${
              filter === option.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option.label}
            {option.count > 0 && (
              <span className="ml-1 text-xs">({option.count})</span>
            )}
          </button>
        ))}
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 transition-all duration-150 hover:shadow-subtle ${
                getNotificationColor(notification.priority)
              } ${!notification.read ? 'border-l-4' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={getNotificationIcon(notification.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${
                    !notification.read ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    {notification.actionRequired && (
                      <Button variant="outline" size="xs">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {filteredNotifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;