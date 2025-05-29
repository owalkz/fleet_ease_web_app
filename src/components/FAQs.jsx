import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What is FleetEase?",
    answer:
      "FleetEase is a fleet management platform that helps businesses track, analyze, and optimize their vehicle operations in real-time.",
  },
  {
    question: "How does real-time tracking work?",
    answer:
      "FleetEase uses GPS and telematics to provide real-time updates on vehicle locations, routes, and performance metrics.",
  },
  {
    question: "Can I use FleetEase on mobile devices?",
    answer:
      "Yes, FleetEase is mobile-friendly and accessible from any device with a modern browser.",
  },
  {
    question: "Is my data secure on FleetEase?",
    answer:
      "Absolutely. We use industry-standard encryption and best practices to ensure your data remains secure and private.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-700 mb-10 text-lg">
          Have questions? We've got answers.
        </p>

        <div className="space-y-4 text-left">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-blue-700 hover:bg-blue-50 focus:outline-none"
              >
                {faq.question}
                {activeIndex === index ? (
                  <FaChevronUp className="text-blue-600" />
                ) : (
                  <FaChevronDown className="text-blue-600" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
