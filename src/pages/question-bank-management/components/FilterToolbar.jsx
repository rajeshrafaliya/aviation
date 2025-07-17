import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFilterChange, activeFilters }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: '',
    status: '',
    dateRange: '',
    usageFrequency: '',
    blueprintCompliant: '',
    createdBy: '',
    searchText: ''
  });

  const difficultyOptions = [
    { value: '', label: 'All Levels' },
    { value: 'L1', label: 'Level 1 - Basic' },
    { value: 'L2', label: 'Level 2 - Application' },
    { value: 'L3', label: 'Level 3 - Analysis' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'review', label: 'Under Review' },
    { value: 'archived', label: 'Archived' },
    { value: 'draft', label: 'Draft' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const usageFrequencyOptions = [
    { value: '', label: 'Any Usage' },
    { value: 'never', label: 'Never Used' },
    { value: 'low', label: 'Low Usage (1-5)' },
    { value: 'medium', label: 'Medium Usage (6-15)' },
    { value: 'high', label: 'High Usage (16+)' }
  ];

  const blueprintOptions = [
    { value: '', label: 'All Questions' },
    { value: 'true', label: 'Blueprint Compliant' },
    { value: 'false', label: 'Non-Compliant' }
  ];

  const createdByOptions = [
    { value: '', label: 'All Authors' },
    { value: 'dr-sharma', label: 'Dr. Sharma' },
    { value: 'prof-patel', label: 'Prof. Patel' },
    { value: 'dr-kumar', label: 'Dr. Kumar' },
    { value: 'prof-singh', label: 'Prof. Singh' },
    { value: 'dr-gupta', label: 'Dr. Gupta' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      difficulty: '',
      status: '',
      dateRange: '',
      usageFrequency: '',
      blueprintCompliant: '',
      createdBy: '',
      searchText: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Main Filter Bar */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={filters.searchText}
                onChange={(e) => handleFilterChange('searchText', e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            {/* Difficulty Chips */}
            <div className="flex items-center space-x-1">
              {['L1', 'L2', 'L3'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleFilterChange('difficulty', filters.difficulty === level ? '' : level)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                    filters.difficulty === level
                      ? level === 'L1' ? 'bg-success text-success-foreground' :
                        level === 'L2' ? 'bg-warning text-warning-foreground' :
                        'bg-error text-error-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Status"
              className="w-32"
            />

            {/* Advanced Toggle */}
            <Button
              variant="outline"
              size="sm"
              iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-accent text-accent-foreground rounded-full text-xs">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="px-4 pb-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Date Range */}
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            {/* Usage Frequency */}
            <Select
              label="Usage Frequency"
              options={usageFrequencyOptions}
              value={filters.usageFrequency}
              onChange={(value) => handleFilterChange('usageFrequency', value)}
            />

            {/* Blueprint Compliance */}
            <Select
              label="Blueprint Compliance"
              options={blueprintOptions}
              value={filters.blueprintCompliant}
              onChange={(value) => handleFilterChange('blueprintCompliant', value)}
            />

            {/* Created By */}
            <Select
              label="Created By"
              options={createdByOptions}
              value={filters.createdBy}
              onChange={(value) => handleFilterChange('createdBy', value)}
            />
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="From Date"
                type="date"
                className="max-w-xs"
              />
              <Input
                label="To Date"
                type="date"
                className="max-w-xs"
              />
            </div>
          )}

          {/* Filter Summary */}
          <div className="mt-4 p-3 bg-background rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Filter" size={16} />
                <span>
                  {getActiveFilterCount() === 0 
                    ? 'No filters applied' 
                    : `${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Export Filtered
                </Button>
                <Button variant="outline" size="sm" iconName="Save" iconPosition="left">
                  Save Filter
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  
                  const getFilterLabel = (key, value) => {
                    switch (key) {
                      case 'difficulty': return `Level: ${value}`;
                      case 'status': return `Status: ${value}`;
                      case 'dateRange': return `Date: ${value}`;
                      case 'usageFrequency': return `Usage: ${value}`;
                      case 'blueprintCompliant': return `Blueprint: ${value === 'true' ? 'Compliant' : 'Non-compliant'}`;
                      case 'createdBy': return `Author: ${value}`;
                      case 'searchText': return `Search: "${value}"`;
                      default: return `${key}: ${value}`;
                    }
                  };

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-md text-xs"
                    >
                      <span>{getFilterLabel(key, value)}</span>
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="hover:text-accent/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;