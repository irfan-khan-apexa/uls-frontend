import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Projects from "../components/Projects";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Sidebar Layout */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="projects" element={<Projects />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Protect Dashboard & Branch Manager
const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <SidebarLayout /> : <Navigate to="/" />;
};

export default AppRoutes;
