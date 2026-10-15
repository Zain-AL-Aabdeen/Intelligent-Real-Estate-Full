import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { TiAdjustContrast } from "react-icons/ti";
import Hero from "../components/Hero";
import Services from "../components/Services";
import LangButton from "../components/LangButton";
import "../App.css";


function Home() {
  const [lightMode, setLightMode] = useState(false);
    const changeTheme = () => {
      setLightMode(!lightMode);
    }

  return (
   <div className={lightMode ? "bglight" : "bg"}>
    <button onClick={changeTheme} id="li">
                    <TiAdjustContrast className="light"/> 
                  </button>
   <>
      <Navbar />
      
      
      <Hero />
      <LangButton/>
      <Services />
      <Footer />
    </></div>
  );
}

export default Home;