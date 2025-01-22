import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Team from "../pages/Team";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Area */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        {/* Private Area */}
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<PrivateRouter />}>
          {/* Privates Routes */}   
        </Route>
        <Route path="/team" element={<Team/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
