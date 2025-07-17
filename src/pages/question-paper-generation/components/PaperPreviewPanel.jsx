import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaperPreviewPanel = ({ configuration, parameters, isGenerating }) => {
  const [previewMode, setPreviewMode] = useState('student'); // 'student' or 'master'
  const [currentPage, setCurrentPage] = useState(1);

  // Mock generated questions for preview
  const mockQuestions = [
    {
      id: 'Q001',
      number: 1,
      text: 'What is the primary function of the aircraft pitot-static system?',
      options: [
        'A) To measure engine temperature',
        'B) To measure airspeed and altitude',
        'C) To control fuel flow',
        'D) To monitor hydraulic pressure'
      ],
      correctAnswer: 'B',
      difficulty: 'L2',
      subModule: 'M1.1'
    },
    {
      id: 'Q002',
      number: 2,
      text: 'In aircraft maintenance, what does the term "AD" stand for?',
      options: [
        'A) Aircraft Document',
        'B) Airworthiness Directive',
        'C) Aviation Department',
        'D) Approved Data'
      ],
      correctAnswer: 'B',
      difficulty: 'L1',
      subModule: 'M1.2'
    },
    {
      id: 'Q003',
      number: 3,
      text: 'Which material is commonly used for aircraft structural components due to its high strength-to-weight ratio?',
      options: [
        'A) Steel',
        'B) Aluminum alloy',
        'C) Copper',
        'D) Lead'
      ],
      correctAnswer: 'B',
      difficulty: 'L2',
      subModule: 'M1.3'
    }
  ];

  const questionsPerPage = 5;
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);
  const currentQuestions = mockQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (!configuration.isValid) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Eye" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Paper Preview</h2>
            <p className="text-sm text-muted-foreground">Real-time preview of generated paper</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Complete configuration to preview generated paper</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Eye" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Paper Preview</h2>
            <p className="text-sm text-muted-foreground">Real-time preview of {configuration.stream} - {configuration.module}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('student')}
          >
            Student View
          </Button>
          <Button
            variant={previewMode === 'master' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('master')}
          >
            Master Copy
          </Button>
        </div>
      </div>

      {/* Paper Preview */}
      <div className="bg-white border border-border rounded-lg p-8 shadow-sm">
        {/* Paper Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={32} className="text-primary" />
            </div>
            <div className="flex-1 mx-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">AME Training Institute</h1>
              <h2 className="text-lg font-semibold text-gray-700">Aircraft Maintenance Engineering Examination</h2>
            </div>
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground">LOGO</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm text-gray-700">
            <div className="text-left">
              <p><strong>Stream:</strong> {configuration.stream}</p>
              <p><strong>Module:</strong> {configuration.module}</p>
              <p><strong>Reference No:</strong> {configuration.referenceNumber}</p>
            </div>
            <div className="text-right">
              <p><strong>Date:</strong> {formatDate(new Date())}</p>
              <p><strong>Time:</strong> {formatTime(new Date())}</p>
              <p><strong>Duration:</strong> {Math.ceil(mockQuestions.length * 75 / 60)} minutes</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Answer all questions by selecting the most appropriate option</li>
            <li>• Each question carries equal marks</li>
            <li>• Use only black or blue pen for marking answers</li>
            <li>• No electronic devices are permitted during the examination</li>
          </ul>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question) => (
            <div key={question.id} className="border-l-4 border-primary/20 pl-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900">
                  {question.number}. {question.text}
                </h3>
                {previewMode === 'master' && (
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded">
                      {question.subModule}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded ${
                      previewMode === 'master' && option.startsWith(question.correctAnswer)
                        ? 'bg-success/10 border border-success/20 font-semibold text-success-foreground' :'hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        )}

        {/* Paper Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <div className="flex justify-between items-center">
            <span>Generated on: {formatDate(new Date())} at {formatTime(new Date())}</span>
            <span>Page {currentPage} of {totalPages}</span>
            <span>AME Examination System v2.0</span>
          </div>
          {parameters?.addWatermark && (
            <div className="mt-2 opacity-50">
              <span>CONFIDENTIAL - FOR AUTHORIZED USE ONLY</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={16} />
            <span>{mockQuestions.length} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{Math.ceil(mockQuestions.length * 75 / 60)} minutes</span>
          </div>
          {parameters?.generateDualSets && (
            <div className="flex items-center space-x-1">
              <Icon name="Copy" size={16} />
              <span>Dual sets</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Download PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
          >
            Print Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaperPreviewPanel;