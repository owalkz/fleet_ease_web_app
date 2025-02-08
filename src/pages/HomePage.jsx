import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigator = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
