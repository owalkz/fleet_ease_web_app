import { FaShieldAlt, FaUsers, FaRocket, FaHandshake } from "react-icons/fa";

const reasons = [
  {
    icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
    title: "Secure & Reliable",
    description: "Our platform ensures your data and fleet are always protected with top security standards.",
  },
  {
    icon: <FaUsers className="text-blue-600 text-4xl mb-4" />,
    title: "User-Friendly Interface",
    description: "Easily navigate and manage your fleet with our intuitive and modern design.",
  },
  {
    icon: <FaRocket className="text-blue-600 text-4xl mb-4" />,
    title: "Performance-Driven",
    description: "Optimize routes, reduce costs, and enhance efficiency with AI-powered insights.",
  },
  {
    icon: <FaHandshake className="text-blue-600 text-4xl mb-4" />,
    title: "Exceptional Support",
    description: "Our team is available to help you 24/7 with any inquiries or technical issues.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">Why Choose FleetEase?</h2>
        <p className="text-gray-700 mb-10 text-lg">
          FleetEase is designed to make fleet management seamless, secure, and highly efficient.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              {reason.icon}
              <h3 className="text-xl font-semibold text-gray-800">{reason.title}</h3>
              <p className="text-gray-600 mt-2">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
