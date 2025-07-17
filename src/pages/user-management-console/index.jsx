import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';


import UserCard from './components/UserCard';
import UserTable from './components/UserTable';
import UserFilters from './components/UserFilters';
import UserCreationWizard from './components/UserCreationWizard';
import BulkOperationsPanel from './components/BulkOperationsPanel';
import AuditTrailViewer from './components/AuditTrailViewer';
import UserDetailsModal from './components/UserDetailsModal';

const UserManagementConsole = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    module: '',
    createdFrom: '',
    createdTo: ''
  });

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      username: 'rajesh.kumar',
      email: 'rajesh.kumar@ametraining.edu',
      role: 'Training Manager',
      status: 'Active',
      assignedModules: ['M1', 'M2', 'M3', 'M4', 'M5'],
      lastLogin: '2025-07-17T07:25:00',
      createdAt: '2025-01-15T10:00:00',
      updatedAt: '2025-07-17T07:25:00',
      permissions: {
        questionBankAccess: true,
        paperGenerationRights: true,
        administrativeCapabilities: true,
        blueprintModification: true,
        userManagement: true,
        systemConfiguration: true
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      username: 'priya.patel',
      email: 'priya.patel@ametraining.edu',
      role: 'Instructor',
      status: 'Active',
      assignedModules: ['M1', 'M2', 'M8'],
      lastLogin: '2025-07-17T06:45:00',
      createdAt: '2025-02-20T14:30:00',
      updatedAt: '2025-07-16T18:20:00',
      permissions: {
        questionBankAccess: true,
        paperGenerationRights: false,
        administrativeCapabilities: false,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      }
    },
    {
      id: 3,
      name: 'Amit Sharma',
      username: 'amit.sharma',
      email: 'amit.sharma@ametraining.edu',
      role: 'Examiner',
      status: 'Active',
      assignedModules: ['M3', 'M4', 'M5', 'M6'],
      lastLogin: '2025-07-17T05:30:00',
      createdAt: '2025-03-10T09:15:00',
      updatedAt: '2025-07-15T16:45:00',
      permissions: {
        questionBankAccess: true,
        paperGenerationRights: true,
        administrativeCapabilities: false,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      }
    },
    {
      id: 4,
      name: 'Neha Gupta',
      username: 'neha.gupta',
      email: 'neha.gupta@ametraining.edu',
      role: 'Examination Manager',
      status: 'Active',
      assignedModules: ['M7A', 'M7B', 'M9A', 'M9B'],
      lastLogin: '2025-07-16T22:15:00',
      createdAt: '2025-04-05T11:20:00',
      updatedAt: '2025-07-16T22:15:00',
      permissions: {
        questionBankAccess: true,
        paperGenerationRights: true,
        administrativeCapabilities: true,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      }
    },
    {
      id: 5,
      name: 'Ravi Patel',
      username: 'ravi.patel',
      email: 'ravi.patel@ametraining.edu',
      role: 'Instructor',
      status: 'Suspended',
      assignedModules: ['M6', 'M10'],
      lastLogin: '2025-07-10T14:20:00',
      createdAt: '2025-05-12T16:45:00',
      updatedAt: '2025-07-12T10:30:00',
      permissions: {
        questionBankAccess: false,
        paperGenerationRights: false,
        administrativeCapabilities: false,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      }
    },
    {
      id: 6,
      name: 'Kavita Singh',
      username: 'kavita.singh',
      email: 'kavita.singh@ametraining.edu',
      role: 'Instructor',
      status: 'Pending',
      assignedModules: [],
      lastLogin: null,
      createdAt: '2025-07-16T12:00:00',
      updatedAt: '2025-07-16T12:00:00',
      permissions: {
        questionBankAccess: false,
        paperGenerationRights: false,
        administrativeCapabilities: false,
        blueprintModification: false,
        userManagement: false,
        systemConfiguration: false
      }
    }
  ]);

  // Mock saved filter presets
  const [savedPresets, setSavedPresets] = useState([
    { id: 1, name: 'Active Instructors', filters: { role: 'Instructor', status: 'Active' } },
    { id: 2, name: 'Suspended Users', filters: { status: 'Suspended' } },
    { id: 3, name: 'Recent Users', filters: { createdFrom: '2025-07-01' } }
  ]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(prev => 
      prev.length === users.length ? [] : users.map(user => user.id)
    );
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      status: '',
      module: '',
      createdFrom: '',
      createdTo: ''
    });
  };

  const handleSavePreset = () => {
    const presetName = prompt('Enter preset name:');
    if (presetName) {
      const newPreset = {
        id: Date.now(),
        name: presetName,
        filters: { ...filters }
      };
      setSavedPresets(prev => [...prev, newPreset]);
    }
  };

  const handleLoadPreset = (presetId) => {
    const preset = savedPresets.find(p => p.id === parseInt(presetId));
    if (preset) {
      setFilters(preset.filters);
    }
  };

  const handleCreateUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      status: 'Active',
      lastLogin: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowCreateWizard(true);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, status: newStatus, updatedAt: new Date().toISOString() }
        : u
    ));
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleBulkOperation = (operation, userIds, params) => {
    console.log('Bulk operation:', operation, userIds, params);
    // Implement bulk operations logic here
    setSelectedUsers([]);
  };

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => {
      if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !user.username.toLowerCase().includes(filters.search.toLowerCase()) &&
          !user.email.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.role && user.role !== filters.role) return false;
      if (filters.status && user.status !== filters.status) return false;
      if (filters.module && !user.assignedModules.includes(filters.module)) return false;
      if (filters.createdFrom && new Date(user.createdAt) < new Date(filters.createdFrom)) return false;
      if (filters.createdTo && new Date(user.createdAt) > new Date(filters.createdTo)) return false;
      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Icon name="Users" size={24} className="text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">User Management Console</h1>
                <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAuditTrail(true)}
                iconName="FileText"
                iconPosition="left"
                iconSize={16}
              >
                Audit Trail
              </Button>
              <Button
                variant="default"
                onClick={() => setShowCreateWizard(true)}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Create User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <UserFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onSavePreset={handleSavePreset}
          savedPresets={savedPresets}
          onLoadPreset={handleLoadPreset}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-semibold text-foreground">{users.length}</p>
              </div>
              <Icon name="Users" size={24} className="text-primary" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold text-success">
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
              <Icon name="UserCheck" size={24} className="text-success" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-semibold text-warning">
                  {users.filter(u => u.status === 'Suspended').length}
                </p>
              </div>
              <Icon name="UserX" size={24} className="text-warning" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold text-muted-foreground">
                  {users.filter(u => u.status === 'Pending').length}
                </p>
              </div>
              <Icon name="Clock" size={24} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Bulk Operations */}
        {selectedUsers.length > 0 && (
          <div className="mb-6">
            <BulkOperationsPanel
              selectedUsers={selectedUsers}
              totalUsers={users.length}
              onBulkOperation={handleBulkOperation}
            />
          </div>
        )}

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredAndSortedUsers.length} of {users.length} users
            </span>
            {selectedUsers.length > 0 && (
              <span className="text-sm text-accent">
                {selectedUsers.length} selected
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              iconName="List"
              iconSize={16}
            />
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              iconSize={16}
            />
          </div>
        </div>

        {/* User List */}
        {viewMode === 'table' ? (
          <UserTable
            users={filteredAndSortedUsers}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
            onEdit={handleEditUser}
            onToggleStatus={handleToggleStatus}
            onViewDetails={handleViewDetails}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onToggleStatus={handleToggleStatus}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">
              {Object.values(filters).some(Boolean) 
                ? 'Try adjusting your filters to see more results.' :'Get started by creating your first user account.'
              }
            </p>
            <Button
              variant="default"
              onClick={() => setShowCreateWizard(true)}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Create First User
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <UserCreationWizard
        isOpen={showCreateWizard}
        onClose={() => {
          setShowCreateWizard(false);
          setSelectedUser(null);
        }}
        onSubmit={handleCreateUser}
      />

      <AuditTrailViewer
        isOpen={showAuditTrail}
        onClose={() => setShowAuditTrail(false)}
      />

      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserDetails}
        onClose={() => {
          setShowUserDetails(false);
          setSelectedUser(null);
        }}
        onEdit={handleEditUser}
      />
    </div>
  );
};

export default UserManagementConsole;