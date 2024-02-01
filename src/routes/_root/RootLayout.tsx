import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex justify-center items-center">
      Root layout
      <Outlet />
    </div>
  );
};

export default RootLayout;
