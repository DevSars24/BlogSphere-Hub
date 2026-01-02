import React from 'react';
import Navbar from '../components/Navbar';
import { Mail, Linkedin, Twitter, MapPin, ExternalLink, Github } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    {
      name: 'Gmail',
      icon: <Mail className="w-5 h-5" />,
      value: 'saurabhsingh100605@gmail.com',
      link: 'mailto:saurabhsingh100605@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      value: 'Saurabh Singh',
      link: 'https://www.linkedin.com/in/saurabh-singh-25639a306',
      color: 'hover:text-blue-400'
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5" />,
      value: '@SaurabhSin15850',
      link: 'https://x.com/SaurabhSin15850',
      color: 'hover:text-sky-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 selection:bg-purple-500/30">
      <Navbar />

      {/* Padding top adjusted for mobile (pt-24) to desktop (pt-32) */}
      <main className="pt-24 md:pt-32 pb-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-purple-500 font-mono tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-4 italic">Get in touch</h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-400 to-gray-800 bg-clip-text text-transparent leading-tight">
              Let's Connect.
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
              I'm currently looking for new opportunities and collaborations. 
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>
          </div>

          {/* Grid: 1 column on mobile, 2 columns on lg screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            
            {/* Left Side: Contact Info Cards */}
            <div className="space-y-4 md:space-y-6">
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6 md:space-y-8">
                  {/* Location Card */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 bg-purple-500/10 rounded-xl text-purple-400 flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wider font-bold">Location</p>
                      <p className="text-base md:text-lg font-medium">IIIT Bhagalpur, Bihar, India</p>
                    </div>
                  </div>

                  {/* Social Links Mapping */}
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-start gap-3 md:gap-4 group transition-all ${social.color}`}
                    >
                      <div className="p-2.5 md:p-3 bg-white/5 group-hover:bg-current/10 rounded-xl transition-colors flex-shrink-0">
                        {social.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wider font-bold">{social.name}</p>
                        <p className="text-sm md:text-lg font-medium flex items-center gap-2 truncate">
                          {social.value} 
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-all hidden sm:block" />
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mini Bio Card */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-white/10">
                <p className="text-gray-300 italic text-base md:text-lg leading-relaxed">
                  "Building real-world projects with MERN stack and exploring the depths of System Design."
                </p>
                <div className="mt-4 md:mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10"></div>
                    <span className="text-xs font-mono text-purple-400">Saurabh Singh</span>
                </div>
              </div>
            </div>

            {/* Right Side: Quick Action / Status */}
            <div className="flex flex-col gap-4 md:gap-6">
               <div className="flex-1 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-center items-center text-center">
                  <div className="relative mb-4 md:mb-6">
                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-10 animate-pulse"></div>
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-ping absolute top-1 right-1"></div>
                        <div className="h-2.5 w-2.5 bg-green-500 rounded-full absolute top-1 right-1"></div>
                        <Github className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Available for Projects</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">I'm currently working on my Portfolio & BlogSphere Hub.</p>
                  
                  <a 
                    href="https://saurabh-works.netlify.app/" 
                    target="_blank"
                    className="w-full py-3.5 md:py-4 bg-white text-black font-black rounded-xl md:rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    View My Portfolio <ExternalLink className="w-4 h-4" />
                  </a>
               </div>

               {/* Stats Grid: Mobile friendly gap */}
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl md:text-3xl font-black text-purple-400 tracking-tighter">70+</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Repositories</p>
                  </div>
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl md:text-3xl font-black text-pink-400 tracking-tighter">2nd</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Year CSE</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;