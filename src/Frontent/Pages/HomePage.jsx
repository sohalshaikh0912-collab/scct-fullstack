import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoursceCard from '../components/CoursceCard';

const HomePage = () => {
  const [Loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data?.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
console.log(courses)
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
      <Navbar />

      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-8 overflow-hidden">
        
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none select-none flex items-center justify-end">
          <span className="text-[18rem] md:text-[30rem] font-black text-white/10 leading-none tracking-tighter -mr-8 md:-mr-16 uppercase">
            SCCT
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-center max-w-2xl w-full md:w-1/2">
          <span className="inline-block py-1 px-3 bg-white/10 text-gray-300 text-xs font-bold mb-6 border border-white/20 tracking-widest uppercase">
            Admissions Open 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1] uppercase">
            Shape Your <br /> <span className="italic">Future</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mt-6 font-light leading-relaxed">
            Empowering the next generation of tech leaders with industry-driven curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <NavLink to="/admissions">
              <button className="w-full sm:w-auto bg-white text-black font-black uppercase px-8 py-4 hover:bg-gray-200 transition-all">
                Apply Now
              </button>
            </NavLink>
            <NavLink to="/courses">
              <button className="w-full sm:w-auto bg-transparent border border-white/30 text-white font-black uppercase px-8 py-4 hover:bg-white hover:text-black transition-all">
                View Courses
              </button>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="w-full border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white">99%</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Placement Rate</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white">500+</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Students Placed</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white">50+</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Expert Faculty</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white">120+</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Partner Companies</p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="text-left border-b border-white/10 pb-6 mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Why Choose SCCT?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { title: "Project-Based", desc: "Build real-world portfolios, not just textbooks." },
            { title: "100% Placement", desc: "Mock interviews and exclusive hiring drives." },
            { title: "Expert Faculty", desc: "Learn from senior developers and data scientists." },
            { title: "Global Alumni", desc: "Join a network of 500+ professionals worldwide." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-[#111111] rounded-xl border border-white/10 hover:border-white/30 hover:scale-[1.02] transition-all duration-300">
              <h4 className="text-xl font-bold text-white uppercase tracking-wide mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20 border-b border-white/10">
        <div className="text-left border-b border-white/10 pb-6 mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Popular Programs</h2>
          <p className="text-gray-400 mt-2">Explore our most in-demand tech courses.</p>
        </div>

        {Loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-gray-800 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {courses?.slice(0,3).map((course) => (
              <CoursceCard
                key={course.id}
                title={course.title}
                discount={course.discount}
                startDate={course.startDate}
                image={course.image}
              />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 border-b border-white/10">
        <div className="text-left border-b border-white/10 pb-6 mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Admissions Process</h2>
          <p className="text-gray-400 mt-2">Start your journey at SCCT in 3 simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-white/10 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-start md:items-center bg-[#0a0a0a] p-6 rounded-xl border border-white/10">
            <span className="w-12 h-12 bg-white text-black flex items-center justify-center font-black text-xl mb-4 rounded-full">01</span>
            <h4 className="font-bold uppercase tracking-wide text-lg">Apply Online</h4>
            <p className="text-gray-400 text-sm text-left md:text-center mt-2">Fill out the admission form with your academic details and preferred course.</p>
          </div>
          <div className="relative z-10 flex flex-col items-start md:items-center bg-[#0a0a0a] p-6 rounded-xl border border-white/10">
            <span className="w-12 h-12 bg-white text-black flex items-center justify-center font-black text-xl mb-4 rounded-full">02</span>
            <h4 className="font-bold uppercase tracking-wide text-lg">Review & Interview</h4>
            <p className="text-gray-400 text-sm text-left md:text-center mt-2">Our faculty board will review your application and schedule a counseling session.</p>
          </div>
          <div className="relative z-10 flex flex-col items-start md:items-center bg-[#0a0a0a] p-6 rounded-xl border border-white/10">
            <span className="w-12 h-12 bg-white text-black flex items-center justify-center font-black text-xl mb-4 rounded-full">03</span>
            <h4 className="font-bold uppercase tracking-wide text-lg">Secure Your Seat</h4>
            <p className="text-gray-400 text-sm text-left md:text-center mt-2">Complete the enrollment formalities and secure your seat for the upcoming batch.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-left border-b border-white/10 pb-6 mb-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Alumni Voices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-black rounded-xl border border-white/10 hover:border-white/30 transition-colors">
              <p className="text-gray-300 mb-4 italic">"SCCT's AI course changed my career. I landed a role at a top AI startup just 2 weeks after graduation!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">RK</div>
                <div>
                  <h5 className="font-semibold text-sm text-white">Rahul Kumar</h5>
                  <p className="text-xs text-gray-500">AI Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-black rounded-xl border border-white/10 hover:border-white/30 transition-colors">
              <p className="text-gray-300 mb-4 italic">"The Web Development program was hands-on. The placement team was with me every step of the way."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">PS</div>
                <div>
                  <h5 className="font-semibold text-sm text-white">Priya Sharma</h5>
                  <p className="text-xs text-gray-500">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="bg-white text-black py-24 px-6 md:px-16 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
          Ready to Build <br /> Your Future?
        </h2>
        <p className="text-lg md:text-xl text-gray-800 max-w-xl mx-auto mb-8 font-light">
          Join SCCT today and become part of a community that builds world-class tech professionals.
        </p>
        <NavLink to="/admissions">
          <button className="bg-black text-white font-black uppercase tracking-widest px-12 py-4 hover:bg-gray-800 transition-all shadow-lg">
            Apply Now
          </button>
        </NavLink>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;