import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Firstpage";  // HomePage file
import LoginRegister from "./components/LoginRegister";  // LoginRegister file
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import GoalTracker from "./components/GoalTracker";
import DailyPlanner from "./components/DailyPlanner";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import HabitTracker from "./components/HabitTracker";
import FocusMode from "./components/FocusMode";
import WorkLifeBalance from "./components/WorkLifeBalance";
import WeeklyOverview from "./components/WeeklyOverview";
import ReflectionJournal from "./components/ReflectionJournal";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for HomePage, accessible at '/' */}
        <Route path="/" element={<HomePage />} />

        {/* Route for LoginPage, accessible at '/login' */}
        <Route path="/login" element={<LoginRegister />} />

        {/* Route for Dashboard, accessible at '/dashboard' */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Other routes */}
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/goal-tracker" element={<GoalTracker />} />
        <Route path="/daily-planner" element={<DailyPlanner />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/focus-mode" element={<FocusMode />} />
        <Route path="/work-life-balance" element={<WorkLifeBalance />} />
        <Route path="/weekly-overview" element={<WeeklyOverview />} />
        <Route path="/reflection-journal" element={<ReflectionJournal />} />
      </Routes>
    </Router>
  );
};

export default App;
