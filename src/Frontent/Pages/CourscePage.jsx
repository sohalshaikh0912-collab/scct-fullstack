import React, { useEffect, useState } from 'react';
import CoursceCard from '../components/CoursceCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourscePage = () => {
  const [Loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        if(data.success){
        setCourse(data.data);}
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      
      <header className="max-w-7xl mx-auto w-full px-6 md:px-16 pt-20 pb-12 border-b border-white/10 mb-12">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-2">
          Our Courses
        </h1>
        <p className="text-gray-400 max-w-xl text-lg">
          Explore our cutting-edge curriculum and take the next step in your career.
        </p>
      </header>

    
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-20 w-full flex-grow">
    
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {course?.map((coursesItem) => (
            <div key={coursesItem.id} className="break-inside-avoid">
              <CoursceCard
  key={coursesItem._id}               
  id={coursesItem._id}               
  title={coursesItem.title}
  discount={coursesItem.discount}
  startDate={coursesItem.startDate}
  image={coursesItem.image}
/>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourscePage;