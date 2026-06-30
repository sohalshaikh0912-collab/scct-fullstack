import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlacementsPage = () => {
  const companies = ["Google", "Amazon", "Microsoft", "TCS", "Infosys", "Accenture", "Adobe", "Flipkart"];
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-16 py-16">
        
        
        <div className="text-left border-b border-white/10 pb-8 mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            Placements
          </h1>
          <p className="text-gray-400 max-w-xl mt-4 text-lg">Our students are working at the world's most innovative companies.</p>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mb-16">
          <div className="text-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <h3 className="text-4xl font-black text-white">₹32 LPA</h3>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest mt-1">Highest Package</p>
          </div>
          <div className="text-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <h3 className="text-4xl font-black text-white">99%</h3>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest mt-1">Placement Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-black text-white">120+</h3>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest mt-1">Recruiting Partners</p>
          </div>
        </div>

    
        <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Our Top Recruiters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {companies.map((comp, idx) => (
            <div key={idx} className="bg-[#111111] border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-colors">
              <span className="text-white font-bold text-lg tracking-widest uppercase">{comp}</span>
            </div>
          ))}
        </div>


        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-bold uppercase mb-4">Alumni Spotlight</h3>
          <p className="text-gray-300 text-lg italic mb-6">"SCCT's placement cell was phenomenal. They didn't just prepare me for interviews; they helped me find the perfect role at Amazon. I owe my career to the faculty here."</p>
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">AK</div>
            <div className="text-left">
              <p className="text-sm font-bold">Ananya Krishnan</p>
              <p className="text-xs text-gray-500">Software Engineer at Amazon</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlacementsPage;