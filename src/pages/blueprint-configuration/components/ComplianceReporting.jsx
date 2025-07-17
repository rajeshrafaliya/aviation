import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceReporting = ({ complianceData, onExportReport, onGenerateAuditTrail }) => {
  const getComplianceStatus = (status) => {
    const statusMap = {
      'compliant': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'warning': { color: 'bg-warning/10 text-warning', icon: 'AlertTriangle' },
      'non_compliant': { color: 'bg-error/10 text-error', icon: 'XCircle' }
    };
    return statusMap[status] || statusMap['warning'];
  };

  const formatPercentage = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">DGCA Compliance</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Regulatory compliance status and reporting
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onGenerateAuditTrail}
              iconName="FileText"
              iconPosition="left"
            >
              Audit Trail
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onExportReport}
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Overall Compliance Score */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Overall Compliance Score</h4>
              <p className="text-sm text-muted-foreground">
                Based on DGCA AME examination standards
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">
                {formatPercentage(complianceData.overallScore)}
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(complianceData.lastUpdated).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Checks */}
        <div className="space-y-3">
          {complianceData.checks.map((check) => {
            const status = getComplianceStatus(check.status);
            return (
              <div key={check.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status.color}`}>
                    <Icon name={status.icon} size={16} />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{check.title}</h5>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {check.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {check.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Requirements */}
        <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Shield" size={16} className="mr-2" />
            DGCA Requirements Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Question Distribution:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• L1 (Knowledge): 40-50%</li>
                <li>• L2 (Comprehension): 30-40%</li>
                <li>• L3 (Application): 20-30%</li>
              </ul>
            </div>
            <div>
              <strong>Time Allocation:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• 75 seconds per question</li>
                <li>• Maximum 3 hours per paper</li>
                <li>• Minimum 60 questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReporting;