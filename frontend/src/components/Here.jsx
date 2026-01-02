import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImg from "../images/hero.gif";
import { Sparkles, Terminal, ChevronRight, Zap } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="relative min-h-screen lg:h-[95vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[100px] pt-32 lg:pt-10 overflow-hidden bg-[#080808]"
    >
      {/* Premium Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* Left content */}
      <div className="left w-full lg:w-[60%] text-center lg:text-left relative z-20">
        
        {/* Arena Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <Zap size={14} className="text-yellow-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-purple-400 font-bold">
            Entering The Dev Arena
          </span>
        </motion.div>

        {/* Professional Heavy Heading */}
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[45px] sm:text-[65px] lg:text-[85px] font-black leading-[0.95] text-white mb-8 tracking-tighter"
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500">
             Digital Realms.
          </span>
        </motion.h1>

        {/* Strategic Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Welcome to the personal workspace of <span className="text-white font-semibold">Saurabh Singh Rajput</span>. 
          A 2nd-year CSE student at IIIT Bhagalpur, bridging the gap between <span className="text-purple-400">complex system design</span> and pixel-perfect execution.
        </motion.p>

        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center lg:justify-start gap-4"
        >
          {/* Navigate to Blogs (assuming /blogs or home scroll) */}
          <button 
            onClick={() => navigate('/blogs')} 
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all flex items-center gap-3 overflow-hidden"
          >
            Explore Blogs
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Navigate to About */}
          <button 
            onClick={() => navigate('/about')}
            className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <Terminal size={18} className="text-gray-400" />
            My Journey
          </button>
        </motion.div>
      </div>

      {/* Right Content - Visual Centerpiece */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="right w-full lg:w-[40%] mt-16 lg:mt-0 flex justify-center lg:justify-end relative z-10"
      >
        <div className="relative group p-[1px] rounded-[40px] bg-gradient-to-b from-white/20 to-transparent">
          <div className="relative p-2 bg-[#0c0c0c] backdrop-blur-3xl rounded-[39px] overflow-hidden shadow-2xl">
            <img 
              className="rounded-[32px] w-full max-w-[450px] object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              src={heroImg} 
              alt="Developer Arena Illustration"
            />
            
            {/* Minimalist Floating Card */}
            <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">MERN STACK</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    
    </section>
  );
};

export default Hero;