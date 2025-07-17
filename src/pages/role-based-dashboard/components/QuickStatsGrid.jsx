import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsGrid = ({ stats, userRole }) => {
  const getStatIcon = (type) => {
    const iconMap = {
      questions: 'Database',
      papers: 'FileText',
      users: 'Users',
      examinations: 'Calendar',
      pending: 'Clock',
      approved: 'CheckCircle'
    };
    return iconMap[type] || 'BarChart3';
  };

  const getStatColor = (type) => {
    const colorMap = {
      questions: 'text-primary bg-primary/10',
      papers: 'text-accent bg-accent/10',
      users: 'text-secondary bg-secondary/10',
      examinations: 'text-warning bg-warning/10',
      pending: 'text-error bg-error/10',
      approved: 'text-success bg-success/10'
    };
    return colorMap[type] || 'text-muted-foreground bg-muted/10';
  };

  const getRoleSpecificStats = () => {
    switch (userRole) {
      case 'Training Manager':
        return [
          { type: 'users', label: 'Total Users', value: stats.totalUsers, change: '+2 this week' },
          { type: 'questions', label: 'Question Bank', value: stats.totalQuestions, change: '+45 this month' },
          { type: 'papers', label: 'Papers Generated', value: stats.papersGenerated, change: '+8 this week' },
          { type: 'examinations', label: 'Scheduled Exams', value: stats.scheduledExams, change: '3 upcoming' }
        ];
      case 'Instructor':
        return [
          { type: 'questions', label: 'My Questions', value: stats.myQuestions, change: '+12 this week' },
          { type: 'pending', label: 'Pending Review', value: stats.pendingReview, change: '5 urgent' },
          { type: 'approved', label: 'Approved', value: stats.approved, change: '+8 today' },
          { type: 'examinations', label: 'My Modules', value: stats.myModules, change: '4 active' }
        ];
      case 'Examiner':
        return [
          { type: 'papers', label: 'Papers to Generate', value: stats.papersToGenerate, change: '2 due today' },
          { type: 'questions', label: 'Available Questions', value: stats.availableQuestions, change: 'Updated 2h ago' },
          { type: 'examinations', label: 'Upcoming Exams', value: stats.upcomingExams, change: 'Next: Tomorrow' },
          { type: 'approved', label: 'Completed Papers', value: stats.completedPapers, change: '+3 this week' }
        ];
      case 'Examination Manager':
        return [
          { type: 'examinations', label: 'Active Exams', value: stats.activeExams, change: '2 in progress' },
          { type: 'papers', label: 'Papers Ready', value: stats.papersReady, change: '5 pending review' },
          { type: 'users', label: 'Candidates', value: stats.candidates, change: '+15 registered' },
          { type: 'pending', label: 'Pending Actions', value: stats.pendingActions, change: '3 urgent' }
        ];
      default:
        return [];
    }
  };

  const roleStats = getRoleSpecificStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {roleStats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.type)}`}>
              <Icon name={getStatIcon(stat.type)} size={24} />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-success">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;