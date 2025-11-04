import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AppContext } from "../context/AppContext";

const AuthLayout = () => {
  const { token } = useContext(AppContext);
  if (token) {
    return <Navigate to="/app/dashboard" replace />;
  }
  return (
    <div
      className="relative w-screen min-h-screen flex justify-center items-center p-3 md:py-8 background-gradient"
      // style={{
      //   backgroundImage: `url(${loginbg})`, // Background image
      //   backgroundSize: "cover", // Ensure the image covers the full div
      //   backgroundPosition: "center", // Center t he image
      // }}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
