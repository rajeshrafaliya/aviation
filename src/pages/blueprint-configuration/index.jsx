import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StreamTabs from './components/StreamTabs';
import BlueprintEditor from './components/BlueprintEditor';
import ChangeTracker from './components/ChangeTracker';
import ImpactAnalysis from './components/ImpactAnalysis';
import ComplianceReporting from './components/ComplianceReporting';
import BulkEditingTools from './components/BulkEditingTools';
import VersionControl from './components/VersionControl';

const BlueprintConfiguration = () => {
  const [activeStream, setActiveStream] = useState('b1_1');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [blueprintData, setBlueprintData] = useState({});
  const [changes, setChanges] = useState([]);
  const [versions, setVersions] = useState([]);

  // Mock data for streams
  const streams = [
    { id: 'b1_1', name: 'B1.1 - Turbine' },
    { id: 'b1_3', name: 'B1.3 - Helicopter' },
    { id: 'b2', name: 'B2 - Avionics' }
  ];

  // Mock blueprint data
  const mockBlueprints = {
    b1_1: {
      id: 'b1_1',
      name: 'B1.1 - Turbine Aircraft',
      lastModified: '2025-07-17T06:30:00',
      modules: [
        {
          id: 'mod_01',
          name: 'Module 01 - Mathematics',
          subModules: [
            {
              id: 'sub_01_01',
              name: 'Arithmetic',
              code: '01.01',
              l1Questions: 8,
              l2Questions: 6,
              l3Questions: 4
            },
            {
              id: 'sub_01_02',
              name: 'Algebra and Functions',
              code: '01.02',
              l1Questions: 10,
              l2Questions: 8,
              l3Questions: 5
            },
            {
              id: 'sub_01_03',
              name: 'Geometry and Trigonometry',
              code: '01.03',
              l1Questions: 12,
              l2Questions: 10,
              l3Questions: 6
            }
          ]
        },
        {
          id: 'mod_02',
          name: 'Module 02 - Physics',
          subModules: [
            {
              id: 'sub_02_01',
              name: 'Matter',
              code: '02.01',
              l1Questions: 6,
              l2Questions: 4,
              l3Questions: 2
            },
            {
              id: 'sub_02_02',
              name: 'Mechanics',
              code: '02.02',
              l1Questions: 15,
              l2Questions: 12,
              l3Questions: 8
            },
            {
              id: 'sub_02_03',
              name: 'Thermodynamics',
              code: '02.03',
              l1Questions: 10,
              l2Questions: 8,
              l3Questions: 5
            }
          ]
        },
        {
          id: 'mod_05',
          name: 'Module 05 - Digital Techniques',
          subModules: [
            {
              id: 'sub_05_01',
              name: 'Electronic Instrument Systems',
              code: '05.01',
              l1Questions: 8,
              l2Questions: 6,
              l3Questions: 4
            },
            {
              id: 'sub_05_02',
              name: 'Numbering Systems',
              code: '05.02',
              l1Questions: 6,
              l2Questions: 4,
              l3Questions: 3
            }
          ]
        }
      ]
    },
    b1_3: {
      id: 'b1_3',
      name: 'B1.3 - Helicopter',
      lastModified: '2025-07-16T14:20:00',
      modules: [
        {
          id: 'mod_01',
          name: 'Module 01 - Mathematics',
          subModules: [
            {
              id: 'sub_01_01',
              name: 'Arithmetic',
              code: '01.01',
              l1Questions: 8,
              l2Questions: 6,
              l3Questions: 4
            }
          ]
        }
      ]
    },
    b2: {
      id: 'b2',
      name: 'B2 - Avionics',
      lastModified: '2025-07-15T11:45:00',
      modules: [
        {
          id: 'mod_05',
          name: 'Module 05 - Digital Techniques',
          subModules: [
            {
              id: 'sub_05_01',
              name: 'Electronic Instrument Systems',
              code: '05.01',
              l1Questions: 12,
              l2Questions: 10,
              l3Questions: 6
            }
          ]
        }
      ]
    }
  };

  // Mock change history
  const mockChanges = [
    {
      id: 1,
      type: 'update',
      description: 'Updated L1 questions for Module 01 - Arithmetic',
      user: 'Dr. Rajesh Kumar',
      timestamp: '2025-07-17T07:15:00',
      module: 'Module 01',
      status: 'pending',
      details: 'Increased L1 questions from 6 to 8 to meet DGCA requirements'
    },
    {
      id: 2,
      type: 'create',
      description: 'Added new sub-module for Digital Systems',
      user: 'Prof. Priya Sharma',
      timestamp: '2025-07-17T06:45:00',
      module: 'Module 05',
      status: 'approved',
      details: 'New sub-module 05.03 - Digital Systems added with 18 total questions'
    },
    {
      id: 3,
      type: 'update',
      description: 'Modified difficulty distribution for Physics module',
      user: 'Dr. Rajesh Kumar',
      timestamp: '2025-07-17T06:30:00',
      module: 'Module 02',
      status: 'approved',
      details: 'Redistributed questions to maintain 45:35:20 ratio for L1:L2:L3'
    }
  ];

  // Mock impact analysis data
  const mockImpactData = [
    {
      id: 1,
      type: 'question_bank',
      level: 'medium',
      title: 'Question Bank Capacity',
      description: 'Current changes require 15% more questions in Module 01',
      details: [
        'Arithmetic sub-module needs 6 additional L1 questions',
        'Current bank has 24 questions, need minimum 54 for 3x capacity',
        'Estimated time to create: 2-3 days'
      ],
      recommendations: 'Schedule question creation session with subject matter experts'
    },
    {
      id: 2,
      type: 'upcoming_exams',
      level: 'high',
      title: 'Upcoming Examinations',
      description: '3 scheduled examinations will be affected by blueprint changes',
      details: [
        'Batch AME-2024-A exam on 25/07/2025',
        'Batch AME-2024-B exam on 30/07/2025',
        'Supplementary exam on 05/08/2025'
      ],
      recommendations: 'Notify examination managers and update paper generation templates'
    },
    {
      id: 3,
      type: 'compliance',
      level: 'low',
      title: 'DGCA Compliance',
      description: 'All changes maintain regulatory compliance standards',
      details: [
        'Difficulty distribution within acceptable range',
        'Total question count meets minimum requirements',
        'Time allocation follows 75-second rule'
      ],
      recommendations: 'No action required - changes are compliant'
    }
  ];

  // Mock compliance data
  const mockComplianceData = {
    overallScore: 0.94,
    lastUpdated: '2025-07-17T07:00:00',
    checks: [
      {
        id: 1,
        title: 'Question Distribution',
        description: 'L1:L2:L3 ratio compliance',
        status: 'compliant',
        value: '45:35:20',
        requirement: '40-50:30-40:20-30'
      },
      {
        id: 2,
        title: 'Minimum Questions',
        description: 'Each sub-module question count',
        status: 'compliant',
        value: '12-28 questions',
        requirement: 'Min 10 questions'
      },
      {
        id: 3,
        title: 'Time Allocation',
        description: 'Examination duration calculation',
        status: 'compliant',
        value: '75 sec/question',
        requirement: '75 sec/question'
      },
      {
        id: 4,
        title: 'Question Bank Capacity',
        description: '3x minimum capacity requirement',
        status: 'warning',
        value: '2.8x capacity',
        requirement: 'Min 3x capacity'
      }
    ]
  };

  // Mock version history
  const mockVersions = [
    {
      id: 1,
      version: '2.1.0',
      type: 'manual',
      description: 'Updated blueprint for DGCA compliance 2025',
      createdBy: 'Dr. Rajesh Kumar',
      createdAt: '2025-07-17T07:00:00',
      changes: 12,
      isCurrent: true,
      notes: 'Major update to align with new DGCA requirements',
      size: '2.4 MB',
      changeDetails: [
        'Updated Module 01 question distribution',
        'Added new sub-modules for Digital Systems',
        'Modified time allocations for practical modules'
      ]
    },
    {
      id: 2,
      version: '2.0.3',
      type: 'auto',
      description: 'Automatic backup before bulk changes',
      createdBy: 'System',
      createdAt: '2025-07-16T18:30:00',
      changes: 3,
      isCurrent: false,
      notes: 'Auto-generated backup',
      size: '2.3 MB',
      changeDetails: [
        'Minor adjustments to Module 02',
        'Updated metadata timestamps'
      ]
    },
    {
      id: 3,
      version: '2.0.2',
      type: 'milestone',
      description: 'Quarterly review milestone',
      createdBy: 'Prof. Priya Sharma',
      createdAt: '2025-07-15T10:00:00',
      changes: 8,
      isCurrent: false,
      notes: 'Q2 2025 review completed',
      size: '2.2 MB',
      changeDetails: [
        'Comprehensive review of all modules',
        'Updated difficulty distributions',
        'Added new question categories'
      ]
    }
  ];

  useEffect(() => {
    setBlueprintData(mockBlueprints);
    setChanges(mockChanges);
    setVersions(mockVersions);
  }, []);

  const handleStreamChange = (streamId) => {
    setActiveStream(streamId);
    setIsEditing(false);
  };

  const handleBlueprintChange = (moduleId, subModuleId, field, value) => {
    setBlueprintData(prev => ({
      ...prev,
      [activeStream]: {
        ...prev[activeStream],
        modules: prev[activeStream].modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                subModules: module.subModules.map(subModule =>
                  subModule.id === subModuleId
                    ? { ...subModule, [field]: value }
                    : subModule
                )
              }
            : module
        )
      }
    }));

    // Add change to history
    const newChange = {
      id: changes.length + 1,
      type: 'update',
      description: `Updated ${field} for ${subModuleId}`,
      user: 'Dr. Rajesh Kumar',
      timestamp: new Date().toISOString(),
      module: moduleId,
      status: 'pending',
      details: `Changed ${field} to ${value}`
    };
    setChanges(prev => [newChange, ...prev]);
  };

  const handleBulkUpdate = (updateData) => {
    console.log('Bulk update:', updateData);
    // Implement bulk update logic here
  };

  const handleApproveChange = (changeId) => {
    setChanges(prev =>
      prev.map(change =>
        change.id === changeId
          ? { ...change, status: 'approved' }
          : change
      )
    );
  };

  const handleRejectChange = (changeId) => {
    setChanges(prev =>
      prev.map(change =>
        change.id === changeId
          ? { ...change, status: 'rejected' }
          : change
      )
    );
  };

  const handleExportReport = () => {
    console.log('Exporting compliance report...');
  };

  const handleGenerateAuditTrail = () => {
    console.log('Generating audit trail...');
  };

  const handleRestoreVersion = (versionId) => {
    console.log('Restoring version:', versionId);
  };

  const handleCreateBackup = () => {
    const newVersion = {
      id: versions.length + 1,
      version: '2.1.1',
      type: 'manual',
      description: 'Manual backup before changes',
      createdBy: 'Dr. Rajesh Kumar',
      createdAt: new Date().toISOString(),
      changes: 0,
      isCurrent: false,
      notes: 'User-initiated backup',
      size: '2.4 MB',
      changeDetails: []
    };
    setVersions(prev => [newVersion, ...prev]);
  };

  const tabs = [
    { id: 'editor', label: 'Blueprint Editor', icon: 'Edit' },
    { id: 'changes', label: 'Change History', icon: 'Clock' },
    { id: 'impact', label: 'Impact Analysis', icon: 'TrendingUp' },
    { id: 'compliance', label: 'Compliance', icon: 'Shield' },
    { id: 'bulk', label: 'Bulk Tools', icon: 'Zap' },
    { id: 'versions', label: 'Versions', icon: 'Archive' }
  ];

  const currentBlueprint = blueprintData[activeStream];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blueprint Configuration - AME Examination System</title>
        <meta name="description" content="Configure and manage DGCA examination blueprints with compliance tracking and version control" />
      </Helmet>

      <div className="pl-16 lg:pl-60">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blueprint Configuration</h1>
              <p className="text-muted-foreground mt-1">
                Manage DGCA examination blueprints with compliance tracking and audit trails
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                size="sm"
              >
                Export Blueprint
              </Button>
            </div>
          </div>

          {/* Stream Selection */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Select Stream</h2>
            <StreamTabs
              activeStream={activeStream}
              onStreamChange={handleStreamChange}
              streams={streams}
            />
          </div>

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border">
            <div className="border-b border-border">
              <nav className="flex space-x-1 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'editor' && currentBlueprint && (
                <BlueprintEditor
                  blueprint={currentBlueprint}
                  onBlueprintChange={handleBlueprintChange}
                  isEditing={isEditing}
                  onToggleEdit={() => setIsEditing(!isEditing)}
                />
              )}

              {activeTab === 'changes' && (
                <ChangeTracker
                  changes={changes}
                  onApproveChange={handleApproveChange}
                  onRejectChange={handleRejectChange}
                />
              )}

              {activeTab === 'impact' && (
                <ImpactAnalysis impactData={mockImpactData} />
              )}

              {activeTab === 'compliance' && (
                <ComplianceReporting
                  complianceData={mockComplianceData}
                  onExportReport={handleExportReport}
                  onGenerateAuditTrail={handleGenerateAuditTrail}
                />
              )}

              {activeTab === 'bulk' && currentBlueprint && (
                <BulkEditingTools
                  onBulkUpdate={handleBulkUpdate}
                  modules={currentBlueprint.modules}
                />
              )}

              {activeTab === 'versions' && (
                <VersionControl
                  versions={versions}
                  onRestoreVersion={handleRestoreVersion}
                  onCreateBackup={handleCreateBackup}
                />
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={20} className="text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Modules</div>
                  <div className="text-xl font-bold text-foreground">
                    {currentBlueprint?.modules.length || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Layers" size={20} className="text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Sub-Modules</div>
                  <div className="text-xl font-bold text-foreground">
                    {currentBlueprint?.modules.reduce((acc, mod) => acc + mod.subModules.length, 0) || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-warning" />
                <div>
                  <div className="text-sm text-muted-foreground">Pending Changes</div>
                  <div className="text-xl font-bold text-foreground">
                    {changes.filter(c => c.status === 'pending').length}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <div>
                  <div className="text-sm text-muted-foreground">Compliance Score</div>
                  <div className="text-xl font-bold text-foreground">
                    {Math.round(mockComplianceData.overallScore * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintConfiguration;