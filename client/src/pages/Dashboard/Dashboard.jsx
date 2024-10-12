
import { useAuth } from "../../context/Auth";


import StudentDashboard from "./StudentDashboard";
import ConvenorDashboard from "./ConvenorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();
  const navigate=useNavigate()
 useEffect(() => {
   if (auth?.user === null) {
     navigate("/");
   }
 });
 

  return (
    <div>
      {auth?.user?.role === "Admin" ? (
        <AdminDashboard />
      ) : auth?.user?.role === "Convenor" ? (
        <ConvenorDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
};

export default Dashboard;
