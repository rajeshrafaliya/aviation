import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingExaminationsWidget = ({ examinations, userRole }) => {
  const getExamStatusColor = (status) => {
    const statusColors = {
      scheduled: 'text-primary bg-primary/10',
      preparation: 'text-warning bg-warning/10',
      ready: 'text-success bg-success/10',
      in_progress: 'text-accent bg-accent/10',
      completed: 'text-muted-foreground bg-muted/10'
    };
    return statusColors[status] || 'text-muted-foreground bg-muted/10';
  };

  const getExamStatusIcon = (status) => {
    const statusIcons = {
      scheduled: 'Calendar',
      preparation: 'Clock',
      ready: 'CheckCircle',
      in_progress: 'Play',
      completed: 'Check'
    };
    return statusIcons[status] || 'HelpCircle';
  };

  const formatExamDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatExamTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilExam = (dateString) => {
    const now = new Date();
    const examDate = new Date(dateString);
    const diffTime = examDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `${diffDays} days`;
    return 'Past due';
  };

  const getRoleSpecificExams = () => {
    return examinations.filter(exam => {
      switch (userRole) {
        case 'Training Manager':
          return true; // See all examinations
        case 'Instructor':
          return exam.modules.some(module => exam.assignedInstructors?.includes('current_user'));
        case 'Examiner':
          return exam.examiner === 'current_user' || exam.status === 'preparation';
        case 'Examination Manager':
          return exam.manager === 'current_user' || ['scheduled', 'in_progress'].includes(exam.status);
        default:
          return false;
      }
    });
  };

  const filteredExams = getRoleSpecificExams();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Examinations</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredExams.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No upcoming examinations</p>
          </div>
        ) : (
          filteredExams.map((exam, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{exam.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{exam.stream} - {exam.module}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getExamStatusColor(exam.status)}`}>
                  <Icon name={getExamStatusIcon(exam.status)} size={12} className="mr-1" />
                  {exam.status.replace('_', ' ').charAt(0).toUpperCase() + exam.status.replace('_', ' ').slice(1)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <div className="font-medium text-foreground">{formatExamDate(exam.date)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <div className="font-medium text-foreground">{formatExamTime(exam.date)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="font-medium text-foreground">{exam.duration} mins</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Candidates:</span>
                  <div className="font-medium text-foreground">{exam.candidates}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center text-xs">
                  <Icon name="Clock" size={12} className="mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{getDaysUntilExam(exam.date)}</span>
                </div>
                <div className="flex space-x-2">
                  {exam.status === 'preparation' && userRole === 'Examiner' && (
                    <Button variant="outline" size="xs">
                      Generate Paper
                    </Button>
                  )}
                  <Button variant="ghost" size="xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {filteredExams.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full text-sm">
            View all examinations
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingExaminationsWidget;