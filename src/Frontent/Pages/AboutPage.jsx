import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-6 md:px-16 py-16 w-full">
        <div className="mb-16 pb-8 border-b border-white/10">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            The SCCT <br /> <span className="italic text-gray-400">Story</span>
          </h1>
        </div>

    
        <div className="relative pl-8 md:pl-12 border-l border-white/20 space-y-16 ml-2">
          <div className="relative">
            <div className="absolute -left-[33px] md:-left-[41px] top-0 w-4 h-4 bg-white rounded-full border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              To bridge the gap between academic theory and industry demands. We create skilled, job-ready professionals.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[33px] md:-left-[41px] top-0 w-4 h-4 bg-white rounded-full border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              To be a global leader in tech education, empowering students to innovate and drive change through technology.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[33px] md:-left-[41px] top-0 w-4 h-4 bg-white rounded-full border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-[#0a0a0a] border border-white/10">
                <span className="block font-bold text-white uppercase text-sm tracking-widest">Innovation</span>
                <span className="text-gray-400 text-sm">Forward-thinking solutions.</span>
              </div>
              <div className="p-5 bg-[#0a0a0a] border border-white/10">
                <span className="block font-bold text-white uppercase text-sm tracking-widest">Excellence</span>
                <span className="text-gray-400 text-sm">Highest professional standards.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;