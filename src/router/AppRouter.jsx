import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import BlogDetail from "../components/blog/BlogDetail"; // BlogDetail bileşenini dahil et

import Blog from "../pages/Blog";
import Team from "../pages/Team";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Footer from "../components/Footer";
import VerifyEmail from "../pages/VerifyEmail";
import Pricing from "../pages/Pricing";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import TeamDetail from "../components/team/TeamDetail";
import About from "../pages/About";
import Services from "../pages/Services";
import AuthSuccess from "../pages/AuthSuccess";
import AuthFail from "../pages/AuthFail";
import Account from "../pages/Account";
import Chat from "../pages/Chat";
import VideoCall from "../pages/VideoCall";
import WriteBlog from "../pages/WriteBlog";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import Appointment from "../pages/Appointment";
import NotFound from "../pages/NotFound";
import UserManagement from "../pages/UserManagement";
import TherapistManagement from "../pages/TherapistManagement";
import CategoryManagement from "../pages/CategoryManagement";
import AppointmentManagement from "../pages/AppointmentManagement";
import BlogManagement from "../pages/BlogManagement";
import FeedbackManagement from "../pages/FeedbackManagement";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Area */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="auth/success" element={<AuthSuccess />} />
        <Route path="auth/fail" element={<AuthFail />} />
        <Route path="/therapists" element={<Team />} />
        <Route path="/therapists/:id" element={<TeamDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
        {/* Private Area */}
        <Route path="" element={<PrivateRouter />}>
          {/* Privates Routes */}
          <Route path="/profile" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="chat" element={<Chat />} />
            <Route path="video-call" element={<VideoCall />} />
            <Route path="write-blog" element={<WriteBlog />} />
            <Route path="write-blog/:id" element={<WriteBlog />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route
              path="therapist-management"
              element={<TherapistManagement />}
            />
            <Route
              path="category-management"
              element={<CategoryManagement />}
            />
            <Route
              path="appointment-management"
              element={<AppointmentManagement />}
            />
            <Route path="blog-management" element={<BlogManagement />} />
            <Route
              path="feedback-management"
              element={<FeedbackManagement />}
            />
          </Route>
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
