import HeroSection from "./Hero";
import ServicesSection from "./Services";
import PortfolioSection from "./Portfolio";
import TestimonialSection from "./Terstimonials";
import TechStackSection from "./TechStack";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TechStackSection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
