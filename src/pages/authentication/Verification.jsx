import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { Logo } from "../../assets/export"; // Import your logo

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    // Navigate to reset password page 
    navigate("/auth/reset-password");
  };

  return (
    <div
      className="w-full h-full background-gradient border border-gray-700 flex flex-col items-center p-6 backdrop-blur-lg md:w-[630px] md:h-[636px] rounded-[19px] bg-cover bg-center"
    >
      
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
        <button className="text-[#0893F0] font-medium">Resend now</button>
      </p>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="w-full max-w-sm mt-8 h-[49px] rounded-full button-bg text-white flex gap-2 items-center justify-center text-md font-medium"
      >
        Verify
      </button>
    </div>
  );
};

export default Verification;
