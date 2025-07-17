import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConfigurationTabs = ({ activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Authentication & access control',
      color: 'text-error'
    },
    {
      id: 'examination',
      label: 'Examination',
      icon: 'FileText',
      description: 'Paper generation settings',
      color: 'text-accent'
    },
    {
      id: 'users',
      label: 'User Policies',
      icon: 'Users',
      description: 'Role permissions & access',
      color: 'text-secondary'
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: 'Settings',
      description: 'System optimization',
      color: 'text-success'
    },
    {
      id: 'audit',
      label: 'Audit & Compliance',
      icon: 'FileSearch',
      description: 'Logging & reporting',
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`flex-shrink-0 px-6 py-4 border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-primary bg-primary/5 text-primary' :'border-transparent hover:border-muted hover:bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/10'
                  : hoveredTab === tab.id
                  ? 'bg-muted' :'bg-muted/50'
              }`}>
                <Icon 
                  name={tab.icon} 
                  size={16} 
                  className={activeTab === tab.id ? tab.color : 'text-muted-foreground'} 
                />
              </div>
              <div className="text-left">
                <div className={`text-sm font-medium ${
                  activeTab === tab.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {tab.label}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {tab.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigurationTabs;