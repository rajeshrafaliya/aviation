import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExaminationSettingsPanel = ({ onSave, onReset }) => {
  const [examSettings, setExamSettings] = useState({
    timePerQuestion: '75',
    blueprintValidation: true,
    questionRepetitionCycles: '3',
    autoSaveInterval: '30',
    paperGenerationTimeout: '300',
    maxQuestionsPerPaper: '100',
    allowPartialSave: true,
    shuffleQuestions: true,
    showQuestionNumbers: true,
    enableBookmarking: false
  });

  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  const timeOptions = [
    { value: '60', label: '60 seconds' },
    { value: '75', label: '75 seconds (DGCA Standard)' },
    { value: '90', label: '90 seconds' },
    { value: '120', label: '2 minutes' }
  ];

  const cycleOptions = [
    { value: '2', label: '2 cycles' },
    { value: '3', label: '3 cycles (Recommended)' },
    { value: '4', label: '4 cycles' },
    { value: '5', label: '5 cycles' }
  ];

  const saveIntervalOptions = [
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '120', label: '2 minutes' }
  ];

  const handleInputChange = (field, value) => {
    setExamSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateSettings = () => {
    const newErrors = {};
    
    if (parseInt(examSettings.timePerQuestion) < 30 || parseInt(examSettings.timePerQuestion) > 300) {
      newErrors.timePerQuestion = 'Time per question must be between 30 and 300 seconds';
    }
    
    if (parseInt(examSettings.maxQuestionsPerPaper) < 10 || parseInt(examSettings.maxQuestionsPerPaper) > 200) {
      newErrors.maxQuestionsPerPaper = 'Questions per paper must be between 10 and 200';
    }
    
    if (parseInt(examSettings.paperGenerationTimeout) < 60 || parseInt(examSettings.paperGenerationTimeout) > 600) {
      newErrors.paperGenerationTimeout = 'Generation timeout must be between 60 and 600 seconds';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateSettings()) {
      onSave(examSettings);
      setIsModified(false);
    }
  };

  const handleReset = () => {
    setExamSettings({
      timePerQuestion: '75',
      blueprintValidation: true,
      questionRepetitionCycles: '3',
      autoSaveInterval: '30',
      paperGenerationTimeout: '300',
      maxQuestionsPerPaper: '100',
      allowPartialSave: true,
      shuffleQuestions: true,
      showQuestionNumbers: true,
      enableBookmarking: false
    });
    setErrors({});
    setIsModified(false);
    onReset();
  };

  const calculateExamDuration = () => {
    const timePerQ = parseInt(examSettings.timePerQuestion);
    const maxQuestions = parseInt(examSettings.maxQuestionsPerPaper);
    const totalSeconds = timePerQ * maxQuestions;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Examination Settings</h3>
            <p className="text-sm text-muted-foreground">Configure paper generation and examination parameters</p>
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
        {/* Timing Configuration */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            Timing Configuration
          </h4>
          
          <Select
            label="Time Per Question"
            description="Standard time allocation per question"
            options={timeOptions}
            value={examSettings.timePerQuestion}
            onChange={(value) => handleInputChange('timePerQuestion', value)}
            error={errors.timePerQuestion}
          />

          <Select
            label="Auto-Save Interval"
            description="Frequency of automatic progress saving"
            options={saveIntervalOptions}
            value={examSettings.autoSaveInterval}
            onChange={(value) => handleInputChange('autoSaveInterval', value)}
          />

          <Input
            label="Paper Generation Timeout"
            type="number"
            description="Maximum time for paper generation (seconds)"
            value={examSettings.paperGenerationTimeout}
            onChange={(e) => handleInputChange('paperGenerationTimeout', e.target.value)}
            error={errors.paperGenerationTimeout}
            min="60"
            max="600"
          />

          <div className="p-3 bg-accent/5 rounded-lg">
            <div className="flex items-center space-x-2 text-accent">
              <Icon name="Calculator" size={16} />
              <span className="text-sm font-medium">Calculated Duration: {calculateExamDuration()}</span>
            </div>
          </div>
        </div>

        {/* Paper Configuration */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Paper Configuration
          </h4>

          <Input
            label="Maximum Questions Per Paper"
            type="number"
            description="Upper limit for questions in a single paper"
            value={examSettings.maxQuestionsPerPaper}
            onChange={(e) => handleInputChange('maxQuestionsPerPaper', e.target.value)}
            error={errors.maxQuestionsPerPaper}
            min="10"
            max="200"
          />

          <Select
            label="Question Repetition Cycles"
            description="Prevent question reuse for next N attempts"
            options={cycleOptions}
            value={examSettings.questionRepetitionCycles}
            onChange={(value) => handleInputChange('questionRepetitionCycles', value)}
          />

          <Checkbox
            label="Blueprint Validation"
            description="Enforce DGCA blueprint compliance during generation"
            checked={examSettings.blueprintValidation}
            onChange={(e) => handleInputChange('blueprintValidation', e.target.checked)}
          />

          <Checkbox
            label="Shuffle Questions"
            description="Randomize question order in generated papers"
            checked={examSettings.shuffleQuestions}
            onChange={(e) => handleInputChange('shuffleQuestions', e.target.checked)}
          />
        </div>
      </div>

      {/* Advanced Options */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Sliders" size={16} className="mr-2" />
          Advanced Options
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Allow Partial Save"
            description="Enable saving incomplete papers"
            checked={examSettings.allowPartialSave}
            onChange={(e) => handleInputChange('allowPartialSave', e.target.checked)}
          />

          <Checkbox
            label="Show Question Numbers"
            description="Display question numbering in papers"
            checked={examSettings.showQuestionNumbers}
            onChange={(e) => handleInputChange('showQuestionNumbers', e.target.checked)}
          />

          <Checkbox
            label="Enable Bookmarking"
            description="Allow candidates to bookmark questions"
            checked={examSettings.enableBookmarking}
            onChange={(e) => handleInputChange('enableBookmarking', e.target.checked)}
          />
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground">Impact Analysis</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Changes to examination settings will affect all future paper generations. 
              Existing papers and ongoing examinations will not be modified.
            </p>
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
          Save Examination Settings
        </Button>
      </div>
    </div>
  );
};

export default ExaminationSettingsPanel;