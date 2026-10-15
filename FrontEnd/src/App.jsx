import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/contact";
import HomeAr from "./ar/Home";

import "./App.css";
import LangButton from "./components/LangButton";
import LangButtona from "./components/LangButtona";
import Model from "./pages/login";
import SignIn from "./pages/signup";
import ModelAr from "./ar/login";
import SignInAr from "./ar/signup";
import ContactAr from "./ar/contact";
import Form from "./pages/form";
import FormAr from "./ar/form";
function App() {
  return (
    

      <Routes>

        
        <Route path="/" element={<Home />} />

        
        <Route path="/ar" element={<HomeAr />} />

        
        <Route path="/contact" element={<Contact />} />
         <Route path="/login" element={<Model/>} />
         <Route path="/signup" element={<SignIn/>} />
         <Route path="/ar/login" element={<ModelAr/>} />
          <Route path="/ar/signup" element={<SignInAr/>} />
          <Route path="/ar/contact" element={<ContactAr />} />
          <Route path="/form" element={<Form/>}/>
          <Route path="/ar/form" element={<FormAr/>}/>
      </Routes>

    
  );
}

export default App;