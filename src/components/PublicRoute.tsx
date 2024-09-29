import { selectAuth, setCredentials } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "@/types";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoute = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(
        setCredentials({
          user: JSON.parse(user) as User,
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch]);

  // If authenticated, redirect to the dashboard
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicOnlyRoute;
