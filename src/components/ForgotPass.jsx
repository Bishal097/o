import React, { useState } from "react";
import axios from "axios";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleSendOtp = async () => {
    const emaile = JSON.parse(localStorage.getItem('authToken'))?.email; // Get email dynamically

    try {
      const response = await axios.get('http://localhost:8080/api/auth/send-otp', {
        params: { email: emaile }, // Send email as a query parameter
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('OTP Send Response:', response.status, response.data);

      if (response.status === 200) {
        alert("OTP sent successfully!");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error.response || error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/verify-otp', {
        params: { otp }, // Send OTP as a query parameter
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setVerificationMessage("OTP verified successfully!");
      }
    } catch (error) {
      setVerificationMessage("OTP verification failed. Please try again.");
      console.error('Error verifying OTP:', error.response || error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/f/f6/Blood_donation_%28at_a_%22bloodmobile%22%29.JPG)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Forgot Password</h2>
        {!isOtpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSendOtp}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleVerifyOtp}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </button>
          </>
        )}
        {verificationMessage && (
          <p style={{ marginTop: "15px", textAlign: "center", color: "#333" }}>
            {verificationMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
