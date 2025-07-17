import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const GenerationParametersPanel = ({ configuration, onParametersChange, isGenerating }) => {
  const [parameters, setParameters] = useState({
    generateDualSets: true,
    includeMasterCopy: true,
    addWatermark: true,
    preventRepetition: true,
    includeMetadata: false,
    customHeader: false,
    shuffleQuestions: true,
    shuffleOptions: true
  });

  const [calculatedDuration, setCalculatedDuration] = useState(0);
  const [estimatedQuestions, setEstimatedQuestions] = useState(0);

  useEffect(() => {
    // Calculate duration based on 75 seconds per question
    if (configuration.module) {
      const moduleQuestionCounts = {
        'M1': 16,
        'M2': 20,
        'M3': 18,
        'M4': 22,
        'M5': 15,
        'M6': 24,
        'M7A': 28,
        'M7B': 26,
        'M8': 16,
        'M9A': 14,
        'M9B': 14,
        'M10': 20,
        'M11A': 30,
        'M11B': 28,
        'M11C': 25,
        'M12': 18,
        'M13': 22,
        'M14': 26,
        'M15': 32,
        'M16': 24,
        'M17A': 20,
        'M17B': 18
      };
      
      const questionCount = moduleQuestionCounts[configuration.module] || 20;
      setEstimatedQuestions(questionCount);
      setCalculatedDuration(Math.ceil((questionCount * 75) / 60)); // Convert to minutes
    }
  }, [configuration.module]);

  const handleParameterChange = (key, value) => {
    const updatedParameters = { ...parameters, [key]: value };
    setParameters(updatedParameters);
    onParametersChange(updatedParameters);
  };

  const getGenerationComplexity = () => {
    let complexity = 'Standard';
    let complexityColor = 'text-accent';
    let complexityBg = 'bg-accent/10';
    
    if (parameters.generateDualSets && parameters.shuffleQuestions && parameters.shuffleOptions) {
      complexity = 'High';
      complexityColor = 'text-warning';
      complexityBg = 'bg-warning/10';
    }
    
    if (parameters.preventRepetition && parameters.includeMasterCopy && parameters.addWatermark) {
      complexity = 'Maximum';
      complexityColor = 'text-error';
      complexityBg = 'bg-error/10';
    }
    
    return { complexity, complexityColor, complexityBg };
  };

  const { complexity, complexityColor, complexityBg } = getGenerationComplexity();

  if (!configuration.isValid) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Settings2" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Generation Parameters</h2>
            <p className="text-sm text-muted-foreground">Configure paper generation settings</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Complete paper configuration to access generation parameters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings2" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Generation Parameters</h2>
            <p className="text-sm text-muted-foreground">Configure paper generation settings</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${complexityBg}`}>
          <Icon name="Zap" size={16} className={complexityColor} />
          <span className={`text-sm font-medium ${complexityColor}`}>
            {complexity} Complexity
          </span>
        </div>
      </div>

      {/* Duration and Question Count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Questions</p>
              <p className="text-2xl font-bold text-foreground">{estimatedQuestions}</p>
            </div>
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-foreground">{calculatedDuration}m</p>
            </div>
            <Icon name="Clock" size={24} className="text-accent" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Time/Question</p>
              <p className="text-2xl font-bold text-foreground">75s</p>
            </div>
            <Icon name="Timer" size={24} className="text-success" />
          </div>
        </div>
      </div>

      {/* Generation Options */}
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">Paper Generation Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Generate Dual Sets"
              description="Create two papers with same questions in different order"
              checked={parameters.generateDualSets}
              onChange={(e) => handleParameterChange('generateDualSets', e.target.checked)}
              disabled={isGenerating}
            />
            
            <Checkbox
              label="Include Master Copy"
              description="Generate answer key with correct answers highlighted"
              checked={parameters.includeMasterCopy}
              onChange={(e) => handleParameterChange('includeMasterCopy', e.target.checked)}
              disabled={isGenerating}
            />
            
            <Checkbox
              label="Add Watermark"
              description="Include security watermark on generated papers"
              checked={parameters.addWatermark}
              onChange={(e) => handleParameterChange('addWatermark', e.target.checked)}
              disabled={isGenerating}
            />
            
            <Checkbox
              label="Prevent Repetition"
              description="Exclude questions used in last 3 examinations"
              checked={parameters.preventRepetition}
              onChange={(e) => handleParameterChange('preventRepetition', e.target.checked)}
              disabled={isGenerating}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">Randomization Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Shuffle Questions"
              description="Randomize question order in generated papers"
              checked={parameters.shuffleQuestions}
              onChange={(e) => handleParameterChange('shuffleQuestions', e.target.checked)}
              disabled={isGenerating}
            />
            
            <Checkbox
              label="Shuffle Options"
              description="Randomize answer options within questions"
              checked={parameters.shuffleOptions}
              onChange={(e) => handleParameterChange('shuffleOptions', e.target.checked)}
              disabled={isGenerating}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">Additional Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Include Metadata"
              description="Add generation timestamp and parameters to papers"
              checked={parameters.includeMetadata}
              onChange={(e) => handleParameterChange('includeMetadata', e.target.checked)}
              disabled={isGenerating}
            />
            
            <Checkbox
              label="Custom Header"
              description="Use institute-specific header template"
              checked={parameters.customHeader}
              onChange={(e) => handleParameterChange('customHeader', e.target.checked)}
              disabled={isGenerating}
            />
          </div>
        </div>
      </div>

      {/* Generation Summary */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-3">Generation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Papers to Generate:</span>
            <span className="ml-2 font-medium text-foreground">
              {parameters.generateDualSets ? '2 Sets' : '1 Set'}
              {parameters.includeMasterCopy ? ' + Master Copy' : ''}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Security Level:</span>
            <span className="ml-2 font-medium text-foreground">
              {parameters.addWatermark && parameters.preventRepetition ? 'High' : 'Standard'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Randomization:</span>
            <span className="ml-2 font-medium text-foreground">
              {parameters.shuffleQuestions && parameters.shuffleOptions ? 'Full' : parameters.shuffleQuestions || parameters.shuffleOptions ?'Partial' : 'None'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Estimated Time:</span>
            <span className="ml-2 font-medium text-foreground">
              {Math.ceil(estimatedQuestions * (parameters.generateDualSets ? 2 : 1) / 10)} minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationParametersPanel;