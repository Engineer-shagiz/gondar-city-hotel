'use client';

import React, { useEffect, useState } from 'react';
import { Square, Users, X, CreditCard, Calendar, User, MessageCircle, Send, Video, Sparkles, Ticket, Info } from 'lucide-react';
import { Room } from '../types';

export default function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingStage, setBookingStage] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [daysCount, setDaysCount] = useState(1);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/rooms');
        if (!res.ok) throw new Error('መረጃ ማምጣት አልተቻለም');
        const data = await res.json();
        if (Array.isArray(data)) setRooms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const calculateTotal = (priceStr: string) => {
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    return numericPrice * daysCount;
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-white text-lg bg-[#070505]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
        የጎንደር ሲቲ ሆቴል መረጃዎችን በመጫን ላይ...
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#070505] text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* የሆቴል ክፍሎች */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-[#D4AF37] mb-4">የእንግዳ ማረፊያ ክፍሎቻችን</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-sm">የጎንደር ባህልን እና ዘመናዊ ምቾትን አጣምረው የያዙ ውብ ክፍሎቻችን።</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.filter(r => !r.is_event).map((room) => {
              const isAvailable = room.status === 'available';
              return (
                <div key={room.id} className="bg-[#110D0D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                      <span className="text-[#D4AF37] font-bold">{room.price}</span><span className="text-gray-400 text-xs"> / ሌሊት</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-lg font-serif mb-3 text-white">{room.name}</h3>
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                      <span className="flex items-center gap-1"><Square size={12} className="text-[#D4AF37]" /> {room.size}</span>
                      <span className="flex items-center gap-1"><Users size={12} className="text-[#D4AF37]" /> {room.guests}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-6">
                      {room.features?.map((f, i) => <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-300">{f}</span>)}
                    </div>
                    <button disabled={!isAvailable} onClick={() => { setSelectedRoom(room); setBookingStage(1); setDaysCount(1); }} className={`w-full mt-auto py-3 rounded-xl font-medium text-xs ${isAvailable ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-500'}`}>
                      {isAvailable ? 'ቦታ አስይዝ (Book Now)' : 'ለጊዜው አይገኝም'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* የባህል አዳራሽ / ኮንሰርት */}
        {rooms.some(r => r.is_event) && (
          <div className="border-t border-white/5 pt-20">
            <div className="space-y-24">
              {rooms.filter(r => r.is_event).map((event) => (
                <div key={event.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase block font-mono">ROYAL DINING & CULTURE</span>
                        <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] px-2 py-0.5 rounded-full border border-[#D4AF37]/20 font-bold">መግቢያ፡ {event.price}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif text-white font-bold">{event.name}</h2>
                      <div className="w-16 h-0.5 bg-[#D4AF37] mt-3"></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">{event.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.features?.map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#D4AF37] mt-1 text-sm">●</span>
                          <span className="text-sm text-gray-300">{f}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setSelectedRoom(event); setBookingStage(1); setDaysCount(1); }} className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b8952e] flex items-center gap-2 shadow-lg">
                      <Ticket size={14} /> ማዕድ / ትኬት ቦታ ይያዙ (RESERVE NOW)
                    </button>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-12 gap-4">
                    <div className="col-span-12 h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10">
                      {event.video_url ? (
                        <video src={event.video_url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ፖፕአፕ ሞዳል (Popup Modal) */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#110D0D] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
              <div className="p-5 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-[#D4AF37] text-lg">{selectedRoom.name}</h4>
                  <p className="text-xs text-gray-400">{selectedRoom.is_event ? 'የባህል ምሽት / ትኬት ማስያዣ' : `ደረጃ ${bookingStage} ከ 2`}</p>
                </div>
                <button onClick={() => setSelectedRoom(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>

              {bookingStage === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setBookingStage(2); }} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2"><User size={12} /> ሙሉ ስምዎን ያስገቡ</label>
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#070505] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      {selectedRoom.is_event ? <span className="flex items-center gap-1"><Ticket size={12} /> የሰው / የትኬት ብዛት</span> : <span className="flex items-center gap-1"><Calendar size={12} /> የሚቆዩበት ሌሊት ብዛት</span>}
                    </label>
                    <input type="number" min="1" required value={daysCount} onChange={(e) => setDaysCount(parseInt(e.target.value) || 1)} className="w-full bg-[#070505] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="bg-white/2 border border-white/5 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span>{selectedRoom.is_event ? 'የአንድ ሰው መግቢያ:' : 'የአንድ ሌሊት ዋጋ:'}</span>
                      <span>{selectedRoom.price}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>ጠቅላላ ሂሳብ:</span>
                      <span className="text-[#D4AF37]">${calculateTotal(selectedRoom.price)}</span>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">ወደ ክፍያ ቀጥል <Send size={14} /></button>
                </form>
              )}

              {bookingStage === 2 && (
                <div className="p-6 space-y-5">
                  <p className="text-xs text-gray-300 text-center">እባክዎ ሂሳብ <span className="text-[#D4AF37] font-bold">${calculateTotal(selectedRoom.price)}</span> ገቢ ያድርጉ።</p>
                  
                  <div className="space-y-2">
                    <div className="bg-[#070505] border border-white/5 rounded-xl p-3 text-xs">
                      <p className="text-[#D4AF37] font-bold mb-1"><CreditCard size={12} /> የባንክ አካውንት</p>
                      <p className="text-gray-300 whitespace-pre-line">{selectedRoom.bank_details || 'CBE: 1000123456789'}</p>
                    </div>
                    <div className="bg-[#070505] border border-white/5 rounded-xl p-3 text-xs">
                      <p className="text-[#D4AF37] font-bold mb-1"><MessageCircle size={12} /> 📱 የቴሌብር ቁጥር</p>
                      <p className="text-gray-300 whitespace-pre-line">{selectedRoom.telebirr_details || 'Telebirr: 0911223344'}</p>
                    </div>
                  </div>

                  {/* 🚨 አዲስ የተጨመረው የስክሪንሾት ማሳሰቢያ ቦክስ */}
                  <div className="bg-[#amber-950]/20 border border-[#D4AF37]/30 rounded-xl p-3 flex gap-2.5 items-start">
                    <Info size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      <strong className="text-[#D4AF37]">ማሳሰቢያ፦</strong> እባክዎ ክፍያውን እንደፈጸሙ የደረሰኝ ወይም የባንክ ማስተላለፊያውን <span className="text-white underline font-semibold">ስክሪንሾት (Screenshot)</span> በማንሳት ከታች ባሉት የቴሌግራም ወይም ዋትስአፕ ቁልፎች ተጠቅመው ይላኩልን።
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a href="https://t.me/your_hotel" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-[#26A5E4] text-white py-2 rounded-xl text-xs font-medium gap-0.5">
                      <span>በቴሌግራም ላክ</span>
                      <span className="text-[9px] opacity-80">(ስክሪንሾት አያይዙ)</span>
                    </a>
                    <a href="https://wa.me/251911223344" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-[#25D366] text-white py-2 rounded-xl text-xs font-medium gap-0.5">
                      <span>በዋትስአፕ ላክ</span>
                      <span className="text-[9px] opacity-80">(ስክሪንሾት አያይዙ)</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}