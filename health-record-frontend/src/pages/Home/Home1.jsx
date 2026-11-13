// import Navbar from "../../components/Layout/Navbar";
// import HeroSection from "../../components/Layout/HeroSection";
// import DashboardPreview from "../../components/Layout/DashboardPreview";
// import RoleCards from "../../components/Layout/RoleCard";
// import StatsSection from "../../components/Layout/StatsSection";
// import TrustedCompanies from "../../components/Layout/TrustedCompanies";
// import Footer from "../../components/Layout/Footer";

// const Home = () => {
//   return (
//     <div className="bg-[#020B2D] text-white overflow-hidden">
//       <Navbar />

  
//         {/* <HeroSection /> */}
//         <DashboardPreview />
      

//       <RoleCards />
//       <StatsSection />
//       <TrustedCompanies />
//       <Footer />
//     </div>
//   );
// };

// export default Home;

// import Navbar from "../../components/Layout/Navbar";
// import DashboardPreview from "../../components/Layout/DashboardPreview";
// import Features from "../../components/Layout/Features";
// import RoleCards from "../../components/Layout/RoleCard";
// import HowItWorks from "../../components/Layout/HowItWorks";
// import StatsSection from "../../components/Layout/StatsSection";
// import TrustedCompanies from "../../components/Layout/TrustedCompanies";
// import Footer from "../../components/Layout/Footer";

// const Home = () => {
//   return (
//     <div className="bg-[#F7F6F2] text-[#12181B] scroll-smooth">
//       <Navbar />
//       <DashboardPreview />
//       <Features />
//       <RoleCards />
//       <HowItWorks />
//       <StatsSection />
//       <TrustedCompanies />
//       <Footer />
//     </div>
//   );
// };

// export default Home;

import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from '../../components/Layout/Navbar';
import Hero from '../../components/Layout/HeroSection';
import PlatformOverview from '../../components/Layout/DashboardPreview';
import Features from '../../components/Layout/Features';
import HowItWorks from '../../components/Layout/HowItWorks';
import DashboardShowcase from '../../components/Layout/Dashboardshowcase';
import SecuritySection from '../../components/Layout/Securitysection';
import HealthcareEcosystem from '../../components/Layout/Healthcareecosystem';
import Benefits from '../../components/Layout/Benifits';
import FinalCTA from '../../components/Layout/Finalcta';
import Footer from '../../components/Layout/Footer';

// Landing-page design tokens live in one place. These match the palette in
// your brief; if your dashboards use slightly different values, change them
// here and every landing section follows.
const tokens = {
  '--mc-teal': '#0D7169',
  '--mc-teal-deep': '#0A5650',
  '--mc-bg': '#F5F3ED',
  '--mc-ink': '#172A35',
  '--mc-sage': '#DCEBE6',
  '--mc-line': '#E2DDD0',
  '--mc-muted': '#5B6A72',
};

export default function LandingPage() {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'smooth';
    return () => { root.style.scrollBehavior = prev; };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div style={tokens} className="bg-[var(--mc-bg)] text-[var(--mc-ink)]">
        <Navbar />
        <main>
          <Hero />
          <PlatformOverview />
          <Features />
          <HowItWorks />
          <DashboardShowcase />
          <SecuritySection />
          <HealthcareEcosystem />
          <Benefits />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}