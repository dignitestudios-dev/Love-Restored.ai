import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate from react-router-dom
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import axios from "../../axios"; // Import axios instance
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toaster"; // Import your toaster function
import { login } from "../../assets/export";

const DummyLogin = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // State for managing form fields and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [emailError, setEmailError] = useState(""); // Email error state
  const [passwordError, setPasswordError] = useState(""); // Password error state

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleForgotClick = () => {
    // Navigate to the forgot password page
    navigate("/auth/forgot-password");
  };

  const handleLoginClick = () => { 
    navigate("/app/dashboard");
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      ErrorToast("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/admin/login", { email, password });

      if (response.data.success) {
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", JSON.stringify(response.data.data.admin));
        navigate("/app/dashboard");
      } else {
        ErrorToast(response.data.message || "An unknown error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-full background-gradient border border-gray-700 flex flex-col items-center p-6 backdrop-blur-lg md:w-[630px] md:h-[636px] rounded-[19px] bg-cover bg-center"
    >
      <img
        src={Logo}
        alt="orange_logo"
        className="w-full h-full object-cover opacity-80 absolute top-0 left-0 z-[-1]"
      />
      <div className="w-auto flex flex-col mt-72 justify-center items-center">
        <h2 className="text-[32px] leading-[48px] text-white mb-4 mt-6 font-extrabold">Welcome Back!</h2>
      </div>

      <form className="w-full md:w-[393px] flex flex-col justify-start items-start gap-4">
        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <input
            type="text"
            id="email"
            name="email"
            className="w-full h-[49px] text-white border-2 bg-transparent outline-none backdrop-blur-3xl rounded-full placeholder:text-white px-3 text-[16px] font-normal leading-[20.4px] border-white/50"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-transparent backdrop-blur-3xl items-start w-full relative border-2 border-white/50 rounded-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-white outline-none text-white px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="w-full -mt-1 flex items-center justify-end">
          <button
            type="button"
            onClick={handleForgotClick}
            className="text-[#DAB462] hover:no-underline hover:text-yellow-200 text-[16px] font-normal leading-[20.4px]"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleLoginClick}
          className="w-full h-[49px] rounded-full button-bg text-white flex gap-2 items-center justify-center text-md font-medium"
          disabled={loading}
        >
          <span>Log In</span>
          {loading && <FiLoader className="animate-spin text-lg" />}
        </button>
      </form>
    </div>
  );
};

export default DummyLogin;
