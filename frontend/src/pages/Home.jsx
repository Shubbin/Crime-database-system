import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaCamera, FaUserCheck } from "react-icons/fa";

const Home = () => {
  return (
    <main className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-6 md:px-16 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Know Who You Hire with <span className="text-accent">Crimewatch</span>
            </h1>
            <p className="text-lg mb-6">
              Verify the background of individuals before hiring them. Whether you’re a business, homeowner, or citizen, stay informed about criminal records or suspicious history.
            </p>
            <Link
              to="/signup"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
          <img
            src="https://img.freepik.com/premium-vector/justice-shield-emblem_25030-45727.jpg"
            alt="Justice Shield"
            className="rounded-xl shadow-lg w-full max-h-[350px] object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What You Can Do on Crimewatch
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-secondary rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaUserCheck className="text-accent text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Background Checks</h3>
            <img
              src="https://img.freepik.com/free-photo/ai-cybersecurity-virus-protection-machine-learning_53876-129779.jpg"
              alt="Background Check"
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <p>
              Search public records to see if someone has a criminal history before hiring or engaging with them.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-secondary rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaCamera className="text-accent text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Anonymous Tips</h3>
            <img
              src="https://img.freepik.com/premium-photo/hacker-holding-smartphone_23-2147985361.jpg?ga=GA1.1.649717633.1747184861&semt=ais_hybrid&w=740"
              alt="Tip-off"
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <p>
              Submit information about suspicious people or activity — all without revealing your identity.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-secondary rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaLock className="text-accent text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Secure Record Lookup</h3>
            <img
              src="https://img.freepik.com/free-photo/criminal-records-insurance-form-graphic-concept_53876-125114.jpg?ga=GA1.1.649717633.1747184861&semt=ais_hybrid&w=740"
              alt="Secure Info"
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <p>
              View reports and criminal records safely with end-to-end encryption and total privacy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Be Informed, Be Safe</h2>
        <p className="mb-6">
          Get access to background checks, report past crimes, and help your community stay alert.
        </p>
        <Link
          to="/signup"
          className="bg-white text-accent px-6 py-3 font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          Join Now
        </Link>
      </section>
    </main>
  );
};

export default Home;
