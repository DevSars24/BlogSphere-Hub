import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImg from "../images/hero.gif";
import { Terminal, ChevronRight, Code2, Globe } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[10%] pt-28 lg:pt-0 overflow-hidden bg-[#000000] selection:bg-white/20">
      
      {/* --- ELITE BLACK ARCHITECTURE --- */}
      {/* Super Subtle Glows - Obsidian Style */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none"></div>
      
      {/* Micro-Grid Overlay for Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* --- LEFT CONTENT --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="left w-full lg:w-[58%] text-center lg:text-left relative z-20"
      >
        {/* Obsidian Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/40"></span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-gray-400 font-bold italic">
             BlogSphere-HUB V2.0
          </span>
        </motion.div>

        {/* Cinematic Typography */}
        <motion.h1 
          variants={itemVariants}
          className="text-[52px] sm:text-[75px] lg:text-[95px] font-bold leading-[0.9] text-white mb-8 tracking-tighter"
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
             Digital Systems.
          </span>
        </motion.h1>

        {/* Minimalist Professional Text */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 max-w-xl mb-14 leading-relaxed font-light"
        >
          Workspace of <span className="text-white font-normal">Saurabh Singh Rajput</span>. 
          Focusing on <span className="text-gray-300">Scalable Systems</span> and high-fidelity interfaces at IIIT Bhagalpur.
        </motion.p>

        {/* High-Contrast Professional Actions */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-6">
          <button 
            onClick={() => navigate('/blogs')} 
            className="group relative px-10 py-4 bg-white text-black font-black rounded-xl transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Blogs <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white"></div>
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className="group px-10 py-4 bg-transparent border border-white/10 hover:border-white/30 text-gray-300 hover:text-white rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm shadow-xl"
          >
            <Terminal size={18} className="text-gray-500 group-hover:text-white transition-colors" />
            Core Journey
          </button>
        </motion.div>
      </motion.div>

      {/* --- RIGHT CONTENT (CENTERPIECE) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="right w-full lg:w-[42%] mt-16 lg:mt-0 flex justify-center lg:justify-end relative z-10"
      >
        <div className="relative group">
          {/* Intense Inner Focus Glow */}
          <div className="absolute inset-0 bg-white/[0.02] blur-[80px] rounded-full"></div>
          
          <div className="relative p-1.5 bg-black/40 border border-white/[0.07] backdrop-blur-3xl rounded-[45px] shadow-[0_0_100px_-20px_rgba(255,255,255,0.03)] overflow-hidden">
            <img 
              className="rounded-[38px] w-full max-w-[460px] object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.02]"
              src={heroImg} 
              alt="System Architecture"
            />
            
            {/* Glass Floating Labels - Obsidian Style */}
            <div className="absolute top-8 left-8 px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 flex items-center gap-3 transition-transform group-hover:-translate-y-1">
                <Globe size={16} className="text-gray-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase leading-none">Scalable Web</span>
            </div>

            <div className="absolute bottom-8 right-8 px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 flex items-center gap-3 transition-transform group-hover:translate-y-1">
                <Code2 size={16} className="text-gray-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase leading-none">Backend Architecture</span>
            </div>
          </div>
          
          {/* Outer Ring Decoration */}
          <div className="absolute -inset-4 border border-white/[0.02] rounded-[60px] pointer-events-none group-hover:border-white/[0.05] transition-colors duration-1000"></div>
        </div>
      </motion.div>

      {/* Vertical Status Label */}
      <div className="hidden lg:block absolute right-[-50px] top-1/2 -rotate-90 opacity-20 hover:opacity-50 transition-opacity">
       
      </div>
    </section>
  );
};

export default Hero;