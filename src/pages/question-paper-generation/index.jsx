import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StreamModuleSelector from './components/StreamModuleSelector';
import BlueprintCompliancePanel from './components/BlueprintCompliancePanel';
import GenerationParametersPanel from './components/GenerationParametersPanel';
import QuestionRepetitionTracker from './components/QuestionRepetitionTracker';
import PaperPreviewPanel from './components/PaperPreviewPanel';
import GenerationProgressModal from './components/GenerationProgressModal';

const QuestionPaperGeneration = () => {
  const [configuration, setConfiguration] = useState({
    stream: '',
    module: '',
    referenceNumber: '',
    isValid: false
  });
  
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const handleConfigurationChange = (newConfig) => {
    setConfiguration(newConfig);
  };

  const handleParametersChange = (newParams) => {
    setParameters(newParams);
  };

  const handleGeneratePaper = () => {
    if (!configuration.isValid) return;
    
    setIsGenerating(true);
    setShowProgressModal(true);
  };

  const handleGenerationComplete = (results) => {
    setIsGenerating(false);
    console.log('Generation completed:', results);
    // Handle the results (download, save, etc.)
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
    setIsGenerating(false);
  };

  const canGenerate = configuration.isValid && !isGenerating;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/role-based-dashboard"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Question Paper Generation</h1>
                <p className="text-sm text-muted-foreground">
                  Automated DGCA-compliant examination paper creation system
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/question-bank-management">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Database"
                  iconPosition="left"
                >
                  Question Bank
                </Button>
              </Link>
              <Link to="/blueprint-configuration">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Blueprint Config
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Configuration Section */}
          <StreamModuleSelector
            onConfigurationChange={handleConfigurationChange}
            isGenerating={isGenerating}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <BlueprintCompliancePanel
                selectedModule={configuration.module}
                selectedStream={configuration.stream}
              />
              
              <GenerationParametersPanel
                configuration={configuration}
                onParametersChange={handleParametersChange}
                isGenerating={isGenerating}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <QuestionRepetitionTracker
                selectedModule={configuration.module}
                selectedStream={configuration.stream}
              />
              
              <PaperPreviewPanel
                configuration={configuration}
                parameters={parameters}
                isGenerating={isGenerating}
              />
            </div>
          </div>

          {/* Generation Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ready to Generate</h3>
                  <p className="text-sm text-muted-foreground">
                    {canGenerate 
                      ? `Generate ${parameters.generateDualSets ? 'dual sets' : 'single set'} for ${configuration.stream} - ${configuration.module}`
                      : 'Complete configuration to enable paper generation'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  disabled={!canGenerate}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview Only
                </Button>
                <Button
                  variant="default"
                  disabled={!canGenerate}
                  loading={isGenerating}
                  onClick={handleGeneratePaper}
                  iconName="FileText"
                  iconPosition="left"
                >
                  {isGenerating ? 'Generating...' : 'Generate Paper'}
                </Button>
              </div>
            </div>
            
            {configuration.isValid && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Stream:</span>
                    <span className="ml-2 font-medium text-foreground">{configuration.stream}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Module:</span>
                    <span className="ml-2 font-medium text-foreground">{configuration.module}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reference:</span>
                    <span className="ml-2 font-medium font-mono text-foreground">{configuration.referenceNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Papers:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {parameters.generateDualSets ? '2 Sets' : '1 Set'}
                      {parameters.includeMasterCopy ? ' + Master' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generation Progress Modal */}
      <GenerationProgressModal
        isOpen={showProgressModal}
        onClose={handleCloseProgressModal}
        configuration={configuration}
        parameters={parameters}
        onComplete={handleGenerationComplete}
      />
    </div>
  );
};

export default QuestionPaperGeneration;