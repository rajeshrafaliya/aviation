import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionControl = ({ versions, onRestoreVersion, onCreateBackup }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);

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

  const getVersionTypeIcon = (type) => {
    const iconMap = {
      'manual': 'Save',
      'auto': 'Clock',
      'milestone': 'Flag'
    };
    return iconMap[type] || 'FileText';
  };

  const getVersionTypeColor = (type) => {
    const colorMap = {
      'manual': 'bg-primary/10 text-primary',
      'auto': 'bg-muted text-muted-foreground',
      'milestone': 'bg-warning/10 text-warning'
    };
    return colorMap[type] || 'bg-muted text-muted-foreground';
  };

  const handleRestore = (version) => {
    if (window.confirm(`Are you sure you want to restore to version ${version.version}? This action cannot be undone.`)) {
      onRestoreVersion(version.id);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Version Control</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage blueprint versions and rollback capabilities
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={onCreateBackup}
            iconName="Save"
            iconPosition="left"
          >
            Create Backup
          </Button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {versions.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Archive" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No versions available</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {versions.map((version) => (
              <div
                key={version.id}
                className={`p-4 hover:bg-muted/30 transition-colors ${
                  version.isCurrent ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getVersionTypeColor(version.type)
                    }`}>
                      <Icon name={getVersionTypeIcon(version.type)} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-foreground">
                          Version {version.version}
                        </h4>
                        {version.isCurrent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                            Current
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          getVersionTypeColor(version.type)
                        }`}>
                          {version.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {version.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>By {version.createdBy}</span>
                        <span>{formatTimestamp(version.createdAt)}</span>
                        <span>{version.changes} changes</span>
                      </div>
                      {version.notes && (
                        <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                          <strong>Notes:</strong> {version.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setSelectedVersion(version)}
                      iconName="Eye"
                      iconSize={12}
                    >
                      View
                    </Button>
                    {!version.isCurrent && (
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleRestore(version)}
                        iconName="RotateCcw"
                        iconSize={12}
                        className="text-warning hover:bg-warning/10"
                      >
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Version Details Modal */}
      {selectedVersion && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Version {selectedVersion.version} Details
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVersion(null)}
                  iconName="X"
                  iconSize={16}
                />
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Changes Summary</h4>
                  <div className="space-y-2">
                    {selectedVersion.changeDetails?.map((change, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                        <span className="text-foreground">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Metadata</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <div className="font-medium">{formatTimestamp(selectedVersion.createdAt)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created By:</span>
                      <div className="font-medium">{selectedVersion.createdBy}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium capitalize">{selectedVersion.type}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <div className="font-medium">{selectedVersion.size}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionControl;