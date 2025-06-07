
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
const maskEmail = (email) => {
    if (!email || typeof email !== "string") return "";
    const [user, domain] = email.split("@");
    const maskedUser = user.length <= 2
      ? "*".repeat(user.length)
      : user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${maskedUser}@${domain}`;
  };


const OtpInput = ({length = 4, onOtpSubmit = () => {}}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-12 border rounded text-center"
          />
        );
      })}
    </div>
  );
};

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [otpExpiresIn, setOtpExpiresIn] = useState(600); // 10 min
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("userId");
  
  // Countdown for resend timer
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Countdown for OTP expiration
  useEffect(() => {
    if (otpExpiresIn === 0) return;
    const interval = setInterval(() => {
      setOtpExpiresIn((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpExpiresIn]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    const maskedLocal = localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
    return `${maskedLocal}@${domain}`;
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/verifyCode`,
        { userId, code: otp }
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        setError("Invalid or expired OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resendCode`, { userId });
      setResendTimer(60);
      setOtpExpiresIn(600); // reset expiry timer too
      setError("");
    } catch (err) {
      console.error("Resend failed", err);
      setError("Failed to resend code");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-2">Verify your email</h2>
        <p className="text-center text-gray-600 mb-2">
          Enter the 6-digit code sent to <br />
          <span className="font-medium">{maskEmail(email)}</span>
        </p>

        <div className="flex justify-center mb-4">
          <OtpInput length={6} onOtpSubmit={setOtp} />
        </div>

        {otpExpiresIn > 0 && (
          <p className="text-sm text-gray-500 text-center mb-4">
            OTP expires in <span className="font-medium">{formatTime(otpExpiresIn)}</span>
          </p>
        )}

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          type="button"
          onClick={handleOtpSubmit}
          className={`w-full py-2 rounded cursor-pointer text-white ${otpExpiresIn === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black"}`}
          disabled={otpExpiresIn === 0}
        >
          VERIFY
        </button>

        <button
          onClick={handleResend}
          disabled={resendTimer > 0}
          className="w-full text-sm text-blue-600 hover:underline mt-4 disabled:opacity-50"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;


