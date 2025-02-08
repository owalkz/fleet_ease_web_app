import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <FaExclamationTriangle className="text-blue-500 text-6xl mb-4" />
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Oops!</h1>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
