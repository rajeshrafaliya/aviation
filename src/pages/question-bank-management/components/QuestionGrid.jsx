import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionGrid = ({ selectedModule, selectedSubModule, onQuestionSelect, selectedQuestions, onBulkAction }) => {
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectAll, setSelectAll] = useState(false);

  const mockQuestions = [
    {
      id: 'Q001',
      text: 'What is the primary function of an aircraft altimeter in measuring altitude above sea level?',
      difficulty: 'L1',
      module: 'Module 1',
      subModule: 'Arithmetic & Algebra',
      createdDate: '2025-07-15',
      lastUsed: '2025-07-16',
      usageCount: 12,
      status: 'active',
      createdBy: 'Dr. Sharma',
      blueprintCompliant: true
    },
    {
      id: 'Q002',
      text: 'Calculate the resultant force when two forces of 150N and 200N act at an angle of 60° to each other.',
      difficulty: 'L2',
      module: 'Module 2',
      subModule: 'Mechanics',
      createdDate: '2025-07-14',
      lastUsed: '2025-07-15',
      usageCount: 8,
      status: 'active',
      createdBy: 'Prof. Patel',
      blueprintCompliant: true
    },
    {
      id: 'Q003',
      text: 'Explain the working principle of a three-phase AC generator and its applications in aircraft electrical systems.',
      difficulty: 'L3',
      module: 'Module 3',
      subModule: 'AC Theory',
      createdDate: '2025-07-13',
      lastUsed: '2025-07-14',
      usageCount: 15,
      status: 'active',
      createdBy: 'Dr. Kumar',
      blueprintCompliant: true
    },
    {
      id: 'Q004',
      text: 'What are the key differences between analog and digital signal processing in avionics systems?',
      difficulty: 'L2',
      module: 'Module 4',
      subModule: 'Analog Electronics',
      createdDate: '2025-07-12',
      lastUsed: '2025-07-13',
      usageCount: 6,
      status: 'review',
      createdBy: 'Prof. Singh',
      blueprintCompliant: false
    },
    {
      id: 'Q005',
      text: 'Convert the binary number 11010110 to its decimal and hexadecimal equivalents.',
      difficulty: 'L1',
      module: 'Module 5',
      subModule: 'Number Systems',
      createdDate: '2025-07-11',
      lastUsed: '2025-07-12',
      usageCount: 20,
      status: 'active',
      createdBy: 'Dr. Gupta',
      blueprintCompliant: true
    },
    {
      id: 'Q006',
      text: 'Describe the process of troubleshooting a malfunctioning aircraft navigation system using systematic approach.',
      difficulty: 'L3',
      module: 'Module 4',
      subModule: 'Digital Electronics',
      createdDate: '2025-07-10',
      lastUsed: '2025-07-11',
      usageCount: 4,
      status: 'archived',
      createdBy: 'Prof. Mehta',
      blueprintCompliant: true
    },
    {
      id: 'Q007',
      text: 'What is Ohm\'s Law and how is it applied in aircraft electrical circuit analysis?',
      difficulty: 'L1',
      module: 'Module 3',
      subModule: 'DC Theory',
      createdDate: '2025-07-09',
      lastUsed: '2025-07-10',
      usageCount: 25,
      status: 'active',
      createdBy: 'Dr. Sharma',
      blueprintCompliant: true
    },
    {
      id: 'Q008',
      text: 'Calculate the power consumption of an aircraft lighting system with 12 LED lights, each consuming 3.5W at 28V DC.',
      difficulty: 'L2',
      module: 'Module 3',
      subModule: 'DC Theory',
      createdDate: '2025-07-08',
      lastUsed: '2025-07-09',
      usageCount: 11,
      status: 'active',
      createdBy: 'Prof. Patel',
      blueprintCompliant: true
    },
    {
      id: 'Q009',
      text: 'Explain the significance of Reynolds number in fluid mechanics and its application in aircraft design.',
      difficulty: 'L3',
      module: 'Module 2',
      subModule: 'Mechanics',
      createdDate: '2025-07-07',
      lastUsed: '2025-07-08',
      usageCount: 7,
      status: 'review',
      createdBy: 'Dr. Kumar',
      blueprintCompliant: true
    },
    {
      id: 'Q010',
      text: 'What are the basic trigonometric ratios and their applications in aircraft maintenance calculations?',
      difficulty: 'L1',
      module: 'Module 1',
      subModule: 'Geometry & Trigonometry',
      createdDate: '2025-07-06',
      lastUsed: '2025-07-07',
      usageCount: 18,
      status: 'active',
      createdBy: 'Prof. Singh',
      blueprintCompliant: true
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'L1': return 'bg-success/10 text-success';
      case 'L2': return 'bg-warning/10 text-warning';
      case 'L3': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'review': return 'bg-warning/10 text-warning';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      onQuestionSelect(mockQuestions.map(q => q.id));
    } else {
      onQuestionSelect([]);
    }
  };

  const handleQuestionCheck = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      onQuestionSelect(selectedQuestions.filter(id => id !== questionId));
    } else {
      onQuestionSelect([...selectedQuestions, questionId]);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    return sortOrder === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-accent" />
      : <Icon name="ArrowDown" size={14} className="text-accent" />;
  };

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Question Repository</h2>
            <p className="text-sm text-muted-foreground">
              {selectedSubModule ? 'Sub-module selected' : selectedModule ? 'Module selected' : 'Select module to view questions'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
              Import
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Add Question
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQuestions.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-accent/10 rounded-md">
            <span className="text-sm font-medium text-accent">
              {selectedQuestions.length} question{selectedQuestions.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                Edit
              </Button>
              <Button variant="outline" size="sm" iconName="Archive" iconPosition="left">
                Archive
              </Button>
              <Button variant="outline" size="sm" iconName="Trash2" iconPosition="left">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Question Table */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>ID</span>
                    <SortIcon field="id" />
                  </button>
                </th>
                <th className="p-3 text-left min-w-0 flex-1">
                  <button
                    onClick={() => handleSort('text')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>Question Text</span>
                    <SortIcon field="text" />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('difficulty')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>Level</span>
                    <SortIcon field="difficulty" />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('usageCount')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>Usage</span>
                    <SortIcon field="usageCount" />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>Status</span>
                    <SortIcon field="status" />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('createdDate')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <span>Created</span>
                    <SortIcon field="createdDate" />
                  </button>
                </th>
                <th className="w-20 p-3 text-center">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mockQuestions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                    selectedQuestions.includes(question.id) ? 'bg-accent/5' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => handleQuestionCheck(question.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-mono text-foreground">{question.id}</span>
                  </td>
                  <td className="p-3 min-w-0">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                        {question.text}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{question.subModule}</span>
                        <span>•</span>
                        <span>by {question.createdBy}</span>
                        {question.blueprintCompliant && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Icon name="CheckCircle" size={12} className="text-success" />
                              <span className="text-success">Blueprint Compliant</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{question.usageCount}</div>
                      <div className="text-xs text-muted-foreground">times used</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                      {question.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div className="text-foreground">{question.createdDate}</div>
                      <div className="text-xs text-muted-foreground">Last used: {question.lastUsed}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <button
                        className="p-1 rounded hover:bg-muted transition-colors duration-150"
                        title="Edit Question"
                      >
                        <Icon name="Edit" size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-muted transition-colors duration-150"
                        title="View Details"
                      >
                        <Icon name="Eye" size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-muted transition-colors duration-150"
                        title="More Options"
                      >
                        <Icon name="MoreVertical" size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            Showing {mockQuestions.length} of {mockQuestions.length} questions
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Rows per page:</span>
              <select className="border border-border rounded px-2 py-1 text-sm">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="ChevronLeft" disabled />
              <span className="text-muted-foreground">Page 1 of 1</span>
              <Button variant="outline" size="sm" iconName="ChevronRight" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGrid;