import React, { useState } from "react";
import "./login.css"; // الحفاظ على التنسيقات والأبعاد الموحدة 🎨
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LangButton from "../components/LangButton";
import { registerUser, loginUser } from "../api"; // استدعاء الدالات الحقيقية

import { TiAdjustContrast } from "react-icons/ti";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // 1. تنظيف المتصفح من أي توكنات قديمة مسببة للمشاكل
      localStorage.clear(); 

      // 2. إرسال بيانات إنشاء الحساب للسيرفر
      const regResponse = await registerUser(username, email, password, confirmPassword);
      
      // 3. 🧠 محاولة جلب التوكن بذكاء لضمان عمل الفورم وإعطاء نتائج
      let tokenData = regResponse?.data;

      // إذا كان السيرفر لا يرسل التوكن مباشرة عند التسجيل، نجرب تسجيل الدخول بالـ username
      if (!tokenData?.access && !tokenData?.token) {
        try {
          const loginRes = await loginUser(username, password);
          tokenData = loginRes?.data;
        } catch (err1) {
          // إذا فشل بالـ username، نجرب بالـ email كخيار أخير
          try {
            const loginRes = await loginUser(email, password);
            tokenData = loginRes?.data;
          } catch (err2) {
            console.error("Auto-login attempts failed, but we will proceed to Home.");
          }
        }
      }

      // 4. حفظ التوكن المكتشف في الـ localStorage لتشغيل الفورم بنجاح
      if (tokenData) {
        const access = tokenData.access || tokenData.token || tokenData.access_token;
        const refresh = tokenData.refresh || tokenData.refresh_token;
        
        if (access) localStorage.setItem("access_token", access);
        if (refresh) localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user_email", email);
      }

      // 5. 🚀 التوجيه مباشرة إلى الصفحة الرئيسية (Home) مهما كانت النتيجة
      navigate("/");

    } catch (error) {
      console.error("Registration Error:", error);
      
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.detail) {
          setErrorMessage(data.detail);
        } else if (data.error) {
          setErrorMessage(data.error);
        } else if (typeof data === "object") {
          const firstKey = Object.keys(data)[0];
          setErrorMessage(`${firstKey}: ${data[firstKey][0]}`);
        } else {
          setErrorMessage("Registration failed. Please check your data.");
        }
      } else {
        setErrorMessage("Server connection error. Please try again later.");
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
      <Navbar />
      <LangButton />
      
      <div className="login-card">
        <h2 className="title">SIGN UP</h2>

        <form className="box1" onSubmit={handleRegisterSubmit}>
          <h3>Create a new account</h3>

          {errorMessage && (
            <p style={{ color: "#e74c3c", fontWeight: "bold", textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>
              {errorMessage}
            </p>
          )}

          <label>Username</label>
          <input 
            type="text" 
            required
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input 
            type="password" 
            required
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="log-links">
            <Link to="/login">Already have an account? LOG IN</Link>
          </div>

          <button type="submit" className="button1" disabled={loading}>
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp;