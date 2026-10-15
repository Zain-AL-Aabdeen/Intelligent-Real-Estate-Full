import { useLocation, useNavigate } from "react-router-dom";

function LangButtona() {

  const location = useLocation();
  const navigate = useNavigate();

  const isArabic = location.pathname.startsWith("/ar");

  const toggleLanguage = () => {

    if (isArabic) {

      navigate(location.pathname.replace("/ar", "/")||"/");
      

    } else {

      navigate("/ar" + location.pathname);
      

    }
  };

  return (
    
      <button onClick={toggleLanguage} id="aButton">
        {isArabic ? "English" : "العربية"}
      </button>
    
  );
}

export default LangButtona;