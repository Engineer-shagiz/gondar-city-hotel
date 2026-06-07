"use client"; // ስህተቱን (Runtime Error) ለመፍታት ይህች መስመር ግድ ያስፈልጋል!

import React from 'react';

const AboutHistory = () => {
  return (
    <section className="bg-[#0D0A0A] py-24 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
             <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-2xl blur-xl"></div>
             
             {/* የተስተካከለው የፎቶ ክፍል */}
             <img 
               src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1473&auto=format&fit=crop" 
               className="relative rounded-2xl border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full h-100 object-cover"
               alt="Gondar Historical Site"
               onError={(e) => {
                 // ኦንላይን ምስሉ ካልሰራ የሚተካው አማራጭ
                 e.currentTarget.src = "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1374&auto=format&fit=crop";
               }}
             />
          </div>
          
          <div>
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase block mb-3">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-6">
              ከታሪክ ጋር የተቆራኘ <br /> <span className="text-[#D4AF37]">ንጉሳዊ መቆያ</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-6">
              ጎንደር ሲቲ ሆቴል በኢትዮጵያ የስልጣኔ ማዕከል በሆነችው የጎንደር ከተማ እምብርት ላይ ይገኛል። ሆቴላችን የጥንቱን የአጼ ፋሲለደስ ግንብ ጥበብ እና የዘመናዊነትን ምቾት አጣምሮ የያዘ ድንቅ ማረፊያ ነው።
            </p>
            <div className="flex items-center space-x-8 mt-10 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-[#D4AF37] text-3xl font-bold">15+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">የልምድ አመታት</p>
              </div>
              <div>
                <h4 className="text-[#D4AF37] text-3xl font-bold">50+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">ንጹህ ክፍሎች</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutHistory;