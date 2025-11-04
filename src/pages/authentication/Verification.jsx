import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import Cookies from "js-cookie";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailValue = location?.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next field
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // const getOtpValue = () => {
  //   return parseInt(otp.join(""), 10);
  // };

  const handleVerify = async () => {
    // Navigate to reset password page

    const isOtpFilled = otp.every((digit) => digit !== "");

    if (!isOtpFilled) {
      ErrorToast("Please enter all OTP digits");
      return;
    }

    setLoading(true);
    try {
      let obj = {
        email: emailValue,
        otp: otp.join(""),
      };
      const response = await axios.post("/admin/auth/verify-reset-otp", obj);

      if (response.status === 200) {
        // login(response?.data);
        SuccessToast(response?.data?.message);
        Cookies.set("token", response?.data?.data?.token);
        navigate("/auth/reset-password", {
          state: { email: emailValue },
        });
      }
    } catch (err) {
      setOtp(Array(6).fill(""));
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: emailValue };

      const response = await axios.post("/admin/auth/send-reset-otp", obj);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setResendLoading(false);
        setOtp(Array(6).fill(""));
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full h-full background-gradient border border-gray-700 flex flex-col items-center p-6 backdrop-blur-lg md:w-[630px] md:h-[636px] rounded-[19px] bg-cover bg-center">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/auth/login")}
        className="absolute top-6 left-6 text-white text-[16px] font-normal z-10"
      >
        <IoIosArrowBack className="inline mr-2 text-3xl button-bg rounded-full p-1" />
      </button>

      <div className="w-auto flex flex-col mt-24 justify-center items-center">
        <h2 className="text-[32px] leading-[48px] text-white font-extrabold">
          Verification
        </h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-white/80">
          Enter the OTP code sent to your email
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-3 mt-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-[70px] h-[70px] text-white text-[24px] font-semibold text-center border-2 border-white/50 rounded-full bg-transparent placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#0893F0]"
            placeholder="_"
          />
        ))}
      </div>

      {/* Resend link */}
      <p className="text-white/80 mt-6 text-[14px]">
        Didn’t receive OTP code?{" "}
        <button
          onClick={handleResendOtp}
          className="text-[#0893F0] font-medium cursor-pointer"
        >
          {resendLoading ? "Resending..." : "Resend now"}
        </button>
      </p>

      {/* Verify Button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleVerify}
        className="w-full max-w-sm mt-8 h-[49px] rounded-full button-bg text-white flex gap-2 items-center justify-center text-md font-medium"
      >
        <span>Verify</span>
        {loading && <FiLoader className="animate-spin text-lg" />}
      </button>
    </div>
  );
};

export default Verification;
