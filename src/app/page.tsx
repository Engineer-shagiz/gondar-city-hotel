import Header from "../components/Header";
import Hero from "../components/Hero";
import Rooms from "../components/Rooms";
import Dining from "../components/Dining";
import AboutHistory from "../components/AboutHistory";
import Reviews from "../components/Reviews"; // አዲሱ ፋይል
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0A0A] scroll-smooth">
      <Header />
      <div id="home"><Hero /></div>
      <div id="rooms"><Rooms /></div>
      <div id="dining"><Dining /></div>
      <div id="about"><AboutHistory /></div>
      
      {/* ሪቪው ከፉተሩ በላይ ተቀምጧል */}
      <div id="reviews">
        <Reviews />
      </div>
      
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}