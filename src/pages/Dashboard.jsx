import MyBlogList from "../components/dashboard/MyBlogList";
import PatientList from "../components/dashboard/PatientList";
import UserCard from "../components/dashboard/UserCard";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-center align-center">
      <UserCard />
      <PatientList />
      <MyBlogList />
    </div>
  );
};

export default Dashboard;
