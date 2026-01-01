import React from 'react';
import heroImg from "../images/hero.gif";

const Hero = () => {
  return (
    <section 
      className="hero flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-[100px] py-10 lg:py-0 pt-24 lg:pt-0 relative overflow-hidden bg-gradient-to-br from-[#0c0c0c] via-[#141414] to-[#1a1a1a]"
      style={{ height: "calc(100vh - 96px)" }}
    >
      {/* Background glow effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-500/30 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-pink-500/30 blur-[150px] rounded-full"></div>

      {/* Left content */}
      <div className="left w-full lg:w-[50%] text-center lg:text-left relative z-10">
        <h3 
          className="text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold leading-tight text-white"
        >
          Unlock the Secrets to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
            Masterful
          </span>{" "}
          Programming Here.
        </h3>

        <div className="flex flex-wrap justify-center lg:justify-start mt-8 gap-4">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg border border-purple-400/50 text-white font-semibold hover:bg-purple-500/10 hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Right image */}
      <div className="right w-full lg:w-[50%] flex justify-center relative z-10">
        <img 
          className="rounded-2xl w-full max-w-[500px] shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-105 transition-transform duration-500"
          src={heroImg} 
          alt="Hero Illustration"
        />
      </div>
    </section>
  );
};

export default Hero;