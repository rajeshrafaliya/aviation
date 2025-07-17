import React from 'react';
import Icon from '../../../components/AppIcon';

const BlueprintCompliancePanel = ({ selectedModule, selectedStream }) => {
  // Mock blueprint data based on DGCA requirements
  const getBlueprintData = (stream, module) => {
    if (!stream || !module) return null;

    // Mock blueprint requirements for different modules
    const blueprintData = {
      'B1.1': {
        'M1': {
          totalQuestions: 16,
          duration: 20, // minutes
          subModules: [
            { id: 'M1.1', name: 'Arithmetic', required: 4, available: 12, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.2', name: 'Algebra', required: 4, available: 15, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.3', name: 'Geometry', required: 4, available: 8, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.4', name: 'Trigonometry', required: 4, available: 18, difficulty: { L1: 2, L2: 1, L3: 1 } }
          ]
        },
        'M2': {
          totalQuestions: 20,
          duration: 25,
          subModules: [
            { id: 'M2.1', name: 'Matter', required: 4, available: 14, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M2.2', name: 'Mechanics', required: 6, available: 22, difficulty: { L1: 3, L2: 2, L3: 1 } },
            { id: 'M2.3', name: 'Thermodynamics', required: 5, available: 16, difficulty: { L1: 2, L2: 2, L3: 1 } },
            { id: 'M2.4', name: 'Light and Sound', required: 3, available: 11, difficulty: { L1: 2, L2: 1, L3: 0 } },
            { id: 'M2.5', name: 'Wave Motion', required: 2, available: 9, difficulty: { L1: 1, L2: 1, L3: 0 } }
          ]
        }
      },
      'B1.3': {
        'M1': {
          totalQuestions: 16,
          duration: 20,
          subModules: [
            { id: 'M1.1', name: 'Arithmetic', required: 4, available: 10, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.2', name: 'Algebra', required: 4, available: 13, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.3', name: 'Geometry', required: 4, available: 7, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.4', name: 'Trigonometry', required: 4, available: 16, difficulty: { L1: 2, L2: 1, L3: 1 } }
          ]
        }
      },
      'B2': {
        'M1': {
          totalQuestions: 16,
          duration: 20,
          subModules: [
            { id: 'M1.1', name: 'Arithmetic', required: 4, available: 15, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.2', name: 'Algebra', required: 4, available: 18, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.3', name: 'Geometry', required: 4, available: 12, difficulty: { L1: 2, L2: 1, L3: 1 } },
            { id: 'M1.4', name: 'Trigonometry', required: 4, available: 20, difficulty: { L1: 2, L2: 1, L3: 1 } }
          ]
        }
      }
    };

    return blueprintData[stream]?.[module] || null;
  };

  const blueprintData = getBlueprintData(selectedStream, selectedModule);

  const getComplianceStatus = (required, available) => {
    const ratio = available / required;
    if (ratio >= 3) return { status: 'excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (ratio >= 2) return { status: 'good', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (ratio >= 1) return { status: 'minimum', color: 'text-error', bgColor: 'bg-error/10' };
    return { status: 'insufficient', color: 'text-error', bgColor: 'bg-error/20' };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle2';
      case 'good': return 'AlertCircle';
      case 'minimum': return 'AlertTriangle';
      case 'insufficient': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  if (!blueprintData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Blueprint Compliance</h2>
            <p className="text-sm text-muted-foreground">DGCA blueprint requirements</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Select stream and module to view blueprint compliance</p>
        </div>
      </div>
    );
  }

  const totalAvailable = blueprintData.subModules.reduce((sum, sub) => sum + sub.available, 0);
  const totalRequired = blueprintData.subModules.reduce((sum, sub) => sum + sub.required, 0);
  const overallCompliance = getComplianceStatus(totalRequired, totalAvailable);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Blueprint Compliance</h2>
            <p className="text-sm text-muted-foreground">DGCA blueprint requirements for {selectedStream} - {selectedModule}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${overallCompliance.bgColor}`}>
          <Icon name={getStatusIcon(overallCompliance.status)} size={16} className={overallCompliance.color} />
          <span className={`text-sm font-medium ${overallCompliance.color}`}>
            {overallCompliance.status.charAt(0).toUpperCase() + overallCompliance.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
              <p className="text-2xl font-bold text-foreground">{blueprintData.totalQuestions}</p>
            </div>
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-foreground">{blueprintData.duration}m</p>
            </div>
            <Icon name="Clock" size={24} className="text-accent" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-success">{totalAvailable}</p>
            </div>
            <Icon name="Database" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Coverage</p>
              <p className="text-2xl font-bold text-foreground">{Math.round((totalAvailable / totalRequired) * 100) / 100}x</p>
            </div>
            <Icon name="Target" size={24} className="text-warning" />
          </div>
        </div>
      </div>

      {/* Sub-module Breakdown */}
      <div>
        <h3 className="text-md font-semibold text-foreground mb-4">Sub-module Analysis</h3>
        <div className="space-y-3">
          {blueprintData.subModules.map((subModule) => {
            const compliance = getComplianceStatus(subModule.required, subModule.available);
            const coverageRatio = (subModule.available / subModule.required).toFixed(1);
            
            return (
              <div key={subModule.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${compliance.bgColor}`}>
                      <Icon name={getStatusIcon(compliance.status)} size={16} className={compliance.color} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{subModule.name}</h4>
                      <p className="text-sm text-muted-foreground">{subModule.id}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{subModule.available}/{subModule.required}</p>
                    <p className="text-xs text-muted-foreground">{coverageRatio}x coverage</p>
                  </div>
                </div>
                
                {/* Difficulty Distribution */}
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-muted-foreground">L1: {subModule.difficulty.L1}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-muted-foreground">L2: {subModule.difficulty.L2}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-error rounded-full"></div>
                    <span className="text-muted-foreground">L3: {subModule.difficulty.L3}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        compliance.status === 'excellent' ? 'bg-success' :
                        compliance.status === 'good' ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${Math.min((subModule.available / (subModule.required * 3)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Minimum: {subModule.required}</span>
                    <span>Optimal: {subModule.required * 3}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlueprintCompliancePanel;