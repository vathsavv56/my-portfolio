import Navbar from "./Navbar";
import { Outlet } from "react-router";
import UmamiAnalytics from "./UmamiAnalytics";

const Main = () => {
  return (
    <div className="h-fit w-full">
      <UmamiAnalytics />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
