import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ModuleTreeSidebar from './components/ModuleTreeSidebar';
import QuestionGrid from './components/QuestionGrid';
import QuestionEditor from './components/QuestionEditor';
import FilterToolbar from './components/FilterToolbar';

const QuestionBankManagement = () => {
  const [selectedModule, setSelectedModule] = useState('module-1');
  const [selectedSubModule, setSelectedSubModule] = useState('sub-1-1');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [filters, setFilters] = useState({});

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId);
    setSelectedSubModule('');
    setSelectedQuestions([]);
  };

  const handleSubModuleSelect = (subModuleId) => {
    setSelectedSubModule(subModuleId);
    setSelectedQuestions([]);
  };

  const handleQuestionSelect = (questionIds) => {
    setSelectedQuestions(Array.isArray(questionIds) ? questionIds : [questionIds]);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowEditor(true);
  };

  const handleSaveQuestion = (questionData) => {
    console.log('Saving question:', questionData);
    // Here you would typically save to your data store
    setShowEditor(false);
    setSelectedQuestion(null);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setSelectedQuestion(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'on questions:', selectedQuestions);
    // Handle bulk operations like delete, archive, etc.
  };

  return (
    <>
      <Helmet>
        <title>Question Bank Management - AME Examination System</title>
        <meta name="description" content="Comprehensive question repository interface for AME examination system with DGCA blueprint compliance validation" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Main Layout Container */}
        <div className="flex h-screen pt-16">
          {/* Left Sidebar - Module Tree (25%) */}
          <div className="w-1/4 min-w-[300px] max-w-[400px]">
            <ModuleTreeSidebar
              selectedModule={selectedModule}
              selectedSubModule={selectedSubModule}
              onModuleSelect={handleModuleSelect}
              onSubModuleSelect={handleSubModuleSelect}
            />
          </div>

          {/* Center Panel - Question Grid (50%) */}
          <div className={`${showEditor ? 'w-1/2' : 'w-3/4'} flex flex-col transition-all duration-300`}>
            {/* Filter Toolbar */}
            <FilterToolbar
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />

            {/* Question Grid */}
            <div className="flex-1">
              <QuestionGrid
                selectedModule={selectedModule}
                selectedSubModule={selectedSubModule}
                selectedQuestions={selectedQuestions}
                onQuestionSelect={handleQuestionSelect}
                onBulkAction={handleBulkAction}
                onEditQuestion={handleEditQuestion}
              />
            </div>
          </div>

          {/* Right Panel - Question Editor (25%) */}
          {showEditor && (
            <div className="w-1/4 min-w-[350px] max-w-[500px]">
              <QuestionEditor
                selectedQuestion={selectedQuestion}
                onSave={handleSaveQuestion}
                onCancel={handleCancelEdit}
              />
            </div>
          )}
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button
            onClick={() => setShowEditor(true)}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            aria-label="Add new question"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-card border border-border rounded-md px-2 py-1 shadow-sm">
          <div className="flex items-center space-x-4">
            <span><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+N</kbd> New Question</span>
            <span><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd> Save</span>
            <span><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+F</kbd> Search</span>
            <span><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Del</kbd> Delete</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBankManagement;