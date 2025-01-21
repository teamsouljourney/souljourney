import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Area */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        {/* Private Area */}
        <Route path="/" element={<PrivateRouter />}>
          {/* Privates Routes */}
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
