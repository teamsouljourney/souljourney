import AppointmentList from "../components/dashboard/AppointmentList";
import MyBlogList from "../components/dashboard/MyBlogList";
import PatientList from "../components/dashboard/PatientList";
import UserCard from "../components/dashboard/UserCard";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-center items-start max-w-7xl mx-auto ">
      <UserCard />
      <PatientList />
      <AppointmentList />
      <MyBlogList />
    </div>
  );
};

export default Dashboard;
