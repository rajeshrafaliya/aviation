import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConfigurationTabs from './components/ConfigurationTabs';
import SecurityConfigPanel from './components/SecurityConfigPanel';
import ExaminationSettingsPanel from './components/ExaminationSettingsPanel';
import UserPoliciesPanel from './components/UserPoliciesPanel';
import SystemMaintenancePanel from './components/SystemMaintenancePanel';
import AuditConfigPanel from './components/AuditConfigPanel';

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date().toISOString());

  const handleConfigSave = (configData) => {
    console.log('Saving configuration:', configData);
    setHasUnsavedChanges(false);
    setLastSaved(new Date().toISOString());
    
    // Show success notification (in real app, this would be a toast)
    alert('Configuration saved successfully!');
  };

  const handleConfigReset = () => {
    setHasUnsavedChanges(false);
    console.log('Configuration reset to defaults');
  };

  const exportConfiguration = () => {
    const configData = {
      exportDate: new Date().toISOString(),
      systemVersion: '2.1.0',
      configurations: {
        security: 'exported',
        examination: 'exported',
        users: 'exported',
        maintenance: 'exported',
        audit: 'exported'
      }
    };
    
    // In real app, this would trigger a file download
    console.log('Exporting configuration:', configData);
    alert('Configuration exported successfully!');
  };

  const importConfiguration = () => {
    // In real app, this would open a file picker
    console.log('Importing configuration...');
    alert('Configuration import functionality would open here');
  };

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'security':
        return <SecurityConfigPanel onSave={handleConfigSave} onReset={handleConfigReset} />;
      case 'examination':
        return <ExaminationSettingsPanel onSave={handleConfigSave} onReset={handleConfigReset} />;
      case 'users':
        return <UserPoliciesPanel onSave={handleConfigSave} onReset={handleConfigReset} />;
      case 'maintenance':
        return <SystemMaintenancePanel onSave={handleConfigSave} onReset={handleConfigReset} />;
      case 'audit':
        return <AuditConfigPanel onSave={handleConfigSave} onReset={handleConfigReset} />;
      default:
        return <SecurityConfigPanel onSave={handleConfigSave} onReset={handleConfigReset} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/role-based-dashboard"
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">System Configuration</h1>
                <p className="text-sm text-muted-foreground">
                  Administrative control center for system-wide settings and policies
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 text-warning rounded-full">
                  <Icon name="AlertTriangle" size={14} />
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground">
                Last saved: {formatDateTime(lastSaved)}
              </div>

              <Button
                variant="outline"
                onClick={importConfiguration}
                iconName="Upload"
                iconPosition="left"
              >
                Import Config
              </Button>
              
              <Button
                variant="outline"
                onClick={exportConfiguration}
                iconName="Download"
                iconPosition="left"
              >
                Export Config
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ConfigurationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* System Status Banner */}
          <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">System Status: Operational</h3>
                  <p className="text-sm text-muted-foreground">
                    All systems running normally • Last health check: {formatDateTime(new Date().toISOString())}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">99.8%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">2.1.0</div>
                  <div className="text-xs text-muted-foreground">Version</div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          {renderActivePanel()}

          {/* Quick Access Links */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/user-management-console"
                className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors duration-150"
              >
                <Icon name="Users" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">User Management</div>
                  <div className="text-xs text-muted-foreground">Manage user accounts and roles</div>
                </div>
              </Link>

              <Link
                to="/blueprint-configuration"
                className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors duration-150"
              >
                <Icon name="Settings" size={20} className="text-accent" />
                <div>
                  <div className="text-sm font-medium text-foreground">Blueprint Configuration</div>
                  <div className="text-xs text-muted-foreground">Configure examination blueprints</div>
                </div>
              </Link>

              <Link
                to="/question-bank-management"
                className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors duration-150"
              >
                <Icon name="Database" size={20} className="text-secondary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Question Bank</div>
                  <div className="text-xs text-muted-foreground">Manage question repository</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Configuration History */}
          <div className="mt-6 p-4 bg-card rounded-lg border border-border">
            <h4 className="text-md font-medium text-foreground mb-3 flex items-center">
              <Icon name="History" size={16} className="mr-2" />
              Recent Configuration Changes
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={14} className="text-error" />
                  <span className="text-sm text-foreground">Security settings updated</span>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={14} className="text-accent" />
                  <span className="text-sm text-foreground">Examination parameters modified</span>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={14} className="text-secondary" />
                  <span className="text-sm text-foreground">User policies updated</span>
                </div>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;