import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';                 
import { createPortal } from 'react-dom';
import EnrollForm from '../Form/EnrollForm';

const CoursceCard = ({ image, title, discount, startDate, id }) => {  
  const [isopen, setIsopen] = useState(false);

  return (
    
    <NavLink to={`/course/${id}`} className="block">
      <div className={`bg-[#111111] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 border border-white/10 w-full max-w-sm ${isopen ? '' : 'hover:scale-105 hover:border-white/30'}`}>
        <div className="relative h-48 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-md">
            {discount} OFF
          </div>
        </div>
        
        <div className="p-5 flex flex-col gap-3">
          <h3 className="text-white font-bold text-xl truncate">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Starts: {startDate}
            </span>
            
            <button 
              onClick={(e) => {
                e.preventDefault();      
                e.stopPropagation();
                setIsopen(true);
              }} 
              className="bg-white hover:bg-gray-200 text-black text-sm font-bold px-4 py-1.5 rounded-full transition-colors shadow-md"
            >
              Enroll
            </button>
          </div>
        </div>

      
        {isopen && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setIsopen(false)}>
            <div className="relative bg-[#111111] rounded-xl shadow-2xl border border-white/20 p-2 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsopen(false)} className="absolute -top-3 -right-3 bg-white hover:bg-gray-200 text-black rounded-full p-1.5 shadow-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <EnrollForm />
            </div>
          </div>,
          document.body
        )}
      </div>
    </NavLink>
  );
};

export default CoursceCard;