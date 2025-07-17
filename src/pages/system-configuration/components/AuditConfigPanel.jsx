import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuditConfigPanel = ({ onSave, onReset }) => {
  const [auditSettings, setAuditSettings] = useState({
    auditLogging: true,
    logLevel: 'detailed',
    retentionPeriod: '365',
    complianceReporting: true,
    realTimeAlerts: true,
    userActivityTracking: true,
    systemEventLogging: true,
    dataAccessLogging: true,
    exportFormat: 'pdf',
    automaticReports: true,
    reportFrequency: 'monthly'
  });

  const [complianceStatus, setComplianceStatus] = useState({
    dgcaCompliance: 95,
    dataProtection: 88,
    auditTrail: 92,
    lastAudit: '2025-06-15T10:30:00',
    nextAudit: '2025-09-15T10:30:00'
  });

  const [isModified, setIsModified] = useState(false);

  const logLevelOptions = [
    { value: 'basic', label: 'Basic - Essential events only' },
    { value: 'detailed', label: 'Detailed - All user actions' },
    { value: 'comprehensive', label: 'Comprehensive - Full system events' }
  ];

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Format' }
  ];

  const reportFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  const auditCategories = [
    { id: 'user_actions', name: 'User Actions', enabled: true, description: 'Login, logout, role changes' },
    { id: 'data_access', name: 'Data Access', enabled: true, description: 'Question bank access, paper generation' },
    { id: 'system_changes', name: 'System Changes', enabled: true, description: 'Configuration modifications' },
    { id: 'security_events', name: 'Security Events', enabled: true, description: 'Failed logins, permission changes' },
    { id: 'compliance_events', name: 'Compliance Events', enabled: true, description: 'DGCA requirement validations' }
  ];

  const handleSettingChange = (field, value) => {
    setAuditSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
  };

  const handleSave = () => {
    const configData = {
      ...auditSettings,
      auditCategories
    };
    onSave(configData);
    setIsModified(false);
  };

  const handleReset = () => {
    setAuditSettings({
      auditLogging: true,
      logLevel: 'detailed',
      retentionPeriod: '365',
      complianceReporting: true,
      realTimeAlerts: true,
      userActivityTracking: true,
      systemEventLogging: true,
      dataAccessLogging: true,
      exportFormat: 'pdf',
      automaticReports: true,
      reportFrequency: 'monthly'
    });
    setIsModified(false);
    onReset();
  };

  const generateComplianceReport = () => {
    console.log('Generating compliance report...');
  };

  const exportAuditLogs = () => {
    console.log('Exporting audit logs...');
  };

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileSearch" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Audit Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure logging, compliance, and audit reporting</p>
          </div>
        </div>
        {isModified && (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Unsaved changes</span>
          </div>
        )}
      </div>

      {/* Compliance Status Overview */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={16} className="mr-2" />
          Compliance Status Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-2">
              <span className={`text-lg font-bold ${getComplianceColor(complianceStatus.dgcaCompliance)}`}>
                {complianceStatus.dgcaCompliance}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">DGCA Compliance</p>
            <p className="text-xs text-muted-foreground">Regulatory Standards</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-warning/10 rounded-full flex items-center justify-center mb-2">
              <span className={`text-lg font-bold ${getComplianceColor(complianceStatus.dataProtection)}`}>
                {complianceStatus.dataProtection}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">Data Protection</p>
            <p className="text-xs text-muted-foreground">Privacy Compliance</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <span className={`text-lg font-bold ${getComplianceColor(complianceStatus.auditTrail)}`}>
                {complianceStatus.auditTrail}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">Audit Trail</p>
            <p className="text-xs text-muted-foreground">Completeness Score</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Last Audit: {formatDateTime(complianceStatus.lastAudit)}</span>
            <span>Next Audit: {formatDateTime(complianceStatus.nextAudit)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logging Configuration */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Logging Configuration
          </h4>
          
          <Checkbox
            label="Enable Audit Logging"
            description="Record all system activities for compliance"
            checked={auditSettings.auditLogging}
            onChange={(e) => handleSettingChange('auditLogging', e.target.checked)}
          />

          <Select
            label="Logging Detail Level"
            description="Amount of detail captured in audit logs"
            options={logLevelOptions}
            value={auditSettings.logLevel}
            onChange={(value) => handleSettingChange('logLevel', value)}
            disabled={!auditSettings.auditLogging}
          />

          <Input
            label="Log Retention Period (Days)"
            type="number"
            description="How long to keep audit logs"
            value={auditSettings.retentionPeriod}
            onChange={(e) => handleSettingChange('retentionPeriod', e.target.value)}
            min="30"
            max="2555"
            disabled={!auditSettings.auditLogging}
          />

          <Checkbox
            label="Real-time Security Alerts"
            description="Immediate notifications for security events"
            checked={auditSettings.realTimeAlerts}
            onChange={(e) => handleSettingChange('realTimeAlerts', e.target.checked)}
          />
        </div>

        {/* Compliance Reporting */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Compliance Reporting
          </h4>

          <Checkbox
            label="Compliance Reporting"
            description="Generate regulatory compliance reports"
            checked={auditSettings.complianceReporting}
            onChange={(e) => handleSettingChange('complianceReporting', e.target.checked)}
          />

          <Checkbox
            label="Automatic Report Generation"
            description="Schedule regular compliance reports"
            checked={auditSettings.automaticReports}
            onChange={(e) => handleSettingChange('automaticReports', e.target.checked)}
            disabled={!auditSettings.complianceReporting}
          />

          <Select
            label="Report Frequency"
            description="How often to generate compliance reports"
            options={reportFrequencyOptions}
            value={auditSettings.reportFrequency}
            onChange={(value) => handleSettingChange('reportFrequency', value)}
            disabled={!auditSettings.automaticReports || !auditSettings.complianceReporting}
          />

          <Select
            label="Export Format"
            description="Default format for exported reports"
            options={exportFormatOptions}
            value={auditSettings.exportFormat}
            onChange={(value) => handleSettingChange('exportFormat', value)}
            disabled={!auditSettings.complianceReporting}
          />
        </div>
      </div>

      {/* Audit Categories */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="List" size={16} className="mr-2" />
          Audit Categories
        </h5>
        <div className="space-y-3">
          {auditCategories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-3 bg-card rounded border border-border">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={category.enabled}
                    onChange={() => {}}
                    disabled={!auditSettings.auditLogging}
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                category.enabled && auditSettings.auditLogging
                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {category.enabled && auditSettings.auditLogging ? 'Active' : 'Inactive'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Options */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Eye" size={16} className="mr-2" />
          Activity Tracking
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox
            label="User Activity Tracking"
            description="Track all user interactions"
            checked={auditSettings.userActivityTracking}
            onChange={(e) => handleSettingChange('userActivityTracking', e.target.checked)}
            disabled={!auditSettings.auditLogging}
          />

          <Checkbox
            label="System Event Logging"
            description="Log system-level events"
            checked={auditSettings.systemEventLogging}
            onChange={(e) => handleSettingChange('systemEventLogging', e.target.checked)}
            disabled={!auditSettings.auditLogging}
          />

          <Checkbox
            label="Data Access Logging"
            description="Track data access patterns"
            checked={auditSettings.dataAccessLogging}
            onChange={(e) => handleSettingChange('dataAccessLogging', e.target.checked)}
            disabled={!auditSettings.auditLogging}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Quick Actions
        </h5>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={generateComplianceReport}
            iconName="FileText"
            iconPosition="left"
          >
            Generate Compliance Report
          </Button>
          <Button
            variant="outline"
            onClick={exportAuditLogs}
            iconName="Download"
            iconPosition="left"
          >
            Export Audit Logs
          </Button>
          <Button
            variant="outline"
            iconName="Search"
            iconPosition="left"
          >
            Search Audit Trail
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!isModified}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="default"
          onClick={handleSave}
          disabled={!isModified}
          iconName="Save"
          iconPosition="left"
        >
          Save Audit Configuration
        </Button>
      </div>
    </div>
  );
};

export default AuditConfigPanel;