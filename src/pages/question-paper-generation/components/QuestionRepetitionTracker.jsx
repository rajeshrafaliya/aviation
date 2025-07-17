import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionRepetitionTracker = ({ selectedModule, selectedStream }) => {
  const [selectedExamination, setSelectedExamination] = useState(null);

  // Mock examination history data
  const examinationHistory = [
    {
      id: 1,
      referenceNumber: '2507AM01A',
      date: '2025-07-15',
      stream: 'B1.1',
      module: 'M1',
      questionsUsed: 16,
      status: 'completed',
      nextAvailable: '2025-10-15'
    },
    {
      id: 2,
      referenceNumber: '2507AM02A',
      date: '2025-07-10',
      stream: 'B1.1',
      module: 'M1',
      questionsUsed: 16,
      status: 'completed',
      nextAvailable: '2025-10-10'
    },
    {
      id: 3,
      referenceNumber: '2507AM03A',
      date: '2025-07-05',
      stream: 'B1.1',
      module: 'M1',
      questionsUsed: 16,
      status: 'completed',
      nextAvailable: '2025-10-05'
    },
    {
      id: 4,
      referenceNumber: '2507AM04A',
      date: '2025-06-30',
      stream: 'B1.1',
      module: 'M1',
      questionsUsed: 16,
      status: 'archived',
      nextAvailable: '2025-09-30'
    }
  ];

  // Mock question usage data
  const questionUsageData = {
    totalQuestions: 72,
    availableQuestions: 56,
    blockedQuestions: 16,
    recentlyUsed: [
      { id: 'Q001', lastUsed: '2025-07-15', examRef: '2507AM01A', nextAvailable: '2025-10-15' },
      { id: 'Q002', lastUsed: '2025-07-15', examRef: '2507AM01A', nextAvailable: '2025-10-15' },
      { id: 'Q003', lastUsed: '2025-07-10', examRef: '2507AM02A', nextAvailable: '2025-10-10' },
      { id: 'Q004', lastUsed: '2025-07-10', examRef: '2507AM02A', nextAvailable: '2025-10-10' },
      { id: 'Q005', lastUsed: '2025-07-05', examRef: '2507AM03A', nextAvailable: '2025-10-05' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'archived': return 'text-muted-foreground bg-muted';
      default: return 'text-foreground bg-muted/50';
    }
  };

  const getDaysUntilAvailable = (dateString) => {
    const availableDate = new Date(dateString);
    const today = new Date();
    const diffTime = availableDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredHistory = selectedModule && selectedStream 
    ? examinationHistory.filter(exam => exam.module === selectedModule && exam.stream === selectedStream)
    : examinationHistory;

  if (!selectedModule || !selectedStream) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Question Repetition Tracker</h2>
            <p className="text-sm text-muted-foreground">Monitor question usage and availability</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Select stream and module to view question usage history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Question Repetition Tracker</h2>
            <p className="text-sm text-muted-foreground">Monitor question usage for {selectedStream} - {selectedModule}</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
              <p className="text-2xl font-bold text-foreground">{questionUsageData.totalQuestions}</p>
            </div>
            <Icon name="Database" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-success">{questionUsageData.availableQuestions}</p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Blocked</p>
              <p className="text-2xl font-bold text-error">{questionUsageData.blockedQuestions}</p>
            </div>
            <Icon name="XCircle" size={24} className="text-error" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Availability</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round((questionUsageData.availableQuestions / 16) * 10) / 10}x
              </p>
            </div>
            <Icon name="Target" size={24} className="text-warning" />
          </div>
        </div>
      </div>

      {/* Examination History */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-foreground mb-4">Recent Examinations</h3>
        <div className="space-y-3">
          {filteredHistory.map((exam) => {
            const daysUntilAvailable = getDaysUntilAvailable(exam.nextAvailable);
            const isAvailable = daysUntilAvailable <= 0;
            
            return (
              <div 
                key={exam.id} 
                className={`border border-border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
                  selectedExamination === exam.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedExamination(selectedExamination === exam.id ? null : exam.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(exam.status)}`}>
                      <Icon name="FileText" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{exam.referenceNumber}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString('en-IN')} • {exam.questionsUsed} questions
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isAvailable ? 'text-success bg-success/10' : 'text-warning bg-warning/10'
                    }`}>
                      <Icon name={isAvailable ? "CheckCircle" : "Clock"} size={12} />
                      <span>
                        {isAvailable ? 'Available' : `${daysUntilAvailable} days`}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedExamination === exam.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Stream:</span>
                        <span className="ml-2 font-medium text-foreground">{exam.stream}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Module:</span>
                        <span className="ml-2 font-medium text-foreground">{exam.module}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Available:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {new Date(exam.nextAvailable).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Used Questions */}
      <div>
        <h3 className="text-md font-semibold text-foreground mb-4">Recently Used Questions</h3>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="space-y-2">
            {questionUsageData.recentlyUsed.map((question, index) => {
              const daysUntilAvailable = getDaysUntilAvailable(question.nextAvailable);
              const isAvailable = daysUntilAvailable <= 0;
              
              return (
                <div key={question.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono text-muted-foreground">{question.id}</span>
                    <span className="text-sm text-foreground">
                      Used in {question.examRef}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(question.lastUsed).toLocaleDateString('en-IN')}
                    </span>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isAvailable ? 'text-success bg-success/10' : 'text-warning bg-warning/10'
                    }`}>
                      <Icon name={isAvailable ? "CheckCircle" : "Clock"} size={10} />
                      <span>
                        {isAvailable ? 'Available' : `${daysUntilAvailable}d`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionRepetitionTracker;