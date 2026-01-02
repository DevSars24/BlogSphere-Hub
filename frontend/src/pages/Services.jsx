import React from 'react';
import Navbar from '../components/Navbar';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Users, 
  ExternalLink, 
  Trophy 
} from 'lucide-react';

const Services = () => {
  const serviceCards = [
    {
      title: "Backend & System Design",
      desc: "Architecting scalable systems with a focus on Rate Limiting, Redis Caching, and Load Balancing. Obsessed with LLD/HLD patterns.",
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      tags: ["Node.js", "Redis", "System Design"]
    },
    {
      title: "Full Stack Development",
      desc: "Building production-ready MERN applications. Creating seamless, high-performance interfaces integrated with robust APIs.",
      icon: <Code2 className="w-8 h-8 text-pink-400" />,
      tags: ["React", "Express", "MongoDB"]
    },
    {
      title: "Mentorship & Guidance",
      desc: "Successfully guided many batchmates and juniors in their Web Dev journey. Simplifying complex DevOps and Cloud concepts.",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      tags: ["Community", "Teaching", "Roadmaps"]
    },
    {
      title: "Technical Writing",
      desc: "Breaking down high-level technical topics into digestible articles on Hashnode. Focused on Gen-AI and Backend internals.",
      icon: <Terminal className="w-8 h-8 text-emerald-400" />,
      tags: ["Hashnode", "Documentation", "Blogs"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-purple-500"></span>
              <span className="text-purple-400 font-mono tracking-tighter uppercase text-sm">Specializations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tight">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-white">
                Infrastructures.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Currently a 2nd-year CSE student at IIIT Bhagalpur, building the web like a warrior. 
              Actively seeking <span className="text-white font-semibold">Backend/SDE Internships</span> where I can solve complex architectural challenges.
            </p>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {serviceCards.map((service, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 backdrop-blur-sm">
                <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 line-relaxed">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hardcore Stats / Warrior Section */}
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 mb-20">
            <div className="bg-[#0c0c0c] rounded-[22px] p-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-yellow-500 mb-4 font-mono">
                  <Trophy className="w-5 h-5" />
                  <span>ALGO WARRIOR STATUS</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">500+ Problems Solved</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Ranked <span className="text-white font-bold">179 on GeeksforGeeks</span>. 
                  Approaching Data Structures and Algorithms with a focus on optimal time complexity and clean implementation.
                </p>
                <div className="flex gap-4">
                  <a href="https://hashnode.com/@saurabh465" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                    Read My Hashnode <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">GFG Rank</p>
                  <p className="text-3xl font-black text-purple-400">179</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">DSA Count</p>
                  <p className="text-3xl font-black text-pink-400">500+</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Interests</p>
                  <p className="text-sm font-bold text-blue-400">AI/LLM</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Focus</p>
                  <p className="text-sm font-bold text-emerald-400">Scalability</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Services;