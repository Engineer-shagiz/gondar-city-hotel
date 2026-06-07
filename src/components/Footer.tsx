import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0D0A0A] border-t border-[#D4AF37]/10 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-[#D4AF37] font-serif text-xl font-bold mb-6 tracking-tighter">GONDAR CITY</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              በጎንደር እምብርት ላይ የሚገኝ፣ የነገሥታትን መስተንግዶ ለዘመናችን እንግዶች የሚያቀርብ ተመራጭ ሆቴል።
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#rooms" className="hover:text-[#D4AF37] transition-colors">Our Rooms</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="flex items-center"><Phone size={16} className="text-[#D4AF37] mr-3 shrink-0" /> +251 911 000 000</li>
              <li className="flex items-center"><Mail size={16} className="text-[#D4AF37] mr-3 shrink-0" /> info@gondarcityhotel.com</li>
              <li className="flex items-center"><MapPin size={16} className="text-[#D4AF37] mr-3 shrink-0" /> Gondar, Ethiopia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Facebook Icon SVG */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#110204] transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              {/* Instagram Icon SVG */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#110204] transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-[10px] uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Gondar City Hotel. Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;