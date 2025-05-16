import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./source/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./dashboard/UserDashboard";
import PoliceDashboard from "./dashboard/PoliceDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ViewCriminals from './pages/ViewCriminals';
import EditCriminal from './pages/EditCriminal';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/criminals" element={<ViewCriminals />} />
          <Route path="/edit-criminal/:criminalId" element={<EditCriminal />} />

          {/* Role-based Protected Routes */}
          {user && user.role === "admin" && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
          {user && user.role === "police" && (
            <Route path="/police" element={<PoliceDashboard />} />
          )}
          {user && user.role === "user" && (
            <Route path="/user" element={<UserDashboard />} />
          )}

          {/* Catch-all route for redirecting to home if no match */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
