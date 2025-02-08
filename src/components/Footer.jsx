import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Short Description */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">FleetEase</h2>
          <p className="text-gray-300 text-sm mt-2">
            Your trusted partner for efficient fleet management.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/features" className="hover:underline">
            Features
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="#" className="text-gray-300 hover:text-white text-xl">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-xl">
            <FaLinkedin />
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-xl">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} FleetEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
