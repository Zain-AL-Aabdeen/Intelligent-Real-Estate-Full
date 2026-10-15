import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footera">
      
      <div className="subscribe">
         <p>قم بالاشتراك لتتلقى آخر الأخبار و التحديثات من موقعنا</p>
        
        <input type="email" placeholder="ادخل إيميلك" />
        <button>اشتراك</button>
       
      </div>
<div className="social">
        <Link to="https://www.facebook.com/yara.fatoom.5?mibextid=ZbWKwL"><FaFacebook /></Link>
        <Link to="https://www.instagram.com/yara.fatoom?igsh=bnMwZGFwbWYyYjA3"><FaInstagram /></Link>
        <Link to="https://twitter.com/yourprofile"><FaTwitter /></Link>
      </div>
      
    </footer>
  );
}

export default Footer;