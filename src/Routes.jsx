import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QuestionPaperGeneration from './pages/question-paper-generation';
import SystemConfiguration from './pages/system-configuration';
import QuestionBankManagement from './pages/question-bank-management';
import BlueprintConfiguration from './pages/blueprint-configuration';
import RoleBasedDashboard from './pages/role-based-dashboard';
import UserManagementConsole from './pages/user-management-console';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<RoleBasedDashboard />} />
        <Route path="/question-paper-generation" element={<QuestionPaperGeneration />} />
        <Route path="/system-configuration" element={<SystemConfiguration />} />
        <Route path="/question-bank-management" element={<QuestionBankManagement />} />
        <Route path="/blueprint-configuration" element={<BlueprintConfiguration />} />
        <Route path="/role-based-dashboard" element={<RoleBasedDashboard />} />
        <Route path="/user-management-console" element={<UserManagementConsole />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
