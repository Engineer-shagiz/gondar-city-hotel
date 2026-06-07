import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-[#110204] overflow-hidden">
      
      {/* 1. የጀርባ ፎቶ - ጥራቱ የጠበቀ እና በዘመናዊ መልኩ ጎልቶ የሚታይ */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop" 
          alt="Gondar Castle" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* የፎቶውን ውበት ሳይሸፍን ንፅህናን የሚሰጥ Overlay */}
        <div className="absolute inset-0 bg-lineart-to-b from-[#110204]/40 via-transparent to-[#110204]/90"></div>
      </div>

      {/* 2. ረቂቅ የብርሃን ነጸብራቆች (Subtle Top & Bottom Light Glows) */}
      {/* የላይኛው ግራ ኮርነር ብርሃን */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-linear-to-br from-[#D4AF37]/15 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      {/* የላይኛው ቀኝ ኮርነር ብርሃን */}
      <div className="absolute top-0 right-0 w-100 h-100 bg-linear-to-bl from-[#D4AF37]/15 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      {/* የታችኛው ክፍል ረቂቅ ብርሃን */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-50 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 3. ዋናው ይዘት (Main Content) */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <span className="text-[#D4AF37] font-serif text-sm md:text-base tracking-[0.3em] uppercase block mb-4 font-bold drop-shadow-md">
          Experience Royal Hospitality
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white font-serif tracking-tight leading-none mb-6 drop-shadow-xl">
          የጎንደር ሲቲ <span className="text-[#D4AF37] tracking-wide">ሆቴል</span>
        </h1>
        <div className="w-40 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>
        <p className="text-white text-lg md:text-2xl font-normal mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow">
          የፋሲለደስ ነገሥታትን የታሪክ ትውስታ ከዘመናዊ ቅንጦትና ምቾት ጋር አጣምረን ያቀረብንበት ንጉሳዊ ማረፊያዎ።
        </p>
        
        {/* የድርጊት ቁልፎች ከልስላሴ አኒሜሽን ጋር (Smooth Hover Interaction) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button className="w-full sm:w-auto bg-[#D4AF37] text-[#110204] font-extrabold px-10 py-4 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all duration-500 ease-out hover:bg-white hover:shadow-[0_10px_35px_rgba(212,175,55,0.6)] hover:-translate-y-1 transform uppercase tracking-wider text-sm">
            አሁኑኑ ቦታ ያስይዙ (Book Now)
          </button>
          <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-xl transition-all duration-500 ease-out hover:bg-white hover:text-[#110204] hover:-translate-y-1 transform uppercase tracking-wider text-sm">
            ክፍሎችን ይመልከቱ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;