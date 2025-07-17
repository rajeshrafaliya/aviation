import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemMaintenancePanel = ({ onSave, onReset }) => {
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    dbOptimization: true,
    optimizationSchedule: 'weekly',
    performanceMonitoring: true,
    healthCheckInterval: '60',
    diskCleanup: true,
    logRotation: true,
    logRetentionDays: '90'
  });

  const [systemHealth, setSystemHealth] = useState({
    diskUsage: 45,
    memoryUsage: 62,
    cpuUsage: 28,
    databaseSize: 2.4,
    lastBackup: '2025-07-17T02:00:00',
    lastOptimization: '2025-07-14T03:00:00'
  });

  const [isModified, setIsModified] = useState(false);
  const [isRunningMaintenance, setIsRunningMaintenance] = useState(false);

  const frequencyOptions = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const scheduleOptions = [
    { value: 'daily', label: 'Daily at 2:00 AM' },
    { value: 'weekly', label: 'Weekly on Sunday' },
    { value: 'monthly', label: 'Monthly on 1st' }
  ];

  const handleSettingChange = (field, value) => {
    setMaintenanceSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
  };

  const handleSave = () => {
    onSave(maintenanceSettings);
    setIsModified(false);
  };

  const handleReset = () => {
    setMaintenanceSettings({
      autoBackup: true,
      backupFrequency: 'daily',
      backupRetention: '30',
      dbOptimization: true,
      optimizationSchedule: 'weekly',
      performanceMonitoring: true,
      healthCheckInterval: '60',
      diskCleanup: true,
      logRotation: true,
      logRetentionDays: '90'
    });
    setIsModified(false);
    onReset();
  };

  const runManualBackup = async () => {
    setIsRunningMaintenance(true);
    // Simulate backup process
    setTimeout(() => {
      setSystemHealth(prev => ({
        ...prev,
        lastBackup: new Date().toISOString()
      }));
      setIsRunningMaintenance(false);
    }, 3000);
  };

  const runDatabaseOptimization = async () => {
    setIsRunningMaintenance(true);
    // Simulate optimization process
    setTimeout(() => {
      setSystemHealth(prev => ({
        ...prev,
        lastOptimization: new Date().toISOString(),
        databaseSize: prev.databaseSize * 0.85 // Simulate size reduction
      }));
      setIsRunningMaintenance(false);
    }, 5000);
  };

  const runSystemCleanup = async () => {
    setIsRunningMaintenance(true);
    // Simulate cleanup process
    setTimeout(() => {
      setSystemHealth(prev => ({
        ...prev,
        diskUsage: Math.max(prev.diskUsage - 10, 20)
      }));
      setIsRunningMaintenance(false);
    }, 4000);
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

  const getHealthStatus = (value, thresholds) => {
    if (value < thresholds.good) return { color: 'text-success', bg: 'bg-success/10', status: 'Good' };
    if (value < thresholds.warning) return { color: 'text-warning', bg: 'bg-warning/10', status: 'Warning' };
    return { color: 'text-error', bg: 'bg-error/10', status: 'Critical' };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Maintenance</h3>
            <p className="text-sm text-muted-foreground">Automated maintenance and performance optimization</p>
          </div>
        </div>
        {isModified && (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Unsaved changes</span>
          </div>
        )}
      </div>

      {/* System Health Overview */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={16} className="mr-2" />
          System Health Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              getHealthStatus(systemHealth.diskUsage, { good: 50, warning: 80 }).bg
            }`}>
              <span className={`text-lg font-bold ${
                getHealthStatus(systemHealth.diskUsage, { good: 50, warning: 80 }).color
              }`}>
                {systemHealth.diskUsage}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">Disk Usage</p>
            <p className={`text-xs ${getHealthStatus(systemHealth.diskUsage, { good: 50, warning: 80 }).color}`}>
              {getHealthStatus(systemHealth.diskUsage, { good: 50, warning: 80 }).status}
            </p>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              getHealthStatus(systemHealth.memoryUsage, { good: 60, warning: 85 }).bg
            }`}>
              <span className={`text-lg font-bold ${
                getHealthStatus(systemHealth.memoryUsage, { good: 60, warning: 85 }).color
              }`}>
                {systemHealth.memoryUsage}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">Memory Usage</p>
            <p className={`text-xs ${getHealthStatus(systemHealth.memoryUsage, { good: 60, warning: 85 }).color}`}>
              {getHealthStatus(systemHealth.memoryUsage, { good: 60, warning: 85 }).status}
            </p>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              getHealthStatus(systemHealth.cpuUsage, { good: 40, warning: 70 }).bg
            }`}>
              <span className={`text-lg font-bold ${
                getHealthStatus(systemHealth.cpuUsage, { good: 40, warning: 70 }).color
              }`}>
                {systemHealth.cpuUsage}%
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">CPU Usage</p>
            <p className={`text-xs ${getHealthStatus(systemHealth.cpuUsage, { good: 40, warning: 70 }).color}`}>
              {getHealthStatus(systemHealth.cpuUsage, { good: 40, warning: 70 }).status}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <span className="text-lg font-bold text-primary">{systemHealth.databaseSize}GB</span>
            </div>
            <p className="text-sm font-medium text-foreground">Database Size</p>
            <p className="text-xs text-muted-foreground">Optimized</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Configuration */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Database" size={16} className="mr-2" />
            Backup Configuration
          </h4>
          
          <Checkbox
            label="Automatic Backup"
            description="Enable scheduled system backups"
            checked={maintenanceSettings.autoBackup}
            onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
          />

          <Select
            label="Backup Frequency"
            description="How often to create system backups"
            options={frequencyOptions}
            value={maintenanceSettings.backupFrequency}
            onChange={(value) => handleSettingChange('backupFrequency', value)}
            disabled={!maintenanceSettings.autoBackup}
          />

          <Input
            label="Backup Retention (Days)"
            type="number"
            description="Number of days to keep backup files"
            value={maintenanceSettings.backupRetention}
            onChange={(e) => handleSettingChange('backupRetention', e.target.value)}
            min="1"
            max="365"
            disabled={!maintenanceSettings.autoBackup}
          />

          <div className="p-3 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Last Backup: {formatDateTime(systemHealth.lastBackup)}
            </p>
          </div>
        </div>

        {/* Performance Optimization */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Performance Optimization
          </h4>

          <Checkbox
            label="Database Optimization"
            description="Automatically optimize database performance"
            checked={maintenanceSettings.dbOptimization}
            onChange={(e) => handleSettingChange('dbOptimization', e.target.checked)}
          />

          <Select
            label="Optimization Schedule"
            description="When to run database optimization"
            options={scheduleOptions}
            value={maintenanceSettings.optimizationSchedule}
            onChange={(value) => handleSettingChange('optimizationSchedule', value)}
            disabled={!maintenanceSettings.dbOptimization}
          />

          <Checkbox
            label="Performance Monitoring"
            description="Continuously monitor system performance"
            checked={maintenanceSettings.performanceMonitoring}
            onChange={(e) => handleSettingChange('performanceMonitoring', e.target.checked)}
          />

          <Input
            label="Health Check Interval (Minutes)"
            type="number"
            description="Frequency of automated health checks"
            value={maintenanceSettings.healthCheckInterval}
            onChange={(e) => handleSettingChange('healthCheckInterval', e.target.value)}
            min="5"
            max="1440"
            disabled={!maintenanceSettings.performanceMonitoring}
          />

          <div className="p-3 bg-success/5 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Last Optimization: {formatDateTime(systemHealth.lastOptimization)}
            </p>
          </div>
        </div>
      </div>

      {/* System Cleanup */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Trash2" size={16} className="mr-2" />
          System Cleanup
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Automatic Disk Cleanup"
            description="Remove temporary files and logs"
            checked={maintenanceSettings.diskCleanup}
            onChange={(e) => handleSettingChange('diskCleanup', e.target.checked)}
          />

          <Checkbox
            label="Log Rotation"
            description="Automatically rotate and compress logs"
            checked={maintenanceSettings.logRotation}
            onChange={(e) => handleSettingChange('logRotation', e.target.checked)}
          />
        </div>
        
        <div className="mt-4">
          <Input
            label="Log Retention Period (Days)"
            type="number"
            description="How long to keep system logs"
            value={maintenanceSettings.logRetentionDays}
            onChange={(e) => handleSettingChange('logRetentionDays', e.target.value)}
            min="7"
            max="365"
            disabled={!maintenanceSettings.logRotation}
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Manual Maintenance Actions */}
      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Tool" size={16} className="mr-2" />
          Manual Maintenance Actions
        </h5>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={runManualBackup}
            disabled={isRunningMaintenance}
            loading={isRunningMaintenance}
            iconName="Database"
            iconPosition="left"
          >
            Run Backup Now
          </Button>
          <Button
            variant="outline"
            onClick={runDatabaseOptimization}
            disabled={isRunningMaintenance}
            loading={isRunningMaintenance}
            iconName="Zap"
            iconPosition="left"
          >
            Optimize Database
          </Button>
          <Button
            variant="outline"
            onClick={runSystemCleanup}
            disabled={isRunningMaintenance}
            loading={isRunningMaintenance}
            iconName="Trash2"
            iconPosition="left"
          >
            System Cleanup
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
          Save Maintenance Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemMaintenancePanel;