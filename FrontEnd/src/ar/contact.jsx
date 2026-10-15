import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useState } from "react";
import { TiAdjustContrast } from "react-icons/ti";
import NavbarArabic from "../components/NavbarArabic";
import FooterArabic from "../components/FooterArabic";
import LangButtona from "../components/LangButtona";
import axios from "axios"; // 🌟 استيراد الكائن المسؤول عن إرسال البيانات للباك إيند

import "../pages/contact.css";

function ContactAr() {
  const [lightMode, setLightMode] = useState(false);
  
  // 🌟 State لتخزين بيانات حقول الفورم
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // 🌟 حالتي النجاح والخطأ لإظهار رسائل تفاعلية للمستخدم
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  // 🌟 دالة لتحديث البيانات فور الكتابة في الحقول تلقائياً
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🌟 دالة إرسال البيانات إلى سيرفر Django عند عمل سابميت
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من التحديث التلقائي
    setStatusMessage("");

    // تحقق من تعبئة الحقول الأساسية المطلوبة
    if (!formData.name || !formData.email || !formData.message) {
      setIsSuccess(false);
      setStatusMessage("يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، الرسالة).");
      return;
    }

    try {
      // إرسال الطلب إلى نفس الرابط الشغال تماماً في الباك إيند عندكِ
      const response = await axios.post("http://127.0.0.1:8000/auth/contact/", formData);
      
      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        setStatusMessage("تم إرسال رسالتك بنجاح! 🎉");
        // تفريغ الحقول بعد نجاح الإرسال
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage("حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.");
      console.error("Contact Error:", error);
    }
  };

  return (
    <div className={lightMode ? "acontact-light" : "acontact-page"} dir="rtl" style={{fontFamily: 'Cairo, sans-serif'}}>
      <button onClick={changeTheme} id="ali">
        <TiAdjustContrast className="light"/> 
      </button>
      
      <>
        <NavbarArabic />
        <LangButtona />

        <div className="acontact-overlay">
          <div className="contact-left">
            <h1>
              تواصل معنا إذا كنت ترغب في إبداء رأيك أو إذا واجهتك أي مشكلة.
            </h1>

            <div className="social-icons">
              <a href="https://www.facebook.com/yara.fatoom.5?mibextid=ZbWKwL">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/yara.fatoom?igsh=bnMwZGFwbWYyYjA3">
                <FaInstagram />
              </a>

              <a href="https://twitter.com/yourprofile">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            {/* 🌟 ربط الفورم بدالة الإرسالhandleSubmit */}
            <form className="contact-form" onSubmit={handleSubmit}>
              
              {/* 🌟 مكان ظهور رسالة النجاح الخضراء أو الخطأ الحمراء للمستخدم */}
              {statusMessage && (
                <div style={{ 
                  color: isSuccess ? "#2ecc71" : "#e74c3c", 
                  marginBottom: "15px", 
                  fontWeight: "bold",
                  fontFamily: 'Cairo, sans-serif'
                }}>
                  {statusMessage}
                </div>
              )}

              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                style={{fontFamily: 'Cairo, sans-serif'}}
              />

              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                style={{fontFamily: 'Cairo, sans-serif'}}
              />

              <input
                type="text"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                style={{fontFamily: 'Cairo, sans-serif'}}
              />

              <textarea 
                name="message"
                placeholder="اكتب رسالتك هنا"
                value={formData.message}
                onChange={handleChange}
                style={{fontFamily: 'Cairo, sans-serif'}}
              ></textarea>

              <button type="submit" style={{fontFamily: 'Cairo, sans-serif'}}>
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>

        <FooterArabic />
      </>
    </div> 
  );
}

export default ContactAr;