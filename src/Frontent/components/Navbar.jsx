import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-b border-white/10 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-black tracking-widest text-white cursor-pointer hover:opacity-70 transition-opacity uppercase">
          SCCT
        </NavLink>
        
       <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-500 border-b-2 border-blue-500 pb-1 font-medium" 
                : "text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-500 border-b-2 border-blue-500 pb-1 font-medium" 
                : "text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            }
          >
            Courses
          </NavLink>

          <NavLink 
            to="/admissions" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-500 border-b-2 border-blue-500 pb-1 font-medium" 
                : "text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            }
          >
            Admission
          </NavLink>

          <NavLink 
            to="/placements" 
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Placements
          </NavLink>
          <NavLink 
            to="/faculty" 
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Faculty
          </NavLink>
          <NavLink 
            to="/contact" 
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Contact
          </NavLink>

          <NavLink 
            to="/About" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-500 border-b-2 border-blue-500 pb-1 font-medium" 
                : "text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            }
          >
            About
          </NavLink>
        </nav>
        
      </div>
    </header>
  );
};

export default Navbar;