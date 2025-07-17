import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChangeTracker = ({ changes, onApproveChange, onRejectChange }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getChangeTypeIcon = (type) => {
    const iconMap = {
      'create': 'Plus',
      'update': 'Edit',
      'delete': 'Trash2'
    };
    return iconMap[type] || 'FileText';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': 'bg-warning/10 text-warning',
      'approved': 'bg-success/10 text-success',
      'rejected': 'bg-error/10 text-error'
    };
    return colorMap[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Change History</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Track all blueprint modifications and approvals
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {changes.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No changes recorded</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {changes.map((change) => (
              <div key={change.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      change.type === 'create' ? 'bg-success/10 text-success' :
                      change.type === 'update'? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'
                    }`}>
                      <Icon name={getChangeTypeIcon(change.type)} size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {change.description}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span>By {change.user}</span>
                        <span>{formatTimestamp(change.timestamp)}</span>
                        <span>Module: {change.module}</span>
                      </div>
                      {change.details && (
                        <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                          {change.details}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(change.status)
                    }`}>
                      {change.status}
                    </span>
                    {change.status === 'pending' && (
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onApproveChange(change.id)}
                          iconName="Check"
                          iconSize={12}
                          className="text-success hover:bg-success/10"
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onRejectChange(change.id)}
                          iconName="X"
                          iconSize={12}
                          className="text-error hover:bg-error/10"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeTracker;