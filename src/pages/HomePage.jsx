import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FAQs from "../components/FAQs";
import Features from "../components/Features";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import AIPlatformAssistant from "../components/AIPlatformAssistant";

const HomePage = () => {
  const navigator = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <Hero />
      <Features />
      <FAQs />
      <WhyChooseUs />
      <Footer />
      <AIPlatformAssistant />
    </div>
  );
};

export default HomePage;
