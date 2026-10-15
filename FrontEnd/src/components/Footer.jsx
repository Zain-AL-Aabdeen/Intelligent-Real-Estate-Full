import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      

      <div className="subscribe">
        <p>Subscribe to receive all the latest news and updates</p>
        <input type="email" placeholder="Enter your email Address" />
        <button>Subscribe</button>
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