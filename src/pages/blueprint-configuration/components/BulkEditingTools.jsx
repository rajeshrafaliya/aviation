import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BulkEditingTools = ({ onBulkUpdate, modules }) => {
  const [bulkOperation, setBulkOperation] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [bulkValue, setBulkValue] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const operationOptions = [
    { value: 'increase', label: 'Increase Questions' },
    { value: 'decrease', label: 'Decrease Questions' },
    { value: 'set', label: 'Set Exact Value' },
    { value: 'redistribute', label: 'Redistribute Difficulty' }
  ];

  const difficultyOptions = [
    { value: 'l1', label: 'L1 (Knowledge)' },
    { value: 'l2', label: 'L2 (Comprehension)' },
    { value: 'l3', label: 'L3 (Application)' },
    { value: 'all', label: 'All Levels' }
  ];

  const moduleOptions = modules.map(module => ({
    value: module.id,
    label: module.name
  }));

  const handleBulkUpdate = () => {
    if (!bulkOperation || selectedModules.length === 0) return;

    const updateData = {
      operation: bulkOperation,
      modules: selectedModules,
      value: parseInt(bulkValue) || 0,
      difficultyLevel: difficultyLevel
    };

    onBulkUpdate(updateData);
    
    // Reset form
    setBulkOperation('');
    setSelectedModules([]);
    setBulkValue('');
    setDifficultyLevel('');
  };

  const isFormValid = () => {
    return bulkOperation && selectedModules.length > 0 && 
           (bulkOperation === 'redistribute' || bulkValue) &&
           (bulkOperation === 'redistribute' || difficultyLevel);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Bulk Editing Tools</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Apply changes to multiple modules simultaneously
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Operation Type"
            options={operationOptions}
            value={bulkOperation}
            onChange={setBulkOperation}
            placeholder="Select operation"
          />

          <Select
            label="Target Modules"
            options={moduleOptions}
            value={selectedModules}
            onChange={setSelectedModules}
            multiple
            searchable
            placeholder="Select modules"
          />
        </div>

        {bulkOperation && bulkOperation !== 'redistribute' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Value"
              type="number"
              value={bulkValue}
              onChange={(e) => setBulkValue(e.target.value)}
              placeholder="Enter value"
              min="0"
              max="999"
            />

            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={difficultyLevel}
              onChange={setDifficultyLevel}
              placeholder="Select difficulty"
            />
          </div>
        )}

        {bulkOperation === 'redistribute' && (
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Redistribution Settings</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically redistribute questions according to DGCA standards:
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-2 bg-background rounded">
                <div className="font-medium">L1 (Knowledge)</div>
                <div className="text-muted-foreground">45%</div>
              </div>
              <div className="text-center p-2 bg-background rounded">
                <div className="font-medium">L2 (Comprehension)</div>
                <div className="text-muted-foreground">35%</div>
              </div>
              <div className="text-center p-2 bg-background rounded">
                <div className="font-medium">L3 (Application)</div>
                <div className="text-muted-foreground">20%</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedModules.length > 0 && (
              <span>{selectedModules.length} module(s) selected</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setBulkOperation('');
                setSelectedModules([]);
                setBulkValue('');
                setDifficultyLevel('');
              }}
            >
              Clear
            </Button>
            <Button
              variant="default"
              onClick={handleBulkUpdate}
              disabled={!isFormValid()}
              iconName="Zap"
              iconPosition="left"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEditingTools;