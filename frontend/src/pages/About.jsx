import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      {/* Header Image */}
      <img
        src="https://img.freepik.com/free-photo/handsome-dark-skinned-employee-wearing-checkered-shirt-holding-his-hands-his-eyes-as-if-looking-through-binoculars-glasses-smiling-happily-agains-wall_273609-6389.jpg"
        alt="Teamwork and trust"
        className="w-full h-64 md:h-96 object-cover mb-8 rounded-lg shadow-xl"
      />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">About Crimewatch</h2>

      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 text-center px-4">
        Crimewatch is a cutting-edge platform designed to help law enforcement agencies, security professionals, and the general public track and report criminal activity. Our mission is to ensure the safety and security of communities through real-time updates and detailed reports.
      </p>

      {/* Section Component */}
      {[
        {
          title: 'How It Works',
          image: 'https://img.freepik.com/free-photo/facial-recognition-technology_23-2149190625.jpg',
          text: 'Users can report criminals, view criminal records, and stay informed about incidents happening in their area. Crimewatch empowers law enforcement agencies by enabling them to manage and access criminal records, ensuring timely responses.',
        },
        {
          title: 'Our Vision',
          image: 'https://img.freepik.com/free-photo/high-angle-view-security-cameras-arrangement_23-2149271705.jpg',
          text: 'We believe in creating a safer society where law enforcement and citizens work together. Through transparency and collaboration, we aim to provide tools that enhance community safety and trust in law enforcement.',
        },
        {
          title: 'Our Mission',
          image: 'https://img.freepik.com/free-photo/police-officer-checking-documents_23-2149307244.jpg',
          text: 'Our mission is to protect the public by providing reliable, timely, and accessible information that empowers individuals and communities to stay informed and safe.',
        },
        {
          title: 'Our Services',
          image: 'https://img.freepik.com/free-photo/safe-city-night-using-intelligent-surveillance_53876-105089.jpg',
          text: '',
          list: [
            'Real-time criminal reporting and tracking',
            'Public access to crime-related updates',
            'Tools for law enforcement to manage criminal data',
            'Crime prevention resources and tips',
          ],
        },
      ].map((section, index) => (
        <div
          key={index}
          className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 mb-12`}
        >
          <img
            src={section.image}
            alt={section.title}
            className="w-full lg:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-800">{section.title}</h3>
            {section.text && (
              <p className="text-gray-700 text-base sm:text-lg">{section.text}</p>
            )}
            {section.list && (
              <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mt-2">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
