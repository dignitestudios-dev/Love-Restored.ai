import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaBackward, FaFastBackward, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ErrorToast } from "../../components/global/Toaster"; // Import your toaster function
import axios from "../../axios"; // Import axios instance
import { Logo } from "../../assets/export";
import { IoIosArrowBack } from "react-icons/io";
import { FiLoader } from "react-icons/fi"; // Assuming you want to use the loader icon

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleResetPassword = async () => {
            navigate("/auth/verification");

    // setEmailError("");

    // if (!email) {
    //   ErrorToast("Please enter your email.");
    //   return;
    // }

    // if (!newPassword || newPassword.length < 8) {
    //   ErrorToast("Password must be at least 8 characters long.");
    //   return;
    // }

    // if (newPassword !== confirmPassword) {
    //   ErrorToast("Passwords do not match.");
    //   return;
    // }

    // setLoading(true);

    // try {
    //   const response = await axios.post("/auth/reset-password", { email, newPassword });
    //   if (response.data.success) {
    //     navigate("/auth/login");
    //   } else {
    //     ErrorToast(response.data.message || "Failed to reset password.");
    //   }
    // } catch (error) {
    //   console.error("Reset Password Error:", error);
    //   ErrorToast("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div
      className="w-full h-full background-gradient border border-gray-700 flex flex-col items-center p-6 backdrop-blur-lg md:w-[630px] md:h-[636px] rounded-[19px] bg-cover bg-center"
    >
      <div className="w-auto flex flex-col mt-64 justify-center items-center">
         <img
                src={Logo}
                alt="orange_logo"
                className="w-full h-full object-cover opacity-80 absolute top-0 left-0 z-[-1]"
              />
         <div className="w-full flex flex-col mt-16 justify-center items-center">
           <button
             type="button"
             onClick={() => navigate("/auth/login")}
             className="absolute top-6 left-6 text-white text-[16px] font-normal z-10"
           >
             <IoIosArrowBack className="inline mr-2 text-3xl button-bg rounded-md p-1 border border-gray-700" />
           </button>
           <h2 className="text-[32px] leading-[48px] text-white font-extrabold mt-2 mb-2">Forgot Password</h2>
         </div>
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

        {/* <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-transparent backdrop-blur-3xl items-start w-full relative border-2 border-white/50 rounded-full">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-white outline-none text-white px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-transparent backdrop-blur-3xl items-start w-full relative border-2 border-white/50 rounded-full">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-white outline-none text-white px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div> */}

        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full h-[49px] rounded-full button-bg text-white flex gap-2 items-center justify-center text-md font-medium"
          disabled={loading}
        >
          <span>Forgot Password</span>
          {loading && <FiLoader className="animate-spin text-lg" />}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
