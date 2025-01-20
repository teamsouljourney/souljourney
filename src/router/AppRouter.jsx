import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Contact from "../pages/Contact";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Area */}
        <Route path="/contact" element={<Contact />} />

        {/* Private Area */}
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<PrivateRouter />}>
          {/* Privates Routes */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
