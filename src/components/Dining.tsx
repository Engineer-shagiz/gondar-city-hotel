import React from 'react';

const Dining = () => {
  return (
    <section className="bg-[#110204] py-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* የብርሃን ነጸብራቅ */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* በግራ በኩል፡ ማራኪ ጽሁፍ */}
          <div>
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase block mb-3">
              Royal Dining & Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-6">
              የነገሥታት <span className="text-[#D4AF37]">ማዕድ</span> እና ባህላዊ ምሽት
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37] mb-8"></div>
            
            <p className="text-gray-300 text-base md:text-lg font-light mb-8 leading-relaxed">
              በአጼ ፋሲለደስ የተሰየመው የምግብ አዳራሻችን፤ እውነተኛ የጎንደር ባህላዊ ምግቦችን፣ የተመረጡ የሀገር ውስጥና የውጭ ሀገር መጠጦችን ከንጉሳዊ መስተንግዶ ጋር ያቀርባል። በየሳምንቱ መጨረሻ የሚቀርቡት ውብ የባህል እምቢልታ እና የእስክስታ ምሽቶች ትውስታዎትን ፍጹም ልዩ ያደርጉታል።
            </p>

            {/* የአገልግሎት ዝርዝሮች */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 shrink-0"></div>
                <div>
                  <h4 className="font-bold text-white text-sm font-serif mb-1">ባህላዊና ዘመናዊ ምግቦች</h4>
                  <p className="text-gray-400 text-xs">በዋና ሼፎች የተዘጋጁ ጥራት ያላቸው ማዕዶች።</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 shrink-0"></div>
                <div>
                  <h4 className="font-bold text-white text-sm font-serif mb-1">የጎንደር ባህላዊ ተጅ</h4>
                  <p className="text-gray-400 text-xs">በንጉሳዊ ዋንጫ የሚቀርብ ንጹህ ማር ተጅ።</p>
                </div>
              </div>
            </div>

            {/* ወደ ዋትስአፕ የሚወስድ የትዕዛዝ ቁልፍ */}
            <a 
              href="https://wa.me/251911000000?text=ሰላም%20የጎንደር%20ሲቲ%20ሆቴል%20ሬስቶራንት%20ቦታ%20ማስያዝ%20እፈልጋለሁ።"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D4AF37] text-[#110204] font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-500 ease-out hover:bg-white hover:-translate-y-1 transform uppercase tracking-wider text-xs"
            >
              ማዕድ ቦታ ያስይዙ (Reserve a Table)
            </a>
          </div>

          {/* በቀኝ በኩል፡ የተደራረቡ ውብ ፎቶዎች (Premium Layout) */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-60 rounded-2xl overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1469&auto=format&fit=crop" 
                  alt="Delicious Traditional Food" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="h-40 rounded-2xl overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1470&auto=format&fit=crop" 
                  alt="Premium Drinks" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="h-40 rounded-2xl overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1374&auto=format&fit=crop" 
                  alt="Restaurant Interior" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="h-60 rounded-2xl overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1470&auto=format&fit=crop" 
                  alt="Traditional Dance Night" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dining;