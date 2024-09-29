import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
