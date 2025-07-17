import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactAnalysis = ({ impactData }) => {
  const getImpactColor = (level) => {
    const colorMap = {
      'high': 'bg-error/10 text-error border-error/20',
      'medium': 'bg-warning/10 text-warning border-warning/20',
      'low': 'bg-success/10 text-success border-success/20'
    };
    return colorMap[level] || 'bg-muted text-muted-foreground border-border';
  };

  const getImpactIcon = (type) => {
    const iconMap = {
      'question_bank': 'Database',
      'upcoming_exams': 'Calendar',
      'paper_generation': 'FileText',
      'compliance': 'Shield'
    };
    return iconMap[type] || 'AlertTriangle';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Impact Analysis</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze how blueprint changes affect system components
        </p>
      </div>

      <div className="p-4 space-y-4">
        {impactData.map((impact) => (
          <div
            key={impact.id}
            className={`p-4 rounded-lg border-2 ${getImpactColor(impact.level)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={getImpactIcon(impact.type)} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{impact.title}</h4>
                <p className="text-sm mt-1 opacity-90">{impact.description}</p>
                
                {impact.details && (
                  <div className="mt-3 space-y-2">
                    {impact.details.map((detail, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <Icon name="ArrowRight" size={12} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {impact.recommendations && (
                  <div className="mt-3 p-2 bg-background/50 rounded text-xs">
                    <strong>Recommendation:</strong> {impact.recommendations}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-medium uppercase tracking-wide">
                  {impact.level} Impact
                </span>
              </div>
            </div>
          </div>
        ))}

        {impactData.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
            <p className="text-muted-foreground">No significant impact detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactAnalysis;