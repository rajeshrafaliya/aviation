import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ users, selectedUsers, onSelectUser, onSelectAll, onEdit, onToggleStatus, onViewDetails, sortConfig, onSort }) => {
  const getRoleColor = (role) => {
    const colors = {
      'Training Manager': 'bg-primary text-primary-foreground',
      'Instructor': 'bg-accent text-accent-foreground',
      'Examiner': 'bg-secondary text-secondary-foreground',
      'Examination Manager': 'bg-warning text-warning-foreground'
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success text-success-foreground',
      'Inactive': 'bg-error text-error-foreground',
      'Suspended': 'bg-warning text-warning-foreground',
      'Pending': 'bg-muted text-muted-foreground'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = users.length > 0 && selectedUsers.length === users.length;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>User</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('role')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>Role</span>
                  <Icon name={getSortIcon('role')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Modules</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('lastLogin')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>Last Login</span>
                  <Icon name={getSortIcon('lastLogin')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {user.assignedModules.slice(0, 3).map((module, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        {module}
                      </span>
                    ))}
                    {user.assignedModules.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{user.assignedModules.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatLastLogin(user.lastLogin)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(user)}
                      iconName="Eye"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      iconName="Edit"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(user)}
                      iconName={user.status === 'Active' ? 'UserX' : 'UserCheck'}
                      iconSize={14}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;