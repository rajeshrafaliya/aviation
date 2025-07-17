import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ userRole }) => {
  const getRoleActions = () => {
    switch (userRole) {
      case 'Training Manager':
        return [
          {
            title: 'User Management',
            description: 'Manage users and permissions',
            icon: 'Users',
            path: '/user-management-console',
            color: 'bg-primary text-primary-foreground'
          },
          {
            title: 'Blueprint Config',
            description: 'Configure examination blueprints',
            icon: 'Settings',
            path: '/blueprint-configuration',
            color: 'bg-accent text-accent-foreground'
          },
          {
            title: 'System Settings',
            description: 'Configure system parameters',
            icon: 'Cog',
            path: '/system-configuration',
            color: 'bg-secondary text-secondary-foreground'
          },
          {
            title: 'Question Bank',
            description: 'Manage question repository',
            icon: 'Database',
            path: '/question-bank-management',
            color: 'bg-warning text-warning-foreground'
          }
        ];
      case 'Instructor':
        return [
          {
            title: 'Add Questions',
            description: 'Create new questions',
            icon: 'Plus',
            path: '/question-bank-management',
            color: 'bg-primary text-primary-foreground'
          },
          {
            title: 'Review Questions',
            description: 'Review pending questions',
            icon: 'Eye',
            path: '/question-bank-management',
            color: 'bg-accent text-accent-foreground'
          },
          {
            title: 'Blueprint Config',
            description: 'View blueprint settings',
            icon: 'Settings',
            path: '/blueprint-configuration',
            color: 'bg-secondary text-secondary-foreground'
          },
          {
            title: 'My Modules',
            description: 'Manage assigned modules',
            icon: 'BookOpen',
            path: '/question-bank-management',
            color: 'bg-success text-success-foreground'
          }
        ];
      case 'Examiner':
        return [
          {
            title: 'Generate Paper',
            description: 'Create examination papers',
            icon: 'FileText',
            path: '/question-paper-generation',
            color: 'bg-primary text-primary-foreground'
          },
          {
            title: 'Question Bank',
            description: 'Browse available questions',
            icon: 'Database',
            path: '/question-bank-management',
            color: 'bg-accent text-accent-foreground'
          },
          {
            title: 'Blueprint View',
            description: 'View examination blueprints',
            icon: 'Settings',
            path: '/blueprint-configuration',
            color: 'bg-secondary text-secondary-foreground'
          },
          {
            title: 'Paper History',
            description: 'View generated papers',
            icon: 'History',
            path: '/question-paper-generation',
            color: 'bg-warning text-warning-foreground'
          }
        ];
      case 'Examination Manager':
        return [
          {
            title: 'Schedule Exam',
            description: 'Schedule new examinations',
            icon: 'Calendar',
            path: '/role-based-dashboard',
            color: 'bg-primary text-primary-foreground'
          },
          {
            title: 'Monitor Exams',
            description: 'Monitor active examinations',
            icon: 'Monitor',
            path: '/role-based-dashboard',
            color: 'bg-accent text-accent-foreground'
          },
          {
            title: 'Generate Papers',
            description: 'Generate examination papers',
            icon: 'FileText',
            path: '/question-paper-generation',
            color: 'bg-secondary text-secondary-foreground'
          },
          {
            title: 'View Reports',
            description: 'Access examination reports',
            icon: 'BarChart3',
            path: '/role-based-dashboard',
            color: 'bg-success text-success-foreground'
          }
        ];
      default:
        return [];
    }
  };

  const actions = getRoleActions();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group block p-4 rounded-lg border border-border hover:border-accent transition-all duration-200 hover:shadow-subtle"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                  {action.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-200" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;