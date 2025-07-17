import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BlueprintEditor = ({ blueprint, onBlueprintChange, isEditing, onToggleEdit }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleCellEdit = (moduleId, subModuleId, field, currentValue) => {
    setEditingCell(`${moduleId}-${subModuleId}-${field}`);
    setTempValue(currentValue.toString());
  };

  const handleCellSave = (moduleId, subModuleId, field) => {
    const numValue = parseInt(tempValue) || 0;
    onBlueprintChange(moduleId, subModuleId, field, numValue);
    setEditingCell(null);
    setTempValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const calculateTotalQuestions = (subModule) => {
    return subModule.l1Questions + subModule.l2Questions + subModule.l3Questions;
  };

  const calculateTotalTime = (subModule) => {
    const totalQuestions = calculateTotalQuestions(subModule);
    return Math.ceil(totalQuestions * 1.25); // 75 seconds per question
  };

  const renderEditableCell = (moduleId, subModuleId, field, value) => {
    const cellKey = `${moduleId}-${subModuleId}-${field}`;
    const isCurrentlyEditing = editingCell === cellKey;

    if (isCurrentlyEditing) {
      return (
        <div className="flex items-center space-x-1">
          <Input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-16 h-8 text-center"
            min="0"
            max="999"
          />
          <Button
            variant="ghost"
            size="xs"
            onClick={() => handleCellSave(moduleId, subModuleId, field)}
            iconName="Check"
            iconSize={12}
          />
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCellCancel}
            iconName="X"
            iconSize={12}
          />
        </div>
      );
    }

    return (
      <button
        onClick={() => isEditing && handleCellEdit(moduleId, subModuleId, field, value)}
        className={`w-full h-8 flex items-center justify-center rounded ${
          isEditing 
            ? 'hover:bg-muted cursor-pointer' :'cursor-default'
        }`}
        disabled={!isEditing}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Blueprint Editor</h3>
          <Button
            variant={isEditing ? "destructive" : "default"}
            onClick={onToggleEdit}
            iconName={isEditing ? "X" : "Edit"}
            iconPosition="left"
            size="sm"
          >
            {isEditing ? 'Cancel' : 'Edit Blueprint'}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium text-foreground">Module</th>
              <th className="text-left p-3 font-medium text-foreground">Sub-Module</th>
              <th className="text-center p-3 font-medium text-foreground">L1</th>
              <th className="text-center p-3 font-medium text-foreground">L2</th>
              <th className="text-center p-3 font-medium text-foreground">L3</th>
              <th className="text-center p-3 font-medium text-foreground">Total</th>
              <th className="text-center p-3 font-medium text-foreground">Time (min)</th>
              <th className="text-center p-3 font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {blueprint.modules.map((module) => (
              <React.Fragment key={module.id}>
                {module.subModules.map((subModule, index) => (
                  <tr key={subModule.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3">
                      {index === 0 && (
                        <div className="font-medium text-foreground">
                          {module.name}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-foreground">{subModule.name}</div>
                      <div className="text-xs text-muted-foreground">{subModule.code}</div>
                    </td>
                    <td className="p-3 text-center">
                      {renderEditableCell(module.id, subModule.id, 'l1Questions', subModule.l1Questions)}
                    </td>
                    <td className="p-3 text-center">
                      {renderEditableCell(module.id, subModule.id, 'l2Questions', subModule.l2Questions)}
                    </td>
                    <td className="p-3 text-center">
                      {renderEditableCell(module.id, subModule.id, 'l3Questions', subModule.l3Questions)}
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-medium text-foreground">
                        {calculateTotalQuestions(subModule)}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-muted-foreground">
                        {calculateTotalTime(subModule)}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        calculateTotalQuestions(subModule) > 0
                          ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                      }`}>
                        {calculateTotalQuestions(subModule) > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlueprintEditor;