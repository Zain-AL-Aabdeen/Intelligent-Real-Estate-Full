import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LangButton from "../components/LangButton";
import { loginUser } from "../api"; // استدعاء الدالة من ملف الـ API

import { TiAdjustContrast } from "react-icons/ti";

function Model() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // تمرير البيانات بشكل منفصل تماماً كما يتوقع ملف الـ api.js الخاص بكِ ✅
      await loginUser(email, password);
      
      // إذا نجحت العملية ولم يرمِ السيرفر أي خطأ، نتوجه فوراً للرئيسية الإنجليزية
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Incorrect email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
const [lightMode, setLightMode] = useState(false);
    const changeTheme = () => {
      setLightMode(!lightMode);
    }
  return (
    <div className={lightMode ? "parentlight" : "parent"} dir="ltr">
      <button onClick={changeTheme} id="li">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <>
        <Navbar />
        <LangButton />
        
        <div className="login-card">
          <h2 className="title">LOG IN</h2>

          <form className="box1" onSubmit={handleLoginSubmit}>
            <h3>Welcome back</h3>

            {errorMessage && (
              <p style={{ color: "#e74c3c", fontWeight: "bold", textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}

            <label>Email</label>
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input 
              type="password" 
              required
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="log-links">
              <Link to="/signup">SIGN UP</Link>
            </div>

            <button type="submit" className="button1" disabled={loading}>
              {loading ? "Checking..." : "LOGIN"}
            </button>
          </form>
        </div>

        <Footer />
      </>
    </div>
  );
}

export default Model;