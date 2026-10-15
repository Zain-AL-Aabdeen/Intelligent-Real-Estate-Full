
import NavbarArabic from "../components/NavbarArabic";
import FooterArabic from "../components/FooterArabic";
import LangButtona from "../components/LangButtona";
import HeroArabic from "../components/HeroArabic";
import ServicesArabic from "../components/ServicesArabic";
import { useState } from "react";
import { TiAdjustContrast } from "react-icons/ti";


function HomeAr() {
  const [lightMode, setLightMode] = useState(false);
    const changeTheme = () => {
      setLightMode(!lightMode);
    }
  return (
    <div className={lightMode ? "bgalight" : "bga"} style={{fontFamily: 'Cairo, sans-serif'}}>
      <button onClick={changeTheme} id="ali">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <>
      <NavbarArabic />
      <HeroArabic />
      <LangButtona />
      <ServicesArabic />
      
      <FooterArabic />
    </></div>
  );
}
export default HomeAr;