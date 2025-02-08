import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-blue-600 text-white py-20 px-6 md:px-12 flex flex-col items-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome to FleetEase
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-90">
          Effortlessly manage your fleet with real-time tracking, intelligent analytics, and seamless automation.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
