import { selectAuth } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  if (user?.role === "administrateur") {
    navigate("/dashboard/admin");
  } else if (user?.role === "enseignant") {
    navigate("/dashboard/enseignant");
  } else if (user?.role === "etudiant") {
    navigate("/dashboard/etudiant");
  }

  navigate("/dashboard/parent");

  return null;
};

export default Dashboard;
