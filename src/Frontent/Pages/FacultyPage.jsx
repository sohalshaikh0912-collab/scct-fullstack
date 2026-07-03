import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const facultyData = [
  { name: "Dr. Arjun Mehta", role: "Dean of AI Research", desc: "15+ years experience in Machine Learning and Neural Networks." },
  { name: "Prof. Sarah Khan", role: "Senior Web Developer", desc: "Specializes in full-stack architecture and cloud deployment." },
  { name: "Mr. Vikram Raj", role: "Cybersecurity Expert", desc: "Certified ethical hacker with 10+ years in threat analysis." },
  { name: "Ms. Priya Singh", role: "Data Scientist", desc: "Expert in Big Data, Python, and predictive analytics." },
  { name: "Prof. James Cole", role: "UI/UX Design Lead", desc: "Award-winning interface designer with global brand experience." },
  { name: "Dr. Rohan Bose", role: "Placement Officer", desc: "Connects students with Fortune 500 companies globally." },
];

const FacultyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-16 py-16">
        <div className="text-left border-b border-white/10 pb-8 mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            Our <span className="italic text-gray-400">Faculty</span>
          </h1>
          <p className="text-gray-400 max-w-xl mt-4 text-lg">Learn from the brightest minds in the tech industry.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyData.map((f, idx) => (
            <div key={idx} className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
              
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-black text-2xl mb-4">
                {f.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-white">{f.name}</h3>
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3">{f.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyPage;