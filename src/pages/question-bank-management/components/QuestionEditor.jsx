import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuestionEditor = ({ selectedQuestion, onSave, onCancel }) => {
  const [questionData, setQuestionData] = useState({
    id: selectedQuestion?.id || '',
    text: selectedQuestion?.text || '',
    difficulty: selectedQuestion?.difficulty || 'L1',
    module: selectedQuestion?.module || '',
    subModule: selectedQuestion?.subModule || '',
    answerType: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    tags: [],
    blueprintCompliant: true,
    estimatedTime: 75
  });

  const [activeTab, setActiveTab] = useState('question');
  const [showPreview, setShowPreview] = useState(false);

  const difficultyOptions = [
    { value: 'L1', label: 'Level 1 - Basic Knowledge' },
    { value: 'L2', label: 'Level 2 - Application' },
    { value: 'L3', label: 'Level 3 - Analysis & Synthesis' }
  ];

  const moduleOptions = [
    { value: 'module-1', label: 'Module 1 - Mathematics' },
    { value: 'module-2', label: 'Module 2 - Physics' },
    { value: 'module-3', label: 'Module 3 - Electrical Fundamentals' },
    { value: 'module-4', label: 'Module 4 - Electronic Fundamentals' },
    { value: 'module-5', label: 'Module 5 - Digital Techniques' }
  ];

  const subModuleOptions = [
    { value: 'sub-1-1', label: 'Arithmetic & Algebra' },
    { value: 'sub-1-2', label: 'Geometry & Trigonometry' },
    { value: 'sub-1-3', label: 'Statistics & Probability' },
    { value: 'sub-2-1', label: 'Mechanics' },
    { value: 'sub-2-2', label: 'Thermodynamics' }
  ];

  const handleInputChange = (field, value) => {
    setQuestionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    if (questionData.options.length < 6) {
      setQuestionData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (questionData.options.length > 2) {
      const newOptions = questionData.options.filter((_, i) => i !== index);
      setQuestionData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: prev.correctAnswer >= index ? Math.max(0, prev.correctAnswer - 1) : prev.correctAnswer
      }));
    }
  };

  const handleSave = () => {
    // Validation logic here
    if (!questionData.text.trim()) {
      alert('Question text is required');
      return;
    }
    
    if (questionData.options.some(opt => !opt.trim())) {
      alert('All options must be filled');
      return;
    }

    onSave(questionData);
  };

  const tabs = [
    { id: 'question', label: 'Question', icon: 'FileText' },
    { id: 'answers', label: 'Answers', icon: 'CheckCircle' },
    { id: 'metadata', label: 'Metadata', icon: 'Settings' },
    { id: 'validation', label: 'Validation', icon: 'Shield' }
  ];

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Question Editor</h2>
            <p className="text-sm text-muted-foreground">
              {selectedQuestion ? `Editing ${selectedQuestion.id}` : 'Create new question'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={showPreview ? 'Edit' : 'Eye'}
              iconPosition="left"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" size="sm" iconName="Save" iconPosition="left">
              Draft
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'question' && (
          <div className="space-y-6">
            {/* Question ID */}
            <Input
              label="Question ID"
              value={questionData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              placeholder="Auto-generated if empty"
              description="Unique identifier for the question"
            />

            {/* Question Text */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Question Text *</label>
              <textarea
                value={questionData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
                placeholder="Enter the question text here..."
                className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Use clear, concise language appropriate for the difficulty level</span>
                <span>{questionData.text.length}/1000 characters</span>
              </div>
            </div>

            {/* Formatting Tools */}
            <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <span className="text-sm font-medium text-foreground">Format:</span>
              <Button variant="ghost" size="sm" iconName="Bold">B</Button>
              <Button variant="ghost" size="sm" iconName="Italic">I</Button>
              <Button variant="ghost" size="sm" iconName="Underline">U</Button>
              <div className="w-px h-4 bg-border"></div>
              <Button variant="ghost" size="sm" iconName="Subscript">X₂</Button>
              <Button variant="ghost" size="sm" iconName="Superscript">X²</Button>
              <Button variant="ghost" size="sm" iconName="Function">f(x)</Button>
              <Button variant="ghost" size="sm" iconName="Image">IMG</Button>
            </div>

            {/* Module Selection */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Module"
                options={moduleOptions}
                value={questionData.module}
                onChange={(value) => handleInputChange('module', value)}
                required
              />
              <Select
                label="Sub-module"
                options={subModuleOptions}
                value={questionData.subModule}
                onChange={(value) => handleInputChange('subModule', value)}
                required
              />
            </div>

            {/* Difficulty Level */}
            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={questionData.difficulty}
              onChange={(value) => handleInputChange('difficulty', value)}
              description="Select appropriate cognitive level as per DGCA guidelines"
              required
            />
          </div>
        )}

        {activeTab === 'answers' && (
          <div className="space-y-6">
            {/* Answer Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Answer Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="answerType"
                    value="multiple-choice"
                    checked={questionData.answerType === 'multiple-choice'}
                    onChange={(e) => handleInputChange('answerType', e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-sm">Multiple Choice</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="answerType"
                    value="true-false"
                    checked={questionData.answerType === 'true-false'}
                    onChange={(e) => handleInputChange('answerType', e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-sm">True/False</span>
                </label>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Answer Options *</label>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={addOption}
                  disabled={questionData.options.length >= 6}
                >
                  Add Option
                </Button>
              </div>

              {questionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={questionData.correctAnswer === index}
                    onChange={() => handleInputChange('correctAnswer', index)}
                    className="text-primary"
                  />
                  <div className="flex-1">
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                  </div>
                  {questionData.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => removeOption(index)}
                      className="text-error hover:text-error"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Answer Explanation</label>
              <textarea
                value={questionData.explanation}
                onChange={(e) => handleInputChange('explanation', e.target.value)}
                placeholder="Provide detailed explanation for the correct answer..."
                className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground">
                Help students understand why this is the correct answer
              </p>
            </div>
          </div>
        )}

        {activeTab === 'metadata' && (
          <div className="space-y-6">
            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <Input
                placeholder="Add tags separated by commas"
                description="Tags help in categorizing and searching questions"
              />
            </div>

            {/* Estimated Time */}
            <Input
              label="Estimated Time (seconds)"
              type="number"
              value={questionData.estimatedTime}
              onChange={(e) => handleInputChange('estimatedTime', parseInt(e.target.value))}
              description="Time typically required to answer this question"
              min="30"
              max="300"
            />

            {/* Blueprint Compliance */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={questionData.blueprintCompliant}
                  onChange={(e) => handleInputChange('blueprintCompliant', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">Blueprint Compliant</span>
              </label>
              <p className="text-xs text-muted-foreground">
                Question follows DGCA examination blueprint requirements
              </p>
            </div>

            {/* Creation Info */}
            <div className="p-4 bg-muted/50 rounded-md space-y-2">
              <h4 className="text-sm font-medium text-foreground">Creation Information</h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Created by:</span>
                  <div>Dr. Rajesh Kumar</div>
                </div>
                <div>
                  <span className="font-medium">Created on:</span>
                  <div>2025-07-17 07:28:25</div>
                </div>
                <div>
                  <span className="font-medium">Last modified:</span>
                  <div>2025-07-17 07:28:25</div>
                </div>
                <div>
                  <span className="font-medium">Version:</span>
                  <div>1.0</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="space-y-6">
            {/* Validation Status */}
            <div className="p-4 bg-success/10 border border-success/20 rounded-md">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Validation Passed</span>
              </div>
              <p className="text-xs text-success/80">
                Question meets all DGCA blueprint requirements and quality standards
              </p>
            </div>

            {/* Validation Checklist */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Quality Checklist</h4>
              
              {[
                { item: 'Question text is clear and unambiguous', status: 'pass' },
                { item: 'Appropriate difficulty level assigned', status: 'pass' },
                { item: 'All answer options are plausible', status: 'pass' },
                { item: 'Correct answer is clearly defined', status: 'pass' },
                { item: 'Blueprint compliance verified', status: 'pass' },
                { item: 'Grammar and spelling checked', status: 'warning' },
                { item: 'Technical accuracy reviewed', status: 'pending' }
              ].map((check, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon
                    name={
                      check.status === 'pass' ? 'CheckCircle' :
                      check.status === 'warning' ? 'AlertTriangle' : 'Clock'
                    }
                    size={16}
                    className={
                      check.status === 'pass' ? 'text-success' :
                      check.status === 'warning' ? 'text-warning' : 'text-muted-foreground'
                    }
                  />
                  <span className="text-sm text-foreground">{check.item}</span>
                </div>
              ))}
            </div>

            {/* Review History */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Review History</h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">Initial Review</span>
                    <span className="text-xs text-muted-foreground">2025-07-17 07:15:00</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Question approved by Prof. Sharma - Technical content verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Save" size={14} />
            <span>Auto-saved 2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left">
              Save Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;