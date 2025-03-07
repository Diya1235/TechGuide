import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import Timeline from "./Timeline";
import Ab1 from "./Ab1";

const AboutUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/send-email", formData);
      setStatus("Thankyou for your feedback 🎉");
      setIsModalOpen(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/a.jpg')" }}>
          <h1 className="text-white text-4xl font-bold">About Us</h1>
        </div>

        {/* Content Section */}
        <div className="container mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">Tech<span className="text-blue-500">Guide</span></h2>
          <p className="text-gray-600 mt-4">Find all the tools you need to streamline your workflow, increase efficiency, and enhance productivity.</p>

          {/* Statistics */}
          <div className="flex justify-center mt-8 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">27,882</h3>
              <p className="text-gray-500">Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">90%</h3>
              <p className="text-gray-500">Job Success</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">70,592</h3>
              <p className="text-gray-500">Visits</p>
            </div>
          </div>
        </div>

        {/* Goal Section */}
        <div className="bg-white py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">Our Goal</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Among the world's tech leaders, we strive to be the most user-friendly platform for workflow enhancement and efficiency.
          </p>
        </div>
        <Timeline/>
        <Ab1/>
        {/* Contact Us Form */}
        <div className="bg-gray-200 py-16 px-6">
          <h2 className="text-3xl font-bold text-center">Get in touch </h2>
          <form className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Your message" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Send Message</button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <p className="text-lg font-bold">{status}</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AboutUs;
