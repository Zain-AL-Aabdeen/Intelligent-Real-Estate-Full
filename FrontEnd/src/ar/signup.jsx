import React, { useState } from "react";
import "../pages/login.css"; // الحفاظ على التنسيقات والأبعاد الموحدة 🎨
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import NavbarArabic from "../components/NavbarArabic";
import FooterArabic from "../components/FooterArabic";
import LangButtona from "../components/LangButtona";
import { registerUser, loginUser } from "../api"; // استدعاء الدالات الحقيقية والنهائية

import { TiAdjustContrast } from "react-icons/ti";

function SignupArabic() {
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

    // تحقق محلي من تطابق كلمتي المرور بالعربي
    if (password !== confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين!");
      setLoading(false);
      return;
    }

    try {
      // 1. تنظيف المتصفح من أي توكنات قديمة مسببة للمشاكل
      localStorage.clear(); 

      // 2. إرسال بيانات إنشاء الحساب للسيرفر
      const regResponse = await registerUser(username, email, password, confirmPassword);
      
      // 3. 🧠 محاولة جلب التوكن بذكاء لضمان عمل الفورم العربي مباشرة
      let tokenData = regResponse?.data;

      if (!tokenData?.access && !tokenData?.token) {
        try {
          const loginRes = await loginUser(username, password);
          tokenData = loginRes?.data;
        } catch (err1) {
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

      // 5. 🚀 التوجيه مباشرة إلى الصفحة الرئيسية العربية بعد نجاح التسجيل
      navigate("/ar");

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
          setErrorMessage(`خطأ في حقل (${firstKey}): ${data[firstKey][0]}`);
        } else {
          setErrorMessage("فشل إنشاء الحساب. يرجى التحقق من البيانات المدخلة.");
        }
      } else {
        setErrorMessage("خطأ في الاتصال بالسيرفر. يرجى المحاولة لاحقاً.");
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
    <div className={lightMode ? "aparentlight" : "aparent"} dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <button onClick={changeTheme} id="ali">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <NavbarArabic />
      <LangButtona />
      
      <div className="alogin-card">
        <h2 className="title">إنشاء حساب</h2>

        <form className="box1" onSubmit={handleRegisterSubmit}>
          <h3>إنشاء حساب جديد</h3>

          {errorMessage && (
            <p style={{ color: "#e74c3c", fontWeight: "bold", textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>
              {errorMessage}
            </p>
          )}

          <label>اسم المستخدم</label>
          <input 
            type="text" 
            required
            placeholder="أدخل اسم المستخدم" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>البريد الإلكتروني</label>
          <input 
            type="email" 
            required
            placeholder="أدخل بريدك الإلكتروني" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>كلمة المرور</label>
          <input 
            type="password" 
            required
            placeholder="أدخل كلمة المرور" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>تأكيد كلمة المرور</label>
          <input 
            type="password" 
            required
            placeholder="أعد كتابة كلمة المرور" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="log-links">
            <Link to="../ar/login">لديك حساب بالفعل؟ تسجيل الدخول</Link>
          </div>

          <button type="submit" className="button1" disabled={loading}>
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>
      </div>

      <FooterArabic />
    </div>
  );
}

export default SignupArabic;