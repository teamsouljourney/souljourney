import MyBlogList from "../components/dashboard/MyBlogList";
import PatientList from "../components/dashboard/PatientList";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap">
      <PatientList />
      <MyBlogList />
    </div>
  );
};

export default Dashboard;
