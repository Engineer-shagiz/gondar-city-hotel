'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, ListFilter, Image, Save, RefreshCw, KeyRound, CheckCircle2, Upload, Video, Sparkles, Info } from 'lucide-react';
import { Room } from '../../types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [guests, setGuests] = useState('');
  const [features, setFeatures] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [videoUrl, setVideoUrl] = useState(''); 
  const [bankDetails, setBankDetails] = useState('');
  const [telebirrDetails, setTelebirrDetails] = useState('');
  
  const [isEvent, setIsEvent] = useState(false);
  const [description, setDescription] = useState('');

  const [rooms, setRooms] = useState<Room[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'gondar2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('የተሳሳተ የምስጢር ቃል ነው!');
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setRooms(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchRooms();
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setMessage({ text: '⚠️ እባክዎ መጀመሪያ ከጋለሪ የክፍሉን ወይም የዝግጅቱን ፎቶ ይምረጡ!', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price,
          size: isEvent ? 'Hall' : size,
          guests: isEvent ? 'Unlimited' : guests,
          features: features.split(',').map(f => f.trim()),
          image_url: imageUrl, 
          video_url: videoUrl, 
          status: 'available',
          bank_details: bankDetails,
          telebirr_details: telebirrDetails,
          is_event: isEvent,
          description: isEvent ? description : ''
        }),
      });

      if (res.ok) {
        setMessage({ text: '🎉 ሁሉም መረጃዎች እና ሚድያዎች በተሳካ ሁኔታ ሴቭ ሆነው ዌብሳይቱ ላይ ወጥተዋል!', type: 'success' });
        setName(''); setPrice(''); setSize(''); setGuests(''); setFeatures('');
        setImageUrl(''); setVideoUrl(''); setBankDetails(''); setTelebirrDetails('');
        setIsEvent(false); setDescription('');
        fetchRooms();
      } else {
        const errData = await res.json();
        setMessage({ text: `⚠️ ስህተት፡ ${errData.error || 'ማስቀመጥ አልተቻለም'}`, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '❌ ከሰርቨር ጋር መገናኘት አልተቻለም።', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'available' | 'booked' | 'out_of_service') => {
    try {
      const res = await fetch('/api/rooms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070505] text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#110D0D] border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl text-center">
          <KeyRound size={48} className="mx-auto text-[#D4AF37]" />
          <h1 className="text-2xl font-serif text-[#D4AF37]">Gondar City Hotel Admin</h1>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="የአድሚን ምስጢር ቃል" className="w-full bg-[#070505] border border-white/10 rounded-xl p-3 text-center outline-none focus:border-[#D4AF37]" />
          {authError && <p className="text-red-500 text-xs">{authError}</p>}
          <button type="submit" className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-medium text-sm hover:bg-[#b8952e]">ግባ</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070505] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="border-b border-white/5 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-[#D4AF37]">Gondar City Hotel Admin</h1>
            <p className="text-xs text-gray-400">የክፍሎች መጨመሪያ እና የሁኔታ መቆጣጠሪያ ሰሌዳ</p>
          </div>
          <button onClick={fetchRooms} className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white"><RefreshCw size={16} /></button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-[#110D0D] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-3">
              <h2 className="text-lg font-serif text-[#D4AF37] flex items-center gap-2">
                <PlusCircle size={18} /> አዲስ መረጃ መጫኛ ፎርም
              </h2>
              <div className="flex gap-2 bg-[#070505] p-1 rounded-xl border border-white/10 text-xs">
                <button type="button" onClick={() => setIsEvent(false)} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${!isEvent ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>የሆቴል ክፍል</button>
                <button type="button" onClick={() => setIsEvent(true)} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${isEvent ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>ባህላዊ ምሽት / ኮንሰርት</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#070505] p-4 rounded-xl border border-white/5">
                <div>
                  <label className="text-xs text-[#D4AF37] mb-2 flex items-center gap-1"><Image size={12} /> 1ኛ ቅድሚያ፡ የፎቶ ማሳያ (Preview)</label>
                  <div className={`relative flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl hover:border-[#D4AF37]/50 bg-[#110D0D] overflow-hidden h-28`}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {imageUrl ? <img src={imageUrl} alt="ፎቶ" className="w-full h-full object-cover" /> : <div className="text-center text-gray-500 text-[10px]"><Upload size={14} className="mx-auto mb-1" />ፎቶ ምረጥ</div>}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#D4AF37] mb-2 flex items-center gap-1"><Video size={12} /> 2ኛ ቅድሚያ፡ የቪዲዮ ማሳያ (Preview)</label>
                  <div className={`relative flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl hover:border-[#D4AF37]/50 bg-[#110D0D] overflow-hidden h-28`}>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {videoUrl ? <video src={videoUrl} controls className="w-full h-full object-cover" /> : <div className="text-center text-gray-500 text-[10px]"><Video size={14} className="mx-auto mb-1" />ቪዲዮ ምረጥ</div>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{isEvent ? 'የባህላዊ ምሽቱ / የፕሮግራሙ ስም' : 'የክፍል ሙሉ ስም'}</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={isEvent ? "የነገሥታት ማዕድ" : "Luxury Suite"} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{isEvent ? 'የመግቢያ / የትኬት ዋጋ' : 'የአንድ ሌሊት ዋጋ'}</label>
                  <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder={isEvent ? "$25" : "$180"} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                </div>
              </div>

              {!isEvent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">የክፍል ስፋት</label>
                    <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="55 m²" className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">የሰዎች ብዛት</label>
                    <input type="text" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="2 Adults" className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
              )}

              {isEvent && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">ስለ ባህላዊ ምሽቱ / ፕሮግራሙ ሰፊ ማብራሪያ ጽሑፍ</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="የነገሥታት ማዕድ እና ባህላዊ ምሽት በጎንደር..." rows={3} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37] resize-none" />
                </div>
              )}

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">ባህሪያት / መገለጫዎች (በኮማ የተለዩ)</label>
                <input type="text" required value={features} onChange={(e) => setFeatures(e.target.value)} placeholder={isEvent ? "ባህላዊ ምግቦች, አስደናቂ ውዝዋዜ" : "Free WiFi, Smart TV"} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[#D4AF37]" />
              </div>

              <div className="border border-white/5 bg-white/1 p-4 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-[#D4AF37]">💳 የክፍያ አካውንት መሙያ</h3>
                
                {/* 🚨 አድሚኑ ማሳሰቢያው መኖሩን የሚያውቅበት መረጃ ሰጪ መስመር */}
                <div className="bg-white/5 p-2 rounded-lg flex gap-2 items-center border border-white/5">
                  <Info size={12} className="text-[#D4AF37]" />
                  <span className="text-[10px] text-gray-400">ማስታወሻ፦ ዩዘሩ ክፍያውን ፈጽሞ <strong className="text-white">ስክሪንሾት እንዲልክ</strong> የሚያሳስብ መልዕክት በፖፕአፑ ላይ በቋሚነት ተካቷል።</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">የባንክ አካውንት ዝርዝር</label>
                    <textarea value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} placeholder="CBE: 1000xxxx" rows={2} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-[#D4AF37] resize-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">የቴሌብር ቁጥር ዝርዝር</label>
                    <textarea value={telebirrDetails} onChange={(e) => setTelebirrDetails(e.target.value)} placeholder="Telebirr: 0911xxxxxx" rows={2} className="w-full bg-[#070505] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-[#D4AF37] resize-none" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-medium text-xs hover:bg-[#b8952e] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
                <Save size={14} /> {isSubmitting ? 'በማስቀመጥ ላይ...' : 'በዌብሳይቱ ላይ አውጣ (Publish)'}
              </button>

              {message.text && (
                <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${message.type === 'success' ? 'bg-green-950/40 border border-green-500/30 text-green-400' : 'bg-red-950/40 border border-red-500/30 text-red-400'}`}>
                  <span>{message.text}</span>
                </div>
              )}
            </form>
          </div>

          <div className="bg-[#110D0D] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#D4AF37] flex items-center gap-2 border-b border-white/5 pb-3"><ListFilter size={18} /> የክፍሎችና ኩነቶች መቆጣጠሪያ</h2>
            <div className="space-y-3 max-h-150 overflow-y-auto pr-1">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <div key={room.id} className="bg-[#070505] border border-white/5 p-3 rounded-xl space-y-3 flex flex-col">
                    <div className="flex gap-3 items-center">
                      <img src={room.image_url} alt={room.name} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                      <div className="overflow-hidden grow">
                        <h4 className="text-xs font-serif text-white truncate flex items-center gap-1">
                          {room.is_event && <Sparkles size={10} className="text-[#D4AF37]" />}
                          {room.name}
                        </h4>
                        <p className="text-[11px] text-[#D4AF37]">{room.is_event ? `መግቢያ፡ ${room.price}` : `${room.price} / ሌሊት`}</p>
                      </div>
                    </div>
                    {!room.is_event && (
                      <div className="grid grid-cols-3 gap-1 text-[10px]">
                        <button onClick={() => handleStatusChange(room.id, 'available')} className={`py-1.5 rounded-md font-medium border ${room.status === 'available' ? 'bg-green-600/20 text-green-400 border-green-500/40' : 'bg-transparent text-gray-500 border-white/5'}`}>Available</button>
                        <button onClick={() => handleStatusChange(room.id, 'booked')} className={`py-1.5 rounded-md font-medium border ${room.status === 'booked' ? 'bg-amber-600/20 text-amber-400 border-amber-500/40' : 'bg-transparent text-gray-500 border-white/5'}`}>Booked</button>
                        <button onClick={() => handleStatusChange(room.id, 'out_of_service')} className={`py-1.5 rounded-md font-medium border ${room.status === 'out_of_service' ? 'bg-red-600/20 text-red-400 border-red-500/40' : 'bg-transparent text-gray-500 border-white/5'}`}>Closed</button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-8">ምንም መረጃ አልተገኘም።</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}