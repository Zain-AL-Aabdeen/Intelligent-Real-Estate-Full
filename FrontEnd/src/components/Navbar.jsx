import { Link } from "react-router-dom";
import groub from "../assets/Group.svg";
import vector from "../assets/Vector.svg";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from "react"; // 🌟 قمت بإضافة useEffect لقراءة التخزين

function Navbar() {
  const [showAccount, setShowAccount] = useState(false);
  const [email, setEmail] = useState(""); // 🌟 تحويل الإيميل إلى State ديناميكي بدلاً من القيمة الثابتة

  // 🌟 الكود السحري: يقرأ الإيميل الحقيقي من الـ localStorage فور ظهور النيفبار
  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <nav className="navbar">
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
        <p className="pa">Intellegente Real Estate</p>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
        <Link to="/form">Advicer</Link>
        <Link to="/contact">Contact</Link>
        
        {/* أيقونة الحساب الدائرية */}
        <Link id="ac" onClick={() => setShowAccount(!showAccount)}>
          <VscAccount />
        </Link>

        {showAccount && ( 
          <div className="ac-div"> 
            <h3>Your Account</h3>
            {/* 🌟 يعرض إيميل المستخدم الحقيقي، وإذا لم يكن مسجلاً يكتب له تفضل بتسجيل الدخول */}
            <div className="ac-name">
              {email || "Not Logged In"} 
            </div> 
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;