import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Contact from "../pages/Contact";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Area */}
        <Route path="/contact" element={<Contact />} />

        {/* Private Area */}
        <Route path="/" element={<PrivateRouter />}>
          {/* Privates Routes */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
