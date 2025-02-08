import { FaMapMarkedAlt, FaChartLine, FaTools, FaClock } from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt className="text-blue-600 text-4xl mb-4" />,
    title: "Real-Time Tracking",
    description: "Monitor your fleet in real-time with accurate GPS tracking and live updates.",
  },
  {
    icon: <FaChartLine className="text-blue-600 text-4xl mb-4" />,
    title: "Advanced Analytics",
    description: "Gain insights into fleet performance with AI-powered analytics and reports.",
  },
  {
    icon: <FaTools className="text-blue-600 text-4xl mb-4" />,
    title: "Automated Maintenance",
    description: "Keep your vehicles in top condition with automated maintenance scheduling.",
  },
  {
    icon: <FaClock className="text-blue-600 text-4xl mb-4" />,
    title: "Time Optimization",
    description: "Reduce delays and optimize routes for better efficiency and lower costs.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">Key Features</h2>
        <p className="text-gray-700 mb-10 text-lg">
          FleetEase provides powerful tools to help you manage your fleet efficiently and effectively.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
