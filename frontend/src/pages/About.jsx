import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Github, Linkedin, Twitter, ExternalLink, Code2, Database, BrainCircuit } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Saurabh Singh Rajput",
      role: "Lead UI/UX & System Architect",
      college: "IIIT Bhagalpur, CSE 2nd Year",
      achievements: "GFG Rank 179(college Rank) | 500+ DSA Solved",
      skills: "MERN, LLD, Redis, Rate Limiting",
      image: "/saurabh.png",
      linkedin: "https://www.linkedin.com/in/saurabh-singh-25639a306",
      twitter: "https://x.com/SaurabhSin15850",
      github: "https://github.com/DevSars24",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Bhaskar Kumar",
      role: "Backend Specialist & Logic Engineer",
      college: "IIIT Bhagalpur, CSE 2nd Year",
      achievements: "9.28 CGPA | 1000+ DSA Solved",
      skills: "Scalable APIs, Node.js, Database Design",
      image: "/bhaskar.png",
      linkedin: "https://www.linkedin.com/in/bhaskar-kumar-ba9409324",
      github: "https://github.com/0xBhaskar1",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-gray-200 selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section - Fixed the 'G' cutting issue here */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black mb-6 pb-2 leading-[1.1] bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent italic">
              The Minds Behind <br /> BlogSphere Hub
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              We are more than just developers; we are <span className="text-white font-semibold">Thinking-Oriented Creators</span>. 
              As 2nd-year CSE students at IIIT Bhagalpur, we built this project to push the boundaries of the MERN stack and real-world system architecture.
            </p>
          </div>

          {/* Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <Code2 className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Frontend Artistry</h3>
              <p className="text-sm text-gray-400">Crafting high-performance, pixel-perfect interfaces with a focus on dark-premium aesthetics.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <Database className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Backend Precision</h3>
              <p className="text-sm text-gray-400">Deployed on Render, handling complex logic and authentication with secure API architectures.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <BrainCircuit className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">DSA Warriors</h3>
              <p className="text-sm text-gray-400">Combined 1500+ problems solved. We don't just write code; we optimize it for the highest efficiency.</p>
            </div>
          </div>

          {/* Developer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {team.map((dev, index) => (
              <div key={index} className="relative group p-[1px] rounded-[32px] bg-gradient-to-br from-white/20 to-transparent hover:from-purple-500/40 transition-all duration-500 shadow-2xl">
                <div className="bg-[#0c0c0c] rounded-[31px] p-8 h-full">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    
                    <div className="h-40 w-40 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 relative">
                       <img 
                        src={dev.image} 
                        alt={dev.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        onError={(e) => (e.target.src = `https://ui-avatars.com/api/?name=${dev.name}&background=1a1a1a&color=fff`)}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl font-bold mb-1 tracking-tight">{dev.name}</h2>
                      <p className={`text-xs font-black bg-gradient-to-r ${dev.gradient} bg-clip-text text-transparent mb-4 uppercase tracking-[0.2em]`}>
                        {dev.role}
                      </p>
                      <div className="space-y-2 text-gray-400 text-sm mb-6">
                        <p className="flex items-center justify-center md:justify-start gap-2">
                           <span className="w-1 h-1 bg-white/30 rounded-full"></span> {dev.college}
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                           <span className="w-1 h-1 bg-white/30 rounded-full"></span> {dev.achievements}
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                           <span className="w-1 h-1 bg-white/30 rounded-full"></span> {dev.skills}
                        </p>
                      </div>
                      
                      <div className="flex justify-center md:justify-start gap-4">
                        <a href={dev.linkedin} target="_blank" className="p-2.5 bg-white/5 rounded-xl hover:bg-blue-500/20 transition-all hover:-translate-y-1">
                          <Linkedin className="w-5 h-5 text-blue-400" />
                        </a>
                        <a href={dev.github} target="_blank" className="p-2.5 bg-white/5 rounded-xl hover:bg-gray-200/10 transition-all hover:-translate-y-1">
                          <Github className="w-5 h-5 text-white" />
                        </a>
                        {dev.twitter && (
                          <a href={dev.twitter} target="_blank" className="p-2.5 bg-white/5 rounded-xl hover:bg-sky-500/20 transition-all hover:-translate-y-1">
                            <Twitter className="w-5 h-5 text-sky-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deployment Status */}
          <div className="mt-24 p-12 rounded-[40px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <h3 className="text-2xl font-bold mb-4 italic text-white/90">"We build like warriors, we think like architects."</h3>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['🚀 Frontend: Vercel', '⚙️ Backend: Render', '🛠️ Tech: MERN Stack', '📅 Jan 2026'].map((tag, i) => (
                <span key={i} className="px-5 py-2 bg-white/5 rounded-full border border-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default About;