import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { TiAdjustContrast } from "react-icons/ti";
import "./contact.css";
import LangButton from "../components/LangButton";
import axios from "axios"; 

function Contact() {
  const [lightMode, setLightMode] = useState(false);
  
  // State لتخزين بيانات الفورم
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // حالتي النجاح والخطأ لإظهار رسائل للمستخدم
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  // دالة لتحديث البيانات فور الكتابة في الحقول
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // دالة إرسال البيانات للباك إيند عند عمل Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من إعادة التحميل
    setStatusMessage("");

    // تحقق بسيط من تعبئة الحقول الأساسية
    if (!formData.name || !formData.email || !formData.message) {
      setIsSuccess(false);
      setStatusMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    try {
      // 🌟 تم تعديل الرابط هنا ليطابق مسار تطبيقكِ (auth/contact/) بدقة
      const response = await axios.post("http://127.0.0.1:8000/auth/contact/", formData);
      
      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        setStatusMessage("Your message has been sent successfully! 🎉");
        // تفريغ الحقول بعد النجاح
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage("Something went wrong. Please try again later.");
      console.error("Contact Error:", error);
    }
  };

  return (
    <div className={lightMode ? "contact-light" : "contact-page"}>
      <button onClick={changeTheme} id="li">
        <TiAdjustContrast className="light" />
      </button>
      
      <>
        <Navbar />
        <LangButton />
        
        <div className="contact-overlay">
          <div className="contact-left">
            <h1>
              Contact us if you would like to express your opinion or if you
              have encountered a problem.
            </h1>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              
              {/* إظهار رسالة النجاح أو الخطأ للمستخدم */}
              {statusMessage && (
                <div style={{ 
                  color: isSuccess ? "#2ecc71" : "#e74c3c", 
                  marginBottom: "15px", 
                  fontWeight: "bold" 
                }}>
                  {statusMessage}
                </div>
              )}

              <input 
                type="text" 
                name="name"
                placeholder="Your name" 
                value={formData.name}
                onChange={handleChange}
              />

              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
              />

              <input 
                type="text" 
                name="phone"
                placeholder="Your Number Phone" 
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea 
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        <Footer />
      </>
    </div>
  );
}

export default Contact;