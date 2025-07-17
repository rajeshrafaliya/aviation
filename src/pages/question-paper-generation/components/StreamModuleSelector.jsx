import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StreamModuleSelector = ({ onConfigurationChange, isGenerating }) => {
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const streamOptions = [
    { value: 'B1.1', label: 'B1.1 - Turbine Aeroplane' },
    { value: 'B1.3', label: 'B1.3 - Turbine Helicopter' },
    { value: 'B2', label: 'B2 - Avionics' }
  ];

  const moduleOptions = {
    'B1.1': [
      { value: 'M1', label: 'Module 1 - Mathematics' },
      { value: 'M2', label: 'Module 2 - Physics' },
      { value: 'M3', label: 'Module 3 - Electrical Fundamentals' },
      { value: 'M4', label: 'Module 4 - Electronic Fundamentals' },
      { value: 'M5', label: 'Module 5 - Digital Techniques' },
      { value: 'M6', label: 'Module 6 - Materials and Hardware' },
      { value: 'M7A', label: 'Module 7A - Maintenance Practices' },
      { value: 'M8', label: 'Module 8 - Basic Aerodynamics' },
      { value: 'M9A', label: 'Module 9A - Human Factors' },
      { value: 'M10', label: 'Module 10 - Aviation Legislation' },
      { value: 'M11A', label: 'Module 11A - Turbine Aeroplane Aerodynamics' },
      { value: 'M12', label: 'Module 12 - Helicopter Aerodynamics' },
      { value: 'M13', label: 'Module 13 - Aircraft Aerodynamics' },
      { value: 'M14', label: 'Module 14 - Propulsion' },
      { value: 'M15', label: 'Module 15 - Gas Turbine Engine' },
      { value: 'M16', label: 'Module 16 - Piston Engine' },
      { value: 'M17A', label: 'Module 17A - Propeller' }
    ],
    'B1.3': [
      { value: 'M1', label: 'Module 1 - Mathematics' },
      { value: 'M2', label: 'Module 2 - Physics' },
      { value: 'M3', label: 'Module 3 - Electrical Fundamentals' },
      { value: 'M4', label: 'Module 4 - Electronic Fundamentals' },
      { value: 'M6', label: 'Module 6 - Materials and Hardware' },
      { value: 'M7A', label: 'Module 7A - Maintenance Practices' },
      { value: 'M8', label: 'Module 8 - Basic Aerodynamics' },
      { value: 'M9A', label: 'Module 9A - Human Factors' },
      { value: 'M10', label: 'Module 10 - Aviation Legislation' },
      { value: 'M11B', label: 'Module 11B - Turbine Helicopter Aerodynamics' },
      { value: 'M12', label: 'Module 12 - Helicopter Aerodynamics' },
      { value: 'M14', label: 'Module 14 - Propulsion' },
      { value: 'M15', label: 'Module 15 - Gas Turbine Engine' },
      { value: 'M17B', label: 'Module 17B - Propeller' }
    ],
    'B2': [
      { value: 'M1', label: 'Module 1 - Mathematics' },
      { value: 'M2', label: 'Module 2 - Physics' },
      { value: 'M3', label: 'Module 3 - Electrical Fundamentals' },
      { value: 'M4', label: 'Module 4 - Electronic Fundamentals' },
      { value: 'M5', label: 'Module 5 - Digital Techniques' },
      { value: 'M6', label: 'Module 6 - Materials and Hardware' },
      { value: 'M7B', label: 'Module 7B - Maintenance Practices' },
      { value: 'M9B', label: 'Module 9B - Human Factors' },
      { value: 'M10', label: 'Module 10 - Aviation Legislation' },
      { value: 'M11C', label: 'Module 11C - Aeroplane Aerodynamics' },
      { value: 'M13', label: 'Module 13 - Aircraft Aerodynamics' }
    ]
  };

  const validateReferenceNumber = (value) => {
    // YYMMSMMSA format validation
    const pattern = /^[0-9]{2}[0-1][0-9][A-Z]{2}[0-9]{2}[A-Z]$/;
    if (!pattern.test(value)) {
      return "Reference number must follow YYMMSMMSA format (e.g., 2507AM01A)";
    }
    return null;
  };

  const handleStreamChange = (value) => {
    setSelectedStream(value);
    setSelectedModule('');
    setValidationErrors(prev => ({ ...prev, stream: null }));
    
    onConfigurationChange({
      stream: value,
      module: '',
      referenceNumber,
      isValid: false
    });
  };

  const handleModuleChange = (value) => {
    setSelectedModule(value);
    setValidationErrors(prev => ({ ...prev, module: null }));
    
    const isValid = selectedStream && value && referenceNumber && !validateReferenceNumber(referenceNumber);
    onConfigurationChange({
      stream: selectedStream,
      module: value,
      referenceNumber,
      isValid
    });
  };

  const handleReferenceNumberChange = (e) => {
    const value = e.target.value.toUpperCase();
    setReferenceNumber(value);
    
    const error = validateReferenceNumber(value);
    setValidationErrors(prev => ({ ...prev, referenceNumber: error }));
    
    const isValid = selectedStream && selectedModule && value && !error;
    onConfigurationChange({
      stream: selectedStream,
      module: selectedModule,
      referenceNumber: value,
      isValid
    });
  };

  const handleReset = () => {
    setSelectedStream('');
    setSelectedModule('');
    setReferenceNumber('');
    setValidationErrors({});
    
    onConfigurationChange({
      stream: '',
      module: '',
      referenceNumber: '',
      isValid: false
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Paper Configuration</h2>
            <p className="text-sm text-muted-foreground">Configure examination parameters</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={isGenerating}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stream Selection */}
        <div>
          <Select
            label="Stream Selection"
            description="Choose the AME stream category"
            placeholder="Select stream..."
            options={streamOptions}
            value={selectedStream}
            onChange={handleStreamChange}
            error={validationErrors.stream}
            required
            disabled={isGenerating}
          />
        </div>

        {/* Module Selection */}
        <div>
          <Select
            label="Module Selection"
            description="Choose the specific module"
            placeholder="Select module..."
            options={selectedStream ? moduleOptions[selectedStream] : []}
            value={selectedModule}
            onChange={handleModuleChange}
            error={validationErrors.module}
            required
            disabled={!selectedStream || isGenerating}
          />
        </div>

        {/* Reference Number */}
        <div>
          <Input
            label="Reference Number"
            description="Format: YYMMSMMSA (e.g., 2507AM01A)"
            placeholder="Enter reference number"
            value={referenceNumber}
            onChange={handleReferenceNumberChange}
            error={validationErrors.referenceNumber}
            required
            disabled={isGenerating}
            className="font-mono"
          />
        </div>
      </div>

      {/* Configuration Summary */}
      {(selectedStream || selectedModule || referenceNumber) && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-3">Configuration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Stream:</span>
              <span className="ml-2 font-medium text-foreground">
                {selectedStream || 'Not selected'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Module:</span>
              <span className="ml-2 font-medium text-foreground">
                {selectedModule || 'Not selected'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Reference:</span>
              <span className="ml-2 font-medium font-mono text-foreground">
                {referenceNumber || 'Not entered'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamModuleSelector;