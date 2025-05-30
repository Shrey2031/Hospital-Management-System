// src/pages/LandingPage.jsx
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

const LandingPages = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <>
      <Header/>
       <Hero/>
    </>
  
  );
};

export default LandingPages;
