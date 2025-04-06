// frontend/src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Login from "../components/Login.jsx";
import AdminRoute from "./AdminRoute.jsx";
import EmployeeRoute from "./EmployeeRoute.jsx";
import EmployeesList from "../components/admin/EmployeesList.jsx";
import AddJob from "../components/admin/AddJob.jsx";
import Jobs from "../components/employee/Jobs.jsx";
import CompanyShowcase from "../components/CompanyShowcase.jsx";
import Contact from "../components/Contact.jsx";
import JobListings from "../components/JobListings.jsx";

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      /* Set login as the default landing page */
        <Route
          path="/"
          element={
            isAuthenticated ? (
          user?.type === "admin" ? (
            <Navigate to="/admin/home" replace />
          ) : (
            <Navigate to="/employee/home" replace />
          )
            ) : (
          <Navigate to="/login" replace />
            )
          }
        />
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
          user?.type === "admin" ? (
            <Navigate to="/admin/home" />
          ) : (
            <Navigate to="/employee/home" />
          )
            ) : (
          <Login />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
          user?.type === "admin" ? (
            <Navigate to="/admin/about" />
          ) : (
            <Navigate to="/employee/about" />
          )
            ) : (
          <Navigate to="/login" replace />
            )
          }
        />
        {/* Admin routes */}
      <Route
        path="/admin/home"
        element={
          <AdminRoute>
            <Home />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/about"
        element={
          <AdminRoute>
            <About />
          </AdminRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <AdminRoute>
            <AddJob />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <AdminRoute>
            <EmployeesList />
          </AdminRoute>
        }
      />
      {/* Employee routes */}
      <Route
        path="/employee/home"
        element={
          <EmployeeRoute>
            <Home />
          </EmployeeRoute>
        }
      />
      <Route
        path="/employee/about"
        element={
          <EmployeeRoute>
            <About />
          </EmployeeRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <EmployeeRoute>
            <Jobs />
          </EmployeeRoute>
        }
      />
      <Route
        path="/company-showcase"
        element={
          <EmployeeRoute>
            <CompanyShowcase />
          </EmployeeRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <EmployeeRoute>
            <Contact />
          </EmployeeRoute>
        }
      />
      {/* Redirect to appropriate dashboard based on user type */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            user?.type === "admin" ? (
              <Navigate to="/admin/employees" replace />
            ) : (
              <Navigate to="/jobs" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
