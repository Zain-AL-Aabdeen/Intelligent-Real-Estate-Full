import { Link } from "react-router-dom";
import groub from "../assets/Group.svg";
import vector from "../assets/Vector.svg";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from "react"; // 🌟 قمت بإضافة useEffect هنا أيضاً

function NavbarArabic() {
  const [showAccount, setShowAccount] = useState(false);
  const [email, setEmail] = useState(""); // 🌟 تحويل الإيميل إلى State ديناميكي

  // 🌟 يقرأ الإيميل الحقيقي المخزن فور تحميل الهيدر العربي
  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <nav className="navbara">
      <div 
        className="logo"
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.5em",
          color: "white",
          textDecoration: "none",
          gap : 20
        }}
      > 
        <img src={groub} alt="Logo" className="img" />
       <p className="pa"> المستشار العقاري الذكي</p>
      </div>
      
      <div className="alinks">
        <Link to="/ar"> الصفحة الرئيسية </Link>
        <Link to="/ar/login"> تسجيل الدخول </Link>
        <Link to="/ar/form"> الناصح </Link>
        <Link to="/ar/contact"> تواصل معنا </Link>
        
        {/* أيقونة الحساب الدائرية بالواجهة العربية */}
        <Link id="aac" onClick={() => setShowAccount(!showAccount)}>
          <VscAccount />
        </Link>
        
        {showAccount && ( 
          <div className="aac-div"> 
            <h3>حسابك الشخصي</h3>
            {/* 🌟 يعرض الإيميل الحقيقي، وفي حال عدم وجوده يظهر نص تنبيهي بالعربي */}
            <div className="ac-name">
              {email || "لم تقم بتسجيل الدخول بعد"} 
            </div> 
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarArabic;