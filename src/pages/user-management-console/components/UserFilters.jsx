import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserFilters = ({ filters, onFilterChange, onClearFilters, onSavePreset, savedPresets, onLoadPreset }) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Training Manager', label: 'Training Manager' },
    { value: 'Instructor', label: 'Instructor' },
    { value: 'Examiner', label: 'Examiner' },
    { value: 'Examination Manager', label: 'Examination Manager' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Pending', label: 'Pending' }
  ];

  const moduleOptions = [
    { value: '', label: 'All Modules' },
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

  const presetOptions = savedPresets.map(preset => ({
    value: preset.id,
    label: preset.name
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Users
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSavePreset}
            iconName="Save"
            iconPosition="left"
            iconSize={14}
          >
            Save Preset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          label="Search Users"
          type="search"
          placeholder="Name, username, email..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />

        <Select
          label="Role"
          options={roleOptions}
          value={filters.role}
          onChange={(value) => onFilterChange('role', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Module"
          options={moduleOptions}
          value={filters.module}
          onChange={(value) => onFilterChange('module', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Created From"
          type="date"
          value={filters.createdFrom}
          onChange={(e) => onFilterChange('createdFrom', e.target.value)}
        />

        <Input
          label="Created To"
          type="date"
          value={filters.createdTo}
          onChange={(e) => onFilterChange('createdTo', e.target.value)}
        />

        <Select
          label="Load Saved Preset"
          options={[{ value: '', label: 'Select preset...' }, ...presetOptions]}
          value=""
          onChange={(value) => value && onLoadPreset(value)}
          placeholder="Choose a saved filter preset"
        />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Active filters: {Object.values(filters).filter(Boolean).length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Filtered
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Search"
            iconPosition="left"
            iconSize={14}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;