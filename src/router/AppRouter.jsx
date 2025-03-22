import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Blog = lazy(() => import("../pages/Blog"));
const Team = lazy(() => import("../pages/Team"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const Pricing = lazy(() => import("../pages/Pricing"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const TeamDetail = lazy(() => import("../components/team/TeamDetail"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const AuthSuccess = lazy(() => import("../pages/AuthSuccess"));
const AuthFail = lazy(() => import("../pages/AuthFail"));
const Account = lazy(() => import("../pages/Account"));
const Chat = lazy(() => import("../pages/Chat"));
const VideoCall = lazy(() => import("../pages/VideoCall"));
const WriteBlog = lazy(() => import("../pages/WriteBlog"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Appointment = lazy(() => import("../pages/Appointment"));
const NotFound = lazy(() => import("../pages/NotFound"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const TherapistManagement = lazy(() => import("../pages/TherapistManagement"));
const CategoryManagement = lazy(() => import("../pages/CategoryManagement"));
const AppointmentManagement = lazy(() =>
  import("../pages/AppointmentManagement")
);
const BlogManagement = lazy(() => import("../pages/BlogManagement"));
const FeedbackManagement = lazy(() => import("../pages/FeedbackManagement"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-seaGreen"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
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
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />

          {/* Private Area */}
          <Route path="" element={<PrivateRouter />}>
            {/* Privates Routes */}

            {/* User - Therapist Profile */}
            <Route path="/profile" element={<Sidebar />}>
              <Route index element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="chat" element={<Chat />} />
              <Route path="video-call" element={<VideoCall />} />
              <Route path="write-blog" element={<WriteBlog />} />
              <Route path="write-blog/:id" element={<WriteBlog />} />
            </Route>

            {/* Admin Panel */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/user-management" />}
            />
            <Route path="/admin" element={<Sidebar />}>
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
      </Suspense>
      <Footer />
    </Router>
  );
};

export default AppRouter;
