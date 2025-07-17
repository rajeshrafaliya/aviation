import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import SystemStatusWidget from './components/SystemStatusWidget';
import QuickStatsGrid from './components/QuickStatsGrid';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import UpcomingExaminationsWidget from './components/UpcomingExaminationsWidget';
import NotificationPanel from './components/NotificationPanel';

const RoleBasedDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data - in real app this would come from authentication context
  const currentUser = {
    id: 1,
    name: "Mr.Rajesh Rafaliya",
    role: "Training Manager",
    institute: "AME Training Institute Surat",
    email: "rajeshrafaliya@gmail.com",
    modules: ["B1.1", "B1.3", "B2"],
    lastLogin: "2025-07-17T06:30:00"
  };

  // Mock system status
  const systemStatus = {
    database: "online",
    backup: "online",
    questionBank: "online",
    lastBackup: "2025-07-17 06:00 AM"
  };

  // Mock statistics data
  const dashboardStats = {
    // Training Manager stats
    totalUsers: 45,
    totalQuestions: 2847,
    papersGenerated: 23,
    scheduledExams: 8,
    
    // Instructor stats
    myQuestions: 156,
    pendingReview: 12,
    approved: 144,
    myModules: 4,
    
    // Examiner stats
    papersToGenerate: 3,
    availableQuestions: 1245,
    upcomingExams: 5,
    completedPapers: 18,
    
    // Examination Manager stats
    activeExams: 2,
    papersReady: 7,
    candidates: 89,
    pendingActions: 4
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "question_added",
      user: "Dr. Priya Sharma",
      action: "added 5 new questions to Module B1.1",
      details: "Electrical Systems - Circuit Analysis",
      timestamp: "2025-07-17T07:15:00"
    },
    {
      id: 2,
      type: "paper_generated",
      user: "Prof. Amit Patel",
      action: "generated examination paper",
      details: "Paper ID: 25071701A - Module B1.3",
      timestamp: "2025-07-17T07:00:00"
    },
    {
      id: 3,
      type: "blueprint_updated",
      user: "Dr. Rajesh Kumar",
      action: "updated blueprint configuration",
      details: "Modified difficulty distribution for Module B2",
      timestamp: "2025-07-17T06:45:00"
    },
    {
      id: 4,
      type: "user_created",
      user: "System Admin",
      action: "created new instructor account",
      details: "Instructor: Ms. Kavya Reddy - Modules: B1.1, B1.3",
      timestamp: "2025-07-17T06:30:00"
    },
    {
      id: 5,
      type: "system_backup",
      user: "System",
      action: "completed automated backup",
      details: "Question bank and user data backed up successfully",
      timestamp: "2025-07-17T06:00:00"
    }
  ];

  // Mock upcoming examinations
  const upcomingExaminations = [
    {
      id: 1,
      title: "B1.1 Module Final Examination",
      stream: "B1.1",
      module: "Electrical Systems",
      date: "2025-07-18T10:00:00",
      duration: 180,
      candidates: 25,
      status: "preparation",
      examiner: "Prof. Amit Patel",
      manager: "Dr. Rajesh Kumar"
    },
    {
      id: 2,
      title: "B1.3 Practical Assessment",
      stream: "B1.3",
      module: "Mechanical Systems",
      date: "2025-07-19T14:00:00",
      duration: 240,
      candidates: 18,
      status: "scheduled",
      examiner: "Dr. Priya Sharma",
      manager: "Dr. Rajesh Kumar"
    },
    {
      id: 3,
      title: "B2 Theory Examination",
      stream: "B2",
      module: "Avionics Systems",
      date: "2025-07-20T09:00:00",
      duration: 150,
      candidates: 32,
      status: "ready",
      examiner: "Prof. Suresh Nair",
      manager: "Dr. Rajesh Kumar"
    },
    {
      id: 4,
      title: "B1.1 Mid-term Assessment",
      stream: "B1.1",
      module: "Aircraft Structures",
      date: "2025-07-22T11:00:00",
      duration: 120,
      candidates: 28,
      status: "scheduled",
      examiner: "Dr. Meera Singh",
      manager: "Dr. Rajesh Kumar"
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: "Questions Pending Review",
      message: "15 questions from Dr. Priya Sharma require approval for Module B1.1",
      timestamp: "2025-07-17T07:20:00",
      priority: "high",
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: "deadline",
      title: "Paper Generation Deadline",
      message: "Examination paper for B1.3 module due tomorrow at 10:00 AM",
      timestamp: "2025-07-17T07:10:00",
      priority: "high",
      read: false,
      actionRequired: true
    },
    {
      id: 3,
      type: "blueprint",
      title: "Blueprint Updated",
      message: "Module B2 blueprint has been modified. Review changes before next paper generation.",
      timestamp: "2025-07-17T06:45:00",
      priority: "medium",
      read: false,
      actionRequired: false
    },
    {
      id: 4,
      type: "system",
      title: "Scheduled Maintenance",
      message: "System maintenance scheduled for tonight at 11:00 PM. Duration: 2 hours",
      timestamp: "2025-07-17T06:30:00",
      priority: "low",
      read: true,
      actionRequired: false
    },
    {
      id: 5,
      type: "user",
      title: "New User Registration",
      message: "Instructor Ms. Kavya Reddy has been added to the system",
      timestamp: "2025-07-17T06:15:00",
      priority: "low",
      read: true,
      actionRequired: false
    },
    {
      id: 6,
      type: "exam",
      title: "Examination Scheduled",
      message: "B1.1 Final Examination scheduled for tomorrow at 10:00 AM",
      timestamp: "2025-07-17T06:00:00",
      priority: "medium",
      read: true,
      actionRequired: false
    }
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <DashboardHeader user={currentUser} currentTime={currentTime} />
      
      {/* Main Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Quick Stats Grid */}
        <QuickStatsGrid stats={dashboardStats} userRole={currentUser.role} />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions and System Status */}
          <div className="space-y-6">
            <QuickActionsPanel userRole={currentUser.role} />
            <SystemStatusWidget systemStatus={systemStatus} />
          </div>
          
          {/* Middle Column - Recent Activity and Upcoming Exams */}
          <div className="space-y-6">
            <RecentActivityFeed activities={recentActivities} userRole={currentUser.role} />
            <UpcomingExaminationsWidget examinations={upcomingExaminations} userRole={currentUser.role} />
          </div>
          
          {/* Right Column - Notifications */}
          <div>
            <NotificationPanel notifications={notifications} userRole={currentUser.role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedDashboard;