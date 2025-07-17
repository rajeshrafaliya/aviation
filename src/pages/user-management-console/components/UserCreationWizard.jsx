import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const UserCreationWizard = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    assignedModules: [],
    permissions: {
      questionBankAccess: false,
      paperGenerationRights: false,
      administrativeCapabilities: false,
      blueprintModification: false,
      userManagement: false,
      systemConfiguration: false
    },
    temporaryPassword: '',
    requirePasswordChange: true
  });

  const roleOptions = [
    { value: 'Training Manager', label: 'Training Manager' },
    { value: 'Instructor', label: 'Instructor' },
    { value: 'Examiner', label: 'Examiner' },
    { value: 'Examination Manager', label: 'Examination Manager' }
  ];

  const moduleOptions = [
    { value: 'M1', label: 'Module 1 - Mathematics' },
    { value: 'M2', label: 'Module 2 - Physics' },
    { value: 'M3', label: 'Module 3 - Electrical Fundamentals' },
    { value: 'M4', label: 'Module 4 - Electronic Fundamentals' },
    { value: 'M5', label: 'Module 5 - Digital Techniques' },
    { value: 'M6', label: 'Module 6 - Materials & Hardware' },
    { value: 'M7A', label: 'Module 7A - Maintenance Practices' },
    { value: 'M7B', label: 'Module 7B - Maintenance Practices' },
    { value: 'M8', label: 'Module 8 - Basic Aerodynamics' },
    { value: 'M9A', label: 'Module 9A - Human Factors' },
    { value: 'M9B', label: 'Module 9B - Human Factors' },
    { value: 'M10', label: 'Module 10 - Aviation Legislation' }
  ];

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'User' },
    { id: 2, title: 'Role & Modules', icon: 'Shield' },
    { id: 3, title: 'Permissions', icon: 'Key' },
    { id: 4, title: 'Security', icon: 'Lock' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (permission, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleModuleChange = (modules) => {
    setFormData(prev => ({
      ...prev,
      assignedModules: modules
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('temporaryPassword', password);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      name: '',
      username: '',
      email: '',
      role: '',
      assignedModules: [],
      permissions: {
        questionBankAccess: false,
        paperGenerationRights: false,
        administrativeCapabilities: false,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      },
      temporaryPassword: '',
      requirePasswordChange: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create New User</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={step.icon} size={16} />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <Input
                label="Username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Select
                label="Role"
                options={roleOptions}
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Assigned Modules
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
                  {moduleOptions.map((module) => (
                    <Checkbox
                      key={module.value}
                      label={module.label}
                      checked={formData.assignedModules.includes(module.value)}
                      onChange={(e) => {
                        const modules = e.target.checked
                          ? [...formData.assignedModules, module.value]
                          : formData.assignedModules.filter(m => m !== module.value);
                        handleModuleChange(modules);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Permission Matrix</h3>
              <CheckboxGroup label="System Permissions">
                <Checkbox
                  label="Question Bank Access"
                  description="Can view and manage question banks"
                  checked={formData.permissions.questionBankAccess}
                  onChange={(e) => handlePermissionChange('questionBankAccess', e.target.checked)}
                />
                <Checkbox
                  label="Paper Generation Rights"
                  description="Can generate examination papers"
                  checked={formData.permissions.paperGenerationRights}
                  onChange={(e) => handlePermissionChange('paperGenerationRights', e.target.checked)}
                />
                <Checkbox
                  label="Administrative Capabilities"
                  description="Can perform administrative tasks"
                  checked={formData.permissions.administrativeCapabilities}
                  onChange={(e) => handlePermissionChange('administrativeCapabilities', e.target.checked)}
                />
                <Checkbox
                  label="Blueprint Modification"
                  description="Can modify examination blueprints"
                  checked={formData.permissions.blueprintModification}
                  onChange={(e) => handlePermissionChange('blueprintModification', e.target.checked)}
                />
                <Checkbox
                  label="User Management"
                  description="Can manage other users"
                  checked={formData.permissions.userManagement}
                  onChange={(e) => handlePermissionChange('userManagement', e.target.checked)}
                />
                <Checkbox
                  label="System Configuration"
                  description="Can configure system settings"
                  checked={formData.permissions.systemConfiguration}
                  onChange={(e) => handlePermissionChange('systemConfiguration', e.target.checked)}
                />
              </CheckboxGroup>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  label="Temporary Password"
                  type="text"
                  placeholder="Enter temporary password"
                  value={formData.temporaryPassword}
                  onChange={(e) => handleInputChange('temporaryPassword', e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={generatePassword}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={14}
                  className="mt-6"
                >
                  Generate
                </Button>
              </div>
              <Checkbox
                label="Require password change on first login"
                checked={formData.requirePasswordChange}
                onChange={(e) => handleInputChange('requirePasswordChange', e.target.checked)}
              />
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Security Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Password must be at least 8 characters long</li>
                  <li>• Include uppercase, lowercase, numbers, and special characters</li>
                  <li>• User will be prompted to change password on first login</li>
                  <li>• Account will be locked after 3 failed login attempts</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
          {currentStep < 4 ? (
            <Button
              variant="default"
              onClick={nextStep}
              iconName="ChevronRight"
              iconPosition="right"
              iconSize={16}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleSubmit}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Create User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCreationWizard;