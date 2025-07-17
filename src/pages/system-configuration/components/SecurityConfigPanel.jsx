import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityConfigPanel = ({ onSave, onReset }) => {
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    maxLoginAttempts: '3',
    passwordMinLength: '8',
    passwordComplexity: 'medium',
    twoFactorAuth: true,
    ipWhitelisting: false,
    auditLogging: true,
    encryptionLevel: 'aes256'
  });

  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  const timeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' }
  ];

  const complexityOptions = [
    { value: 'low', label: 'Low (Letters only)' },
    { value: 'medium', label: 'Medium (Letters + Numbers)' },
    { value: 'high', label: 'High (Letters + Numbers + Symbols)' }
  ];

  const encryptionOptions = [
    { value: 'aes128', label: 'AES-128' },
    { value: 'aes256', label: 'AES-256' },
    { value: 'rsa2048', label: 'RSA-2048' }
  ];

  const handleInputChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateSettings = () => {
    const newErrors = {};
    
    if (parseInt(securitySettings.sessionTimeout) < 5) {
      newErrors.sessionTimeout = 'Session timeout must be at least 5 minutes';
    }
    
    if (parseInt(securitySettings.maxLoginAttempts) < 1 || parseInt(securitySettings.maxLoginAttempts) > 10) {
      newErrors.maxLoginAttempts = 'Login attempts must be between 1 and 10';
    }
    
    if (parseInt(securitySettings.passwordMinLength) < 6 || parseInt(securitySettings.passwordMinLength) > 20) {
      newErrors.passwordMinLength = 'Password length must be between 6 and 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateSettings()) {
      onSave(securitySettings);
      setIsModified(false);
    }
  };

  const handleReset = () => {
    setSecuritySettings({
      sessionTimeout: '30',
      maxLoginAttempts: '3',
      passwordMinLength: '8',
      passwordComplexity: 'medium',
      twoFactorAuth: true,
      ipWhitelisting: false,
      auditLogging: true,
      encryptionLevel: 'aes256'
    });
    setErrors({});
    setIsModified(false);
    onReset();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Configuration</h3>
            <p className="text-sm text-muted-foreground">Manage authentication and access control settings</p>
          </div>
        </div>
        {isModified && (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Unsaved changes</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication Settings */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Key" size={16} className="mr-2" />
            Authentication Settings
          </h4>
          
          <Select
            label="Session Timeout"
            description="Automatic logout after inactivity"
            options={timeoutOptions}
            value={securitySettings.sessionTimeout}
            onChange={(value) => handleInputChange('sessionTimeout', value)}
            error={errors.sessionTimeout}
          />

          <Input
            label="Maximum Login Attempts"
            type="number"
            description="Account lockout after failed attempts"
            value={securitySettings.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
            error={errors.maxLoginAttempts}
            min="1"
            max="10"
          />

          <Input
            label="Minimum Password Length"
            type="number"
            description="Required password character count"
            value={securitySettings.passwordMinLength}
            onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
            error={errors.passwordMinLength}
            min="6"
            max="20"
          />

          <Select
            label="Password Complexity"
            description="Required password strength level"
            options={complexityOptions}
            value={securitySettings.passwordComplexity}
            onChange={(value) => handleInputChange('passwordComplexity', value)}
          />
        </div>

        {/* Security Features */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Lock" size={16} className="mr-2" />
            Security Features
          </h4>

          <Checkbox
            label="Two-Factor Authentication"
            description="Require additional verification for login"
            checked={securitySettings.twoFactorAuth}
            onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
          />

          <Checkbox
            label="IP Address Whitelisting"
            description="Restrict access to approved IP addresses"
            checked={securitySettings.ipWhitelisting}
            onChange={(e) => handleInputChange('ipWhitelisting', e.target.checked)}
          />

          <Checkbox
            label="Comprehensive Audit Logging"
            description="Log all user actions and system events"
            checked={securitySettings.auditLogging}
            onChange={(e) => handleInputChange('auditLogging', e.target.checked)}
          />

          <Select
            label="Data Encryption Level"
            description="Encryption standard for sensitive data"
            options={encryptionOptions}
            value={securitySettings.encryptionLevel}
            onChange={(value) => handleInputChange('encryptionLevel', value)}
          />
        </div>
      </div>

      {/* Security Status Indicators */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3">Current Security Status</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Encryption Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Firewall Enabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">Updates Pending</span>
          </div>
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
          Save Security Settings
        </Button>
      </div>
    </div>
  );
};

export default SecurityConfigPanel;