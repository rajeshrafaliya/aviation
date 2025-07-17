import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileHeader from './UserProfileHeader';
import NotificationIndicator from './NotificationIndicator';

const Header = ({ onSidebarToggle, isSidebarCollapsed }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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

  const handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 shadow-subtle">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Navigation Toggle */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/role-based-dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">
                AME Examination System
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Aviation Training Management
              </p>
            </div>
          </Link>

          {/* Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-150 focus-ring lg:hidden"
            aria-label={isSidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
          >
            <Icon name="Menu" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Center Section - System Status */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">System Online</span>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {formatDateTime(currentTime)}
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/question-paper-generation"
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-150 focus-ring"
              title="Quick Paper Generation"
            >
              <Icon name="FileText" size={20} className="text-muted-foreground" />
            </Link>
            <Link
              to="/question-bank-management"
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-150 focus-ring"
              title="Question Bank"
            >
              <Icon name="Database" size={20} className="text-muted-foreground" />
            </Link>
          </div>

          {/* Notifications */}
          <NotificationIndicator />

          {/* User Profile */}
          <UserProfileHeader onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;