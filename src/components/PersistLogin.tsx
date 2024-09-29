import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectAuth,
  setCredentials,
  useRefreshTokenMutation,
} from "@/redux/features/authSlice";

const PersistLogin: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAppSelector(selectAuth);
  const [refresh] = useRefreshTokenMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const result = await refresh().unwrap();
        dispatch(setCredentials({ ...result, isAuthenticated: true }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      setIsLoading(false);
    } else {
      verifyRefreshToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
