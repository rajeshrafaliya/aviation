import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileHeader = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock user data - in real app this would come from authentication context
  const currentUser = user || {
    name: 'Dr. Rajesh Kumar',
    role: 'Training Manager',
    institute: 'AME Training Institute',
    email: 'rajesh.kumar@ametraining.edu',
    avatar: null,
    lastLogin: '2025-07-17 07:23:00',
    sessionExpiry: '2025-07-17 15:23:00'
  };

  const roleColors = {
    'Training Manager': 'bg-primary text-primary-foreground',
    'Instructor': 'bg-accent text-accent-foreground',
    'Examiner': 'bg-secondary text-secondary-foreground',
    'Examination Manager': 'bg-warning text-warning-foreground'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
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

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-150 focus-ring"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(currentUser.name)
          )}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">
            {currentUser.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentUser.role}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-150 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-50 animate-scale-in">
          {/* User Info Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-medium">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(currentUser.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser.email}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    roleColors[currentUser.role] || 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name="Shield" size={12} className="mr-1" />
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="p-3 bg-muted/50 border-b border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Clock" size={12} className="mr-1" />
                <span>Last login: {formatTime(currentUser.lastLogin)}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Timer" size={12} className="mr-1" />
                <span>Session expires: {formatTime(currentUser.sessionExpiry)}</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-150">
              <Icon name="User" size={16} className="mr-3" />
              Profile Settings
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-150">
              <Icon name="Key" size={16} className="mr-3" />
              Change Password
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-150">
              <Icon name="Bell" size={16} className="mr-3" />
              Notification Settings
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-150">
              <Icon name="HelpCircle" size={16} className="mr-3" />
              Help & Support
            </button>
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-error hover:bg-error/10 hover:text-error"
              iconName="LogOut"
              iconPosition="left"
              iconSize={16}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileHeader;