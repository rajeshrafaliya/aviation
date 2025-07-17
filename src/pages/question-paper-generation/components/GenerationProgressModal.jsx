import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationProgressModal = ({ isOpen, onClose, configuration, parameters, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generationResults, setGenerationResults] = useState(null);

  const generationSteps = [
    {
      id: 'validation',
      title: 'Validating Configuration',
      description: 'Checking blueprint compliance and question availability',
      duration: 2000
    },
    {
      id: 'selection',
      title: 'Selecting Questions',
      description: 'Applying filters and selecting appropriate questions',
      duration: 3000
    },
    {
      id: 'arrangement',
      title: 'Arranging Questions',
      description: 'Organizing questions according to blueprint requirements',
      duration: 2500
    },
    {
      id: 'formatting',
      title: 'Formatting Papers',
      description: 'Applying formatting and generating paper layouts',
      duration: 2000
    },
    {
      id: 'security',
      title: 'Applying Security',
      description: 'Adding watermarks and security features',
      duration: 1500
    },
    {
      id: 'finalization',
      title: 'Finalizing Generation',
      description: 'Creating final documents and metadata',
      duration: 1000
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsCompleted(false);
      setGenerationResults(null);
      return;
    }

    const runGeneration = async () => {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i);
        
        // Simulate step progress
        const step = generationSteps[i];
        const stepDuration = step.duration;
        const progressIncrement = 100 / generationSteps.length;
        
        for (let j = 0; j <= 100; j += 5) {
          setProgress((i * progressIncrement) + (j * progressIncrement / 100));
          await new Promise(resolve => setTimeout(resolve, stepDuration / 20));
        }
      }
      
      // Generation completed
      setIsCompleted(true);
      setProgress(100);
      
      // Mock generation results
      const results = {
        papersGenerated: parameters?.generateDualSets ? 2 : 1,
        masterCopyGenerated: parameters?.includeMasterCopy || false,
        questionsUsed: 16,
        referenceNumbers: parameters?.generateDualSets 
          ? [configuration.referenceNumber, configuration.referenceNumber.replace(/A$/, 'B')]
          : [configuration.referenceNumber],
        generationTime: new Date().toLocaleString('en-IN'),
        securityFeatures: {
          watermark: parameters?.addWatermark || false,
          repetitionPrevention: parameters?.preventRepetition || false,
          questionShuffling: parameters?.shuffleQuestions || false,
          optionShuffling: parameters?.shuffleOptions || false
        }
      };
      
      setGenerationResults(results);
    };

    runGeneration();
  }, [isOpen, configuration, parameters]);

  const handleComplete = () => {
    onComplete(generationResults);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg border border-border p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Cog" size={20} className="text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {isCompleted ? 'Generation Complete' : 'Generating Question Paper'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isCompleted ? 'Papers have been successfully generated' : 'Please wait while we generate your examination paper'}
              </p>
            </div>
          </div>
          
          {!isCompleted && (
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{Math.round(progress)}%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          )}
        </div>

        {!isCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Loader2" size={16} className="text-primary animate-spin" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{generationSteps[currentStep]?.title}</h3>
                  <p className="text-sm text-muted-foreground">{generationSteps[currentStep]?.description}</p>
                </div>
              </div>
            </div>

            {/* Steps Overview */}
            <div className="space-y-2">
              {generationSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg ${
                    index < currentStep ? 'bg-success/10' :
                    index === currentStep ? 'bg-primary/10' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index < currentStep ? 'bg-success text-success-foreground' :
                    index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {index < currentStep ? (
                      <Icon name="Check" size={12} />
                    ) : index === currentStep ? (
                      <Icon name="Loader2" size={12} className="animate-spin" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Generation Results */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle2" size={32} className="text-success" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Papers Generated</p>
                      <p className="text-2xl font-bold text-foreground">{generationResults?.papersGenerated}</p>
                    </div>
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Questions Used</p>
                      <p className="text-2xl font-bold text-foreground">{generationResults?.questionsUsed}</p>
                    </div>
                    <Icon name="HelpCircle" size={24} className="text-accent" />
                  </div>
                </div>
              </div>

              {/* Reference Numbers */}
              <div className="mb-4">
                <h3 className="font-medium text-foreground mb-2">Reference Numbers:</h3>
                <div className="space-y-1">
                  {generationResults?.referenceNumbers.map((ref, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Hash" size={16} className="text-muted-foreground" />
                      <span className="font-mono text-foreground">{ref}</span>
                      <span className="text-sm text-muted-foreground">
                        (Set {String.fromCharCode(65 + index)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Features */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-2">Security Features Applied:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(generationResults?.securityFeatures || {}).map(([feature, enabled]) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Icon 
                        name={enabled ? "CheckCircle" : "XCircle"} 
                        size={16} 
                        className={enabled ? "text-success" : "text-muted-foreground"} 
                      />
                      <span className="text-sm text-foreground capitalize">
                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Generated on: {generationResults?.generationTime}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  iconName="X"
                  iconPosition="left"
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  onClick={handleComplete}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Papers
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerationProgressModal;