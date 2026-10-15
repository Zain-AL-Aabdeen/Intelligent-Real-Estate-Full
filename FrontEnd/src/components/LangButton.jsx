import { useLocation, useNavigate } from "react-router-dom";

function LangButton() {

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
    
      <button onClick={toggleLanguage} id="Button">
        {isArabic ? "English" : "arabic"}
      </button>
    
  );
}

export default LangButton;