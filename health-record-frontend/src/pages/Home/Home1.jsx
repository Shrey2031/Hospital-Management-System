import Navbar from "../../components/Layout/Navbar";
import HeroSection from "../../components/Layout/HeroSection";
import DashboardPreview from "../../components/Layout/DashboardPreview";
import RoleCards from "../../components/Layout/RoleCard";
import StatsSection from "../../components/Layout/StatsSection";
import TrustedCompanies from "../../components/Layout/TrustedCompanies";
import Footer from "../../components/Layout/Footer";

const Home = () => {
  return (
    <div className="bg-[#020B2D] text-white overflow-hidden">
      <Navbar />

  
        {/* <HeroSection /> */}
        <DashboardPreview />
      

      <RoleCards />
      <StatsSection />
      <TrustedCompanies />
      <Footer />
    </div>
  );
};

export default Home;