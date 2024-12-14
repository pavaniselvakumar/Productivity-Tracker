import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import PomodoroTimer from "./components/PomodoroTimer";
import GoalTracker from "./components/GoalTracker";
import DailyPlanner from "./components/DailyPlanner";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import HabitTracker from "./components/HabitTracker";
import FocusMode from "./components/FocusMode";
import TimeLogging from "./components/TimeLogging";
import Reminders from "./components/Reminders";
import WorkLifeBalance from "./components/WorkLifeBalance";
import ProjectManagement from "./components/ProjectManagement";
import WeeklyOverview from "./components/WeeklyOverview";
import ReflectionJournal from "./components/ReflectionJournal";
import ResourceLibrary from "./components/ResourceLibrary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/goal-tracker" element={<GoalTracker />} />
        <Route path="/daily-planner" element={<DailyPlanner />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/focus-mode" element={<FocusMode />} />
        <Route path="/time-logging" element={<TimeLogging />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/work-life-balance" element={<WorkLifeBalance />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/weekly-overview" element={<WeeklyOverview />} />
        <Route path="/reflection-journal" element={<ReflectionJournal />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
      </Routes>
    </Router>
  );
};

export default App;
