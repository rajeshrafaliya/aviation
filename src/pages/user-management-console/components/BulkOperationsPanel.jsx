import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkOperationsPanel = ({ selectedUsers, onBulkOperation, totalUsers }) => {
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operationParams, setOperationParams] = useState({});

  const operationOptions = [
    { value: '', label: 'Select bulk operation...' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'suspend', label: 'Suspend Users' },
    { value: 'resetPassword', label: 'Reset Passwords' },
    { value: 'changeRole', label: 'Change Role' },
    { value: 'assignModules', label: 'Assign Modules' },
    { value: 'removeModules', label: 'Remove Modules' },
    { value: 'export', label: 'Export User Data' },
    { value: 'delete', label: 'Delete Users' }
  ];

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

  const handleOperationChange = (operation) => {
    setSelectedOperation(operation);
    setOperationParams({});
  };

  const handleExecute = () => {
    if (!selectedOperation || selectedUsers.length === 0) return;
    
    onBulkOperation(selectedOperation, selectedUsers, operationParams);
    setSelectedOperation('');
    setOperationParams({});
  };

  const getOperationIcon = (operation) => {
    const iconMap = {
      activate: 'UserCheck',
      deactivate: 'UserX',
      suspend: 'UserMinus',
      resetPassword: 'Key',
      changeRole: 'Shield',
      assignModules: 'BookOpen',
      removeModules: 'BookX',
      export: 'Download',
      delete: 'Trash2'
    };
    return iconMap[operation] || 'Settings';
  };

  const getOperationColor = (operation) => {
    const colorMap = {
      activate: 'success',
      deactivate: 'warning',
      suspend: 'warning',
      resetPassword: 'default',
      changeRole: 'default',
      assignModules: 'default',
      removeModules: 'default',
      export: 'default',
      delete: 'destructive'
    };
    return colorMap[operation] || 'default';
  };

  const renderOperationParams = () => {
    switch (selectedOperation) {
      case 'changeRole':
        return (
          <Select
            label="New Role"
            options={roleOptions}
            value={operationParams.newRole || ''}
            onChange={(value) => setOperationParams({ ...operationParams, newRole: value })}
            className="mt-4"
          />
        );
      case 'assignModules': case'removeModules':
        return (
          <Select
            label={selectedOperation === 'assignModules' ? 'Modules to Assign' : 'Modules to Remove'}
            options={moduleOptions}
            value={operationParams.modules || []}
            onChange={(value) => setOperationParams({ ...operationParams, modules: value })}
            multiple
            searchable
            className="mt-4"
          />
        );
      default:
        return null;
    }
  };

  if (selectedUsers.length === 0) {
    return (
      <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
        <Icon name="Users" size={24} className="mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Select users to perform bulk operations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Bulk Operations</h3>
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
            {selectedUsers.length} selected
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedUsers.length} of {totalUsers} users selected
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Operation"
          options={operationOptions}
          value={selectedOperation}
          onChange={handleOperationChange}
          placeholder="Choose an operation to perform"
        />

        {renderOperationParams()}

        {selectedOperation && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon 
                name={getOperationIcon(selectedOperation)} 
                size={20} 
                className={`mt-0.5 ${
                  selectedOperation === 'delete' ? 'text-error' : 'text-foreground'
                }`} 
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {operationOptions.find(op => op.value === selectedOperation)?.label}
                </h4>
                <p className="text-sm text-muted-foreground">
                  This operation will affect {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}.
                  {selectedOperation === 'delete' && ' This action cannot be undone.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
            >
              Preview Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="History"
              iconPosition="left"
              iconSize={14}
            >
              View History
            </Button>
          </div>
          <Button
            variant={getOperationColor(selectedOperation)}
            onClick={handleExecute}
            disabled={!selectedOperation}
            iconName={getOperationIcon(selectedOperation)}
            iconPosition="left"
            iconSize={16}
          >
            Execute Operation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsPanel;