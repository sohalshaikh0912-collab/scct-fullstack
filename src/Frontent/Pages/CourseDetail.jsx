import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseDetail = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data.data); 
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Loading...</div>;
  if (!course) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Course not found!</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 md:px-16 py-20">
        <NavLink to="/courses" className="inline-block text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Courses
        </NavLink>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white text-black font-bold text-sm px-3 py-1 rounded-md">
              {course.discount} OFF
            </div>
          </div>

          
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-black uppercase tracking-tight mb-4">{course.title}</h1>
            <div className="w-16 h-1 bg-white mb-6"></div>
            
            <p className="text-gray-400 text-lg mb-6">
              Dive deep into the world of {course.title} with our industry-driven curriculum. 
              Learn from experts, build real-world projects, and launch your career.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Starts:</span>
                <span>{course.startDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Discount:</span>
                <span className="text-green-400 font-bold">{course.discount}</span>
              </div>
            </div>

            <NavLink to="/admissions" className="w-full md:w-auto">
              <button className="w-full bg-white text-black font-black uppercase tracking-widest py-4 px-8 rounded hover:bg-gray-200 transition-all">
                Apply Now
              </button>
            </NavLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;