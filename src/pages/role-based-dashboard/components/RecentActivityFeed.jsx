import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities, userRole }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      question_added: 'Plus',
      question_updated: 'Edit',
      paper_generated: 'FileText',
      user_created: 'UserPlus',
      blueprint_updated: 'Settings',
      exam_scheduled: 'Calendar',
      system_backup: 'Database',
      login: 'LogIn',
      logout: 'LogOut'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      question_added: 'text-success bg-success/10',
      question_updated: 'text-accent bg-accent/10',
      paper_generated: 'text-primary bg-primary/10',
      user_created: 'text-secondary bg-secondary/10',
      blueprint_updated: 'text-warning bg-warning/10',
      exam_scheduled: 'text-primary bg-primary/10',
      system_backup: 'text-muted-foreground bg-muted/10',
      login: 'text-success bg-success/10',
      logout: 'text-error bg-error/10'
    };
    return colorMap[type] || 'text-muted-foreground bg-muted/10';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime.toLocaleDateString('en-IN');
  };

  const getRoleSpecificActivities = () => {
    return activities.filter(activity => {
      switch (userRole) {
        case 'Training Manager':
          return true; // See all activities
        case 'Instructor':
          return ['question_added', 'question_updated', 'blueprint_updated'].includes(activity.type);
        case 'Examiner':
          return ['paper_generated', 'question_added', 'blueprint_updated'].includes(activity.type);
        case 'Examination Manager':
          return ['exam_scheduled', 'paper_generated', 'system_backup'].includes(activity.type);
        default:
          return false;
      }
    });
  };

  const filteredActivities = getRoleSpecificActivities();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          filteredActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                {activity.details && (
                  <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {filteredActivities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-accent hover:text-accent/80 transition-colors duration-150">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;