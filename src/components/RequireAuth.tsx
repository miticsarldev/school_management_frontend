import { selectAuth } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;
