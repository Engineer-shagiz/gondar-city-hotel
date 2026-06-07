"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#110204]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="shrink-0 flex items-center">
            <a href="#home" className="text-[#D4AF37] font-serif text-2xl font-black tracking-tighter cursor-pointer">
              GONDAR <span className="text-white font-light">CITY HOTEL</span>
            </a>
          </div>

          {/* Desktop Navigation (Dining ተጨምሯል) */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium uppercase tracking-widest">Home</a>
            <a href="#rooms" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium uppercase tracking-widest">Rooms</a>
            <a href="#history" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium uppercase tracking-widest">About</a>
            <a href="#dining" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium uppercase tracking-widest">Dining</a>
            <a href="#contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium uppercase tracking-widest">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="bg-[#D4AF37] text-[#110204] px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg inline-block">
              Book Stay
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#D4AF37] focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Dining ተጨምሯል) */}
      {isOpen && (
        <div className="md:hidden bg-[#110204] border-b border-[#D4AF37]/20 px-4 pt-2 pb-6 space-y-3">
          <a href="#home" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2 text-base font-medium uppercase tracking-wider">Home</a>
          <a href="#rooms" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2 text-base font-medium uppercase tracking-wider">Rooms</a>
          <a href="#dining" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2 text-base font-medium uppercase tracking-wider">Dining</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2 text-base font-medium uppercase tracking-wider">Contact</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#D4AF37] text-[#110204] font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest shadow-lg">
            Book Stay
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;