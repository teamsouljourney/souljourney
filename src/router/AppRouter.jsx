import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRouter />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
