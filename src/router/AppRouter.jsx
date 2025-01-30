import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
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
import AuthSuccess from "../pages/AuthSuccess";
import AuthFail from "../pages/AuthFail";

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
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="auth/success" element={<AuthSuccess />} />
        <Route path="auth/fail" element={<AuthFail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:id" element={<TeamDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

        {/* Private Area */}
        <Route path="/private" element={<PrivateRouter />}>
          {/* Privates Routes */}
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
