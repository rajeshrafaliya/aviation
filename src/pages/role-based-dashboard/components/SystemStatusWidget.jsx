import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusWidget = ({ systemStatus }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      online: 'text-success bg-success/10',
      maintenance: 'text-warning bg-warning/10',
      offline: 'text-error bg-error/10'
    };
    return statusColors[status] || 'text-muted-foreground bg-muted/10';
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      online: 'CheckCircle',
      maintenance: 'AlertTriangle',
      offline: 'XCircle'
    };
    return statusIcons[status] || 'HelpCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Database</span>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.database)}`}>
            <Icon name={getStatusIcon(systemStatus.database)} size={12} className="mr-1" />
            {systemStatus.database.charAt(0).toUpperCase() + systemStatus.database.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Backup System</span>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.backup)}`}>
            <Icon name={getStatusIcon(systemStatus.backup)} size={12} className="mr-1" />
            {systemStatus.backup.charAt(0).toUpperCase() + systemStatus.backup.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Question Bank</span>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.questionBank)}`}>
            <Icon name={getStatusIcon(systemStatus.questionBank)} size={12} className="mr-1" />
            {systemStatus.questionBank.charAt(0).toUpperCase() + systemStatus.questionBank.slice(1)}
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Backup</span>
            <span className="text-foreground font-medium">{systemStatus.lastBackup}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusWidget;