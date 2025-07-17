import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrailViewer = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    dateFrom: '',
    dateTo: '',
    ipAddress: ''
  });

  // Mock audit trail data
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-07-17T07:25:00',
      user: 'Dr. Rajesh Kumar',
      action: 'User Created',
      details: 'Created new user: Priya Patel (Instructor)',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2025-07-17T07:20:00',
      user: 'Dr. Rajesh Kumar',
      action: 'Role Modified',
      details: 'Changed role for Amit Sharma from Examiner to Instructor',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 3,
      timestamp: '2025-07-17T07:15:00',
      user: 'Dr. Rajesh Kumar',
      action: 'Module Assignment',
      details: 'Assigned modules M1, M2, M3 to Neha Gupta',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 4,
      timestamp: '2025-07-17T07:10:00',
      user: 'System',
      action: 'Login Attempt',
      details: 'Failed login attempt for user: unknown_user',
      ipAddress: '192.168.1.67',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Failed'
    },
    {
      id: 5,
      timestamp: '2025-07-17T07:05:00',
      user: 'Dr. Rajesh Kumar',
      action: 'User Suspended',
      details: 'Suspended user account: Ravi Patel due to policy violation',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 6,
      timestamp: '2025-07-17T07:00:00',
      user: 'Dr. Rajesh Kumar',
      action: 'Password Reset',
      details: 'Reset password for user: Kavita Singh',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    }
  ];

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'User Created', label: 'User Created' },
    { value: 'User Modified', label: 'User Modified' },
    { value: 'User Deleted', label: 'User Deleted' },
    { value: 'Role Modified', label: 'Role Modified' },
    { value: 'Module Assignment', label: 'Module Assignment' },
    { value: 'Password Reset', label: 'Password Reset' },
    { value: 'User Suspended', label: 'User Suspended' },
    { value: 'User Activated', label: 'User Activated' },
    { value: 'Login Attempt', label: 'Login Attempt' }
  ];

  const getActionIcon = (action) => {
    const iconMap = {
      'User Created': 'UserPlus',
      'User Modified': 'UserCheck',
      'User Deleted': 'UserX',
      'Role Modified': 'Shield',
      'Module Assignment': 'BookOpen',
      'Password Reset': 'Key',
      'User Suspended': 'UserMinus',
      'User Activated': 'UserCheck',
      'Login Attempt': 'LogIn'
    };
    return iconMap[action] || 'Activity';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Success': 'text-success',
      'Failed': 'text-error',
      'Warning': 'text-warning'
    };
    return colors[status] || 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      user: '',
      action: '',
      dateFrom: '',
      dateTo: '',
      ipAddress: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={24} className="text-foreground" />
            <h2 className="text-xl font-semibold text-foreground">Audit Trail</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Input
              label="User"
              type="text"
              placeholder="Search by user..."
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            />
            <Select
              label="Action"
              options={actionOptions}
              value={filters.action}
              onChange={(value) => handleFilterChange('action', value)}
            />
            <Input
              label="From Date"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
            <Input
              label="To Date"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
            <Input
              label="IP Address"
              type="text"
              placeholder="192.168.1.1"
              value={filters.ipAddress}
              onChange={(e) => handleFilterChange('ipAddress', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export Audit Log
            </Button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Details</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">IP Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">
                    {log.user}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActionIcon(log.action)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {log.ipAddress}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {auditLogs.length} audit entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              iconSize={14}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">Page 1 of 1</span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              iconSize={14}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailViewer;