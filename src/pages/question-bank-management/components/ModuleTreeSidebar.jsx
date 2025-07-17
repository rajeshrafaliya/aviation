import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ModuleTreeSidebar = ({ selectedModule, onModuleSelect, onSubModuleSelect, selectedSubModule }) => {
  const [expandedModules, setExpandedModules] = useState(['module-1']);

  const moduleData = [
    {
      id: 'module-1',
      name: 'Module 1 - Mathematics',
      code: 'M1',
      totalQuestions: 245,
      requiredQuestions: 80,
      subModules: [
        { id: 'sub-1-1', name: 'Arithmetic & Algebra', questions: 85, required: 25 },
        { id: 'sub-1-2', name: 'Geometry & Trigonometry', questions: 92, required: 30 },
        { id: 'sub-1-3', name: 'Statistics & Probability', questions: 68, required: 25 }
      ]
    },
    {
      id: 'module-2',
      name: 'Module 2 - Physics',
      code: 'M2',
      totalQuestions: 312,
      requiredQuestions: 100,
      subModules: [
        { id: 'sub-2-1', name: 'Mechanics', questions: 95, required: 30 },
        { id: 'sub-2-2', name: 'Thermodynamics', questions: 78, required: 25 },
        { id: 'sub-2-3', name: 'Electricity & Magnetism', questions: 89, required: 30 },
        { id: 'sub-2-4', name: 'Optics & Waves', questions: 50, required: 15 }
      ]
    },
    {
      id: 'module-3',
      name: 'Module 3 - Electrical Fundamentals',
      code: 'M3',
      totalQuestions: 198,
      requiredQuestions: 65,
      subModules: [
        { id: 'sub-3-1', name: 'DC Theory', questions: 72, required: 20 },
        { id: 'sub-3-2', name: 'AC Theory', questions: 68, required: 22 },
        { id: 'sub-3-3', name: 'Semiconductor Devices', questions: 58, required: 23 }
      ]
    },
    {
      id: 'module-4',
      name: 'Module 4 - Electronic Fundamentals',
      code: 'M4',
      totalQuestions: 167,
      requiredQuestions: 55,
      subModules: [
        { id: 'sub-4-1', name: 'Analog Electronics', questions: 89, required: 28 },
        { id: 'sub-4-2', name: 'Digital Electronics', questions: 78, required: 27 }
      ]
    },
    {
      id: 'module-5',
      name: 'Module 5 - Digital Techniques',
      code: 'M5',
      totalQuestions: 134,
      requiredQuestions: 45,
      subModules: [
        { id: 'sub-5-1', name: 'Number Systems', questions: 45, required: 15 },
        { id: 'sub-5-2', name: 'Data Conversion', questions: 42, required: 15 },
        { id: 'sub-5-3', name: 'Data Bus Systems', questions: 47, required: 15 }
      ]
    }
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getCapacityStatus = (current, required) => {
    const ratio = current / (required * 3);
    if (ratio >= 1) return { status: 'optimal', color: 'text-success' };
    if (ratio >= 0.8) return { status: 'adequate', color: 'text-warning' };
    return { status: 'insufficient', color: 'text-error' };
  };

  return (
    <div className="h-full bg-card border-r border-border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-2">Module Structure</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Database" size={16} />
          <span>Question Bank Repository</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Module Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {moduleData.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            const isSelected = selectedModule === module.id;
            const capacityStatus = getCapacityStatus(module.totalQuestions, module.requiredQuestions);

            return (
              <div key={module.id} className="space-y-1">
                {/* Module Header */}
                <div
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-150 ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => {
                    toggleModule(module.id);
                    onModuleSelect(module.id);
                  }}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Icon 
                      name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                      size={16} 
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono bg-muted px-1 rounded">
                          {module.code}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          capacityStatus.status === 'optimal' ? 'bg-success' :
                          capacityStatus.status === 'adequate' ? 'bg-warning' : 'bg-error'
                        }`}></span>
                      </div>
                      <div className="text-sm font-medium truncate">{module.name}</div>
                    </div>
                  </div>
                  <div className="text-xs text-right">
                    <div className={capacityStatus.color}>{module.totalQuestions}</div>
                    <div className="text-muted-foreground">/{module.requiredQuestions * 3}</div>
                  </div>
                </div>

                {/* Sub-modules */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {module.subModules.map((subModule) => {
                      const isSubSelected = selectedSubModule === subModule.id;
                      const subCapacityStatus = getCapacityStatus(subModule.questions, subModule.required);

                      return (
                        <div
                          key={subModule.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-150 ${
                            isSubSelected 
                              ? 'bg-accent text-accent-foreground' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => onSubModuleSelect(subModule.id)}
                        >
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <Icon name="FileText" size={14} className="flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">{subModule.name}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  subCapacityStatus.status === 'optimal' ? 'bg-success' :
                                  subCapacityStatus.status === 'adequate' ? 'bg-warning' : 'bg-error'
                                }`}></span>
                                <span className="text-xs text-muted-foreground">
                                  {Math.round((subModule.questions / (subModule.required * 3)) * 100)}% capacity
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-right">
                            <div className={subCapacityStatus.color}>{subModule.questions}</div>
                            <div className="text-muted-foreground">/{subModule.required * 3}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Questions:</span>
            <span className="font-medium">1,056</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Required Capacity:</span>
            <span className="font-medium">1,035</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Overall Status:</span>
            <span className="text-success font-medium">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleTreeSidebar;