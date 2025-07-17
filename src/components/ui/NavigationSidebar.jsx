import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items with role-based access
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/role-based-dashboard',
      icon: 'LayoutDashboard',
      requiredRole: ['Training Manager', 'Instructor', 'Examiner', 'Examination Manager'],
      tooltip: 'Central command center for role-specific overview'
    },
    {
      id: 'question-management',
      label: 'Question Management',
      icon: 'FolderOpen',
      children: [
        {
          id: 'question-bank',
          label: 'Question Bank',
          path: '/question-bank-management',
          icon: 'Database',
          requiredRole: ['Training Manager', 'Instructor'],
          tooltip: 'Manage question repository and content'
        },
        {
          id: 'blueprint-config',
          label: 'Blueprint Configuration',
          path: '/blueprint-configuration',
          icon: 'Settings',
          requiredRole: ['Training Manager', 'Instructor'],
          tooltip: 'Configure examination blueprints and structure'
        }
      ]
    },
    {
      id: 'paper-generation',
      label: 'Paper Generation',
      path: '/question-paper-generation',
      icon: 'FileText',
      requiredRole: ['Training Manager', 'Examiner'],
      tooltip: 'Generate examination papers with security protocols'
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: 'Shield',
      children: [
        {
          id: 'user-management',
          label: 'User Management',
          path: '/user-management-console',
          icon: 'Users',
          requiredRole: ['Training Manager'],
          tooltip: 'Manage user accounts and permissions'
        },
        {
          id: 'system-config',
          label: 'System Configuration',
          path: '/system-configuration',
          icon: 'Cog',
          requiredRole: ['Training Manager'],
          tooltip: 'Configure system settings and parameters'
        }
      ]
    }
  ];

  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  const isActiveGroup = (children) => {
    return children?.some(child => location.pathname === child.path);
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = item.path ? isActiveItem(item.path) : isActiveGroup(item.children);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div key={item.id} className="mb-2">
          <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
            isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-text-secondary hover:bg-muted hover:text-foreground'
          }`}>
            <Icon name={item.icon} size={18} className="mr-3" />
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                <Icon name="ChevronDown" size={16} className={`transition-transform duration-150 ${
                  isActive ? 'rotate-180' : ''
                }`} />
              </>
            )}
          </div>
          {!isCollapsed && (
            <div className={`ml-6 mt-1 space-y-1 transition-all duration-300 ${
              isActive ? 'opacity-100 max-h-96' : 'opacity-70 max-h-96'
            }`}>
              {item.children.map(child => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 nav-item-hover group relative ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-text-secondary hover:bg-muted hover:text-foreground'
        } ${isChild ? 'ml-0' : ''}`}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Icon name={item.icon} size={18} className="mr-3 flex-shrink-0" />
        {!isCollapsed && <span className="flex-1">{item.label}</span>}
        
        {/* Tooltip for collapsed state */}
        {isCollapsed && hoveredItem === item.id && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevated whitespace-nowrap z-50 animate-fade-in">
            {item.label}
            {item.tooltip && (
              <div className="text-muted-foreground mt-1">{item.tooltip}</div>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40 sidebar-transition ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-md hover:bg-muted transition-colors duration-150 focus-ring"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map(item => renderNavItem(item))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center text-xs text-muted-foreground ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          {!isCollapsed && (
            <>
              <Icon name="Shield" size={14} className="mr-2" />
              <span>AME Examination System</span>
            </>
          )}
          {isCollapsed && <Icon name="Shield" size={16} />}
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;