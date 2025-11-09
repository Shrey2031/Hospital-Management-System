// src/pages/LandingPage.jsx
import Header from "../components/Header";
import Banner from "../components/Banner"

import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FooterSection from "../components/Footer";

const LandingPages = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <>
      <Header/>
       <Hero/>
       <Banner/>
       <FooterSection/>
    </>
  
  );
};

export default LandingPages;
