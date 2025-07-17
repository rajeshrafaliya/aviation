import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'blueprint',
      title: 'Blueprint Updated',
      message: 'AME Module 1 blueprint has been modified by Dr. Sharma',
      timestamp: '2025-07-17T07:15:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Pending Approval',
      message: '15 questions awaiting review in Question Bank',
      timestamp: '2025-07-17T06:45:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight at 11:00 PM',
      timestamp: '2025-07-17T06:30:00',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'paper',
      title: 'Paper Generated',
      message: 'Final exam paper for Batch AME-2024-A ready for review',
      timestamp: '2025-07-17T06:00:00',
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'user',
      title: 'New User Registration',
      message: 'Instructor Priya Patel has requested access',
      timestamp: '2025-07-17T05:30:00',
      read: true,
      priority: 'medium'
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const iconMap = {
      blueprint: 'Settings',
      approval: 'Clock',
      system: 'AlertTriangle',
      paper: 'FileText',
      user: 'UserPlus'
    };
    return iconMap[type] || 'Bell';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colorMap[priority] || 'text-muted-foreground';
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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-150 focus-ring"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Icon name="Bell" size={20} className="text-muted-foreground" />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-elevated z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors duration-150 ${
                      !notification.read ? 'bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Notification Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center ${
                        getPriorityColor(notification.priority)
                      }`}>
                        <Icon name={getNotificationIcon(notification.type)} size={16} />
                      </div>

                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => clearNotification(notification.id)}
                            className="flex-shrink-0 p-1 rounded hover:bg-muted transition-colors duration-150"
                            aria-label="Clear notification"
                          >
                            <Icon name="X" size={12} className="text-muted-foreground" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-accent hover:text-accent/80 transition-colors duration-150"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Unread Indicator */}
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center text-accent hover:text-accent/80"
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;