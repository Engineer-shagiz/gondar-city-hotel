"use client";
import React, { useState } from 'react';
import { Star, MessageSquare, Send, Trash2, ShieldAlert } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  text: string;
  stars: number;
  date: string;
}

const Reviews = () => {
  // የድሮ አስተያየቶች ስብስብ
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, name: "ዮናስ ካሳሁን", text: "የጎንደር ሲቲ ሆቴል መስተንግዶ እጅግ አስደናቂ ነው። ክፍሎቹ ንጹህ እና ምቹ ናቸው።", stars: 5, date: "May 2026" },
    { id: 2, name: "ሔለን ተፈራ", text: "ምግቡ በጣም ጣፋጭ ነው፣ በተለይ የባህል ምሽቱ የማይረሳ ነበር።", stars: 4, date: "April 2026" },
    { id: 3, name: "አልማዝ በቀለ", text: "አካባቢው ጫጫታ አለበት አልመቸኝም!", stars: 2, date: "March 2026" } // ናሙና መጥፎ አስተያየት ለማጥፋት መሞከሪያ
  ]);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [q1, setQ1] = useState(5);
  const [q2, setQ2] = useState(5);
  const [q3, setQ3] = useState(5);

  // የአስተዳዳሪ ሁነታ (Admin Mode) መቆጣጠሪያ
  const [isAdmin, setIsAdmin] = useState(false);

  const StarRatingInput = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex space-x-1 text-[#D4AF37]">
        {[1, 2, 3, 4, 5].map((star) => (
          <button type="button" key={star} onClick={() => onChange(star)} className="focus:outline-none">
            <Star size={14} fill={star <= value ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  );

  // 1. አዲስ አስተያየት ሲጨመር እና የ 50 ገደብ ህግ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const averageStars = Math.round((q1 + q2 + q3) / 3);
    const newReview: Review = {
      id: Date.now(),
      name: name,
      text: text,
      stars: averageStars,
      date: "Just Now"
    };

    // አዲሱን ጨምሮ የ 50 ገደብ ህግ እዚህ ይተገበራል (.slice(0, 50))
    // ይህ ማለት ሁልጊዜም የመጀመሪያዎቹን 50 አዳዲስ አስተያየቶች ብቻ ይይዛል፤ የቆዩት በራሳቸው ይጠፋሉ
    setReviews((prevReviews) => [newReview, ...prevReviews].slice(0, 50));

    setName('');
    setText('');
    setQ1(5); setQ2(5); setQ3(5);
  };

  // 2. በአስተዳዳሪው መጥፎ አስተያየት ማጥፊያ ፈንክሽን
  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(rev => rev.id !== id));
  };

  // ሚስጥራዊ የአስተዳዳሪ መግቢያ (ለሙከራ ያህል 'admin' ብለህ ስትጽፍ ያሳልፍሃል)
  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const password = prompt("የአስተዳዳሪ መግቢያ የይለፍ ቃል (Password) ያስገቡ:");
      if (password === "admin") {
        setIsAdmin(true);
      } else {
        alert("የይለፍ ቃል የተሳሳተ ነው!");
      }
    }
  };

  return (
    <section className="bg-[#0D0A0A] py-20 px-4 border-t border-white/3 relative">
      
      {/* ሚስጥራዊ የአስተዳዳሪ ቁልፍ (በጣም ጥግ ላይ የምትገኝ) */}
      <button 
        onClick={handleAdminToggle}
        className="absolute top-4 right-4 text-xs text-gray-700 hover:text-[#D4AF37] flex items-center bg-transparent border border-gray-900 px-2 py-1 rounded"
      >
        <ShieldAlert size={12} className="mr-1" /> {isAdmin ? "Exit Admin" : "Owner Login"}
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">የእንግዶች አስተያየት እና ደረጃ</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
          {isAdmin && <p className="text-red-500 text-xs mt-2 font-mono">⚠️ OWNER MODE ACTIVE: መጥፎ አስተያየቶችን ማጥፋት ይችላሉ</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ፎርም */}
          <div className="lg:col-span-1 bg-[#141111] p-8 rounded-2xl border border-white/5 shadow-xl h-fit">
            <h3 className="text-[#D4AF37] font-bold mb-4 flex items-center text-sm">
              <MessageSquare size={18} className="mr-2" /> ልምድዎን ያካፍሉ
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="ስምዎ" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full bg-[#0D0A0A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
              />
              <div className="bg-[#0D0A0A] p-3 rounded-lg border border-white/5">
                <StarRatingInput label="1. የክፍሉ ንጽህና እና ምቾት" value={q1} onChange={setQ1} />
                <StarRatingInput label="2. የመስተንግዶ ጥራት" value={q2} onChange={setQ2} />
                <StarRatingInput label="3. የምግብ እና መጠጥ ጣዕም" value={q3} onChange={setQ3} />
              </div>
              <textarea 
                placeholder="አስተያየትዎ..." rows={3} value={text} onChange={(e) => setText(e.target.value)} required
                className="w-full bg-[#0D0A0A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
              ></textarea>
              <button type="submit" className="w-full bg-[#D4AF37] text-[#110204] font-extrabold py-3 rounded-lg flex items-center justify-center hover:bg-white text-xs uppercase tracking-wider cursor-pointer">
                <Send size={14} className="mr-2" /> አስተያየት ይስጡ
              </button>
            </form>
          </div>

          {/* የአስተያየቶች ዝርዝር */}
          <div className="lg:col-span-2 space-y-6 max-h-[137.5 overflow-y-auto pr-2">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white/2 p-6 rounded-2xl border border-white/5 border-l-4 border-l-[#D4AF37] relative group">
                
                {/* ማጥፊያ ቁልፍ - የሚታየው ባለቤቱ (Admin) በፓስወርድ ሲገባ ብቻ ነው */}
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteReview(rev.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-400 bg-red-500/10 p-2 rounded-lg transition-all"
                    title="ይህን መጥፎ አስተያየት ያጥፉ"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-base">{rev.name}</h4>
                    <span className="text-gray-500 text-xs">{rev.date}</span>
                  </div>
                  <div className="flex text-[#D4AF37] space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < rev.stars ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic font-light text-sm md:text-base leading-relaxed">"{rev.text}"</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reviews;