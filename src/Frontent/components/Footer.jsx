import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <div className="font-black text-white text-lg uppercase tracking-widest">SCCT</div>
      <div className="flex gap-6">
        <NavLink to="/about" className="hover:text-white transition-colors">About</NavLink>
        <NavLink to="/contact" className="hover:text-white transition-colors">Contact</NavLink>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
      <div className="text-gray-500">© 2026 SCCT. All rights reserved.</div>
    </footer>
  );
};

export default Footer;