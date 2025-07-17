import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserPoliciesPanel = ({ onSave, onReset }) => {
  const [userPolicies, setUserPolicies] = useState({
    defaultRole: 'instructor',
    autoApproval: false,
    moduleAccessControl: true,
    bulkOperations: false,
    crossModuleAccess: false,
    temporaryAccess: true,
    accessRequestApproval: 'manager',
    roleChangeApproval: 'admin',
    accountDeactivation: 'admin'
  });

  const [selectedRoles, setSelectedRoles] = useState(['instructor', 'examiner']);
  const [isModified, setIsModified] = useState(false);

  const roleOptions = [
    { value: 'instructor', label: 'Instructor' },
    { value: 'examiner', label: 'Examiner' },
    { value: 'training_manager', label: 'Training Manager' },
    { value: 'examination_manager', label: 'Examination Manager' }
  ];

  const approvalOptions = [
    { value: 'auto', label: 'Automatic' },
    { value: 'manager', label: 'Training Manager' },
    { value: 'admin', label: 'System Administrator' }
  ];

  const modulePermissions = [
    { id: 'b1_1', name: 'B1.1 - Turbine Aeroplane', enabled: true },
    { id: 'b1_3', name: 'B1.3 - Helicopter', enabled: true },
    { id: 'b2', name: 'B2 - Avionics', enabled: false },
    { id: 'general', name: 'General Knowledge', enabled: true }
  ];

  const handlePolicyChange = (field, value) => {
    setUserPolicies(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
  };

  const handleRoleSelection = (roleValue) => {
    setSelectedRoles(prev => {
      const newRoles = prev.includes(roleValue)
        ? prev.filter(r => r !== roleValue)
        : [...prev, roleValue];
      setIsModified(true);
      return newRoles;
    });
  };

  const handleSave = () => {
    const configData = {
      ...userPolicies,
      enabledRoles: selectedRoles,
      modulePermissions
    };
    onSave(configData);
    setIsModified(false);
  };

  const handleReset = () => {
    setUserPolicies({
      defaultRole: 'instructor',
      autoApproval: false,
      moduleAccessControl: true,
      bulkOperations: false,
      crossModuleAccess: false,
      temporaryAccess: true,
      accessRequestApproval: 'manager',
      roleChangeApproval: 'admin',
      accountDeactivation: 'admin'
    });
    setSelectedRoles(['instructor', 'examiner']);
    setIsModified(false);
    onReset();
  };

  const applyBulkPolicy = (policyType) => {
    // Simulate bulk policy application
    console.log(`Applying bulk policy: ${policyType}`);
    setIsModified(true);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">User Management Policies</h3>
            <p className="text-sm text-muted-foreground">Configure role permissions and access controls</p>
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
        {/* Role Configuration */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="UserCheck" size={16} className="mr-2" />
            Role Configuration
          </h4>
          
          <Select
            label="Default Role for New Users"
            description="Automatically assigned role for new registrations"
            options={roleOptions}
            value={userPolicies.defaultRole}
            onChange={(value) => handlePolicyChange('defaultRole', value)}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Enabled Roles</label>
            <p className="text-xs text-muted-foreground">Select which roles can be assigned to users</p>
            <div className="space-y-2">
              {roleOptions.map(role => (
                <Checkbox
                  key={role.value}
                  label={role.label}
                  checked={selectedRoles.includes(role.value)}
                  onChange={() => handleRoleSelection(role.value)}
                />
              ))}
            </div>
          </div>

          <Select
            label="Access Request Approval"
            description="Who can approve new access requests"
            options={approvalOptions}
            value={userPolicies.accessRequestApproval}
            onChange={(value) => handlePolicyChange('accessRequestApproval', value)}
          />
        </div>

        {/* Access Control */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Lock" size={16} className="mr-2" />
            Access Control
          </h4>

          <Checkbox
            label="Automatic User Approval"
            description="Auto-approve new user registrations"
            checked={userPolicies.autoApproval}
            onChange={(e) => handlePolicyChange('autoApproval', e.target.checked)}
          />

          <Checkbox
            label="Module Access Control"
            description="Restrict access based on assigned modules"
            checked={userPolicies.moduleAccessControl}
            onChange={(e) => handlePolicyChange('moduleAccessControl', e.target.checked)}
          />

          <Checkbox
            label="Cross-Module Access"
            description="Allow users to access multiple modules"
            checked={userPolicies.crossModuleAccess}
            onChange={(e) => handlePolicyChange('crossModuleAccess', e.target.checked)}
          />

          <Checkbox
            label="Temporary Access Grants"
            description="Enable time-limited access permissions"
            checked={userPolicies.temporaryAccess}
            onChange={(e) => handlePolicyChange('temporaryAccess', e.target.checked)}
          />

          <Select
            label="Role Change Approval"
            description="Required approval level for role modifications"
            options={approvalOptions}
            value={userPolicies.roleChangeApproval}
            onChange={(value) => handlePolicyChange('roleChangeApproval', value)}
          />
        </div>
      </div>

      {/* Module Permissions */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Layers" size={16} className="mr-2" />
          Module Permissions
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modulePermissions.map(module => (
            <div key={module.id} className="flex items-center justify-between p-3 bg-card rounded border border-border">
              <div>
                <span className="text-sm font-medium text-foreground">{module.name}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.enabled 
                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {module.enabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Operations */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Bulk Policy Operations
        </h5>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyBulkPolicy('restrictive')}
            iconName="Shield"
            iconPosition="left"
          >
            Apply Restrictive Policy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyBulkPolicy('standard')}
            iconName="Users"
            iconPosition="left"
          >
            Apply Standard Policy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyBulkPolicy('permissive')}
            iconName="Unlock"
            iconPosition="left"
          >
            Apply Permissive Policy
          </Button>
        </div>
      </div>

      {/* Current Policy Summary */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3">Current Policy Summary</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active Roles:</span>
            <span className="ml-2 font-medium text-foreground">{selectedRoles.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Auto Approval:</span>
            <span className={`ml-2 font-medium ${userPolicies.autoApproval ? 'text-success' : 'text-error'}`}>
              {userPolicies.autoApproval ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Module Control:</span>
            <span className={`ml-2 font-medium ${userPolicies.moduleAccessControl ? 'text-success' : 'text-error'}`}>
              {userPolicies.moduleAccessControl ? 'Active' : 'Inactive'}
            </span>
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
          Save User Policies
        </Button>
      </div>
    </div>
  );
};

export default UserPoliciesPanel;