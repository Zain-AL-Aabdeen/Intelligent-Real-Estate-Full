import React, { useState } from "react"; // 1. استيراد useState لربط المدخلات
import "../pages/login.css";
import { Link, useNavigate } from "react-router-dom"; // 2. استيراد useNavigate للانتقال بعد نجاح الدخول
import "../App.css";
import NavbarArabic from "../components/NavbarArabic";
import FooterArabic from "../components/FooterArabic";
import LangButtona from "../components/LangButtona";
import { loginUser } from "../api"; // 3. استيراد دالة الباك إيند المركزية

import { TiAdjustContrast } from "react-icons/ti";

function ModelAr() {
  // تعريف متغيرات الواجهة لحفظ البيانات والخطأ
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // أداة التنقل بين الصفحات

  // دالة التعامل مع إرسال الفورم للباك إيند
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من إعادة التحميل
    setErrorMessage(""); // تصفير الأخطاء السابقة
    setLoading(true); // تفعيل وضع الانتظار

    try {
      // إرسال الإيميل والباسورد للديجانغو وحفظ التوكنات تلقائياً
      await loginUser(email, password);
      
      alert("تم تسجيل الدخول بنجاح! 🎉");
      
      // توجيه المستخدم لصفحة الفورم (عدلي المسار '/predict' للمسار الفعلي لصفحة التوقعات عندكِ)
      navigate("/ar/form");
      
    } catch (error) {
      // التقاط رسالة الخطأ القادمة من الديجانغو إن وجدت
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || "فشل تسجيل الدخول! تأكد من البيانات.");
      } else {
        setErrorMessage("لا يمكن الاتصال بالسيرفر، تأكد من تشغيل الديجانغو!");
      }
    } finally {
      setLoading(false); // إيقاف وضع الانتظار
    }
  };
  const [lightMode, setLightMode] = useState(false);
    const changeTheme = () => {
      setLightMode(!lightMode);
    }

  return (
    <div className={lightMode ? "aparentlight" : "aparent"} dir="rtl" style={{fontFamily: 'Cairo, sans-serif'}}>
      <button onClick={changeTheme} id="ali">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <>
        <NavbarArabic />
        <LangButtona />

        <div className="alogin-card">
          <h2 className="title">تسجيل الدخول</h2>

          {/* 4. حوّلنا الـ div إلى form ليدعم الإرسال الفعلي */}
          <form className="box1" onSubmit={handleLoginSubmit}>
            <h3>مرحباً بعودتك</h3>

            {/* 5. عرض رسالة الخطأ باللون الأحمر في حال الفشل */}
            {errorMessage && (
              <p style={{ color: "#e74c3c", fontSize: "14px", fontWeight: "bold", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}

            <label>البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // تحديث الإيميل فوراً عند الكتابة
              required 
            />

            <label>كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // تحديث الباسورد فوراً عند الكتابة
              required 
            />

            <div className="log-links">
              <Link to="/ar/signup">إنشاء حساب</Link>
            </div>

            {/* 6. زر الدخول يتغير شكله أثناء التحميل لمنع النقرات المتعددة */}
            <button type="submit" className="button1" disabled={loading}>
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>
        </div>

        <FooterArabic />
      </>
    </div>
  );
}

export default ModelAr;