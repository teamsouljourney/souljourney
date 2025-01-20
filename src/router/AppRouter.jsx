import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<PrivateRouter />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
