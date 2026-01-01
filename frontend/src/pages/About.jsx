import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen pt-28 px-6 md:px-16 bg-[#0c0c0c] text-gray-200">
      <div className="max-w-4xl mx-auto">

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Home
        </Link>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold mb-6
          text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        >
          About Me
        </h1>

        {/* Image */}
        <div className="mb-8 flex justify-center">
          <img
            src="/Cozy coding in a warm room.png"
            alt="Cozy coding"
            className="rounded-2xl shadow-lg max-w-full md:max-w-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed text-gray-300 mb-4">
          Hi, I’m <span className="text-white font-semibold">Saurabh Singh Rajput</span> — 
          the developer and designer behind this platform.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mb-4">
          I’m a <span className="text-white font-semibold">2nd year student at IIIT Bhagalpur</span>, 
          passionate about building real-world web applications and exploring modern technology stacks.
          This project is designed and developed entirely by me as a part of my learning and growth journey.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mb-4">
          I enjoy diving deep into frontend and backend development, understanding systems from the ground up,
          and constantly pushing myself to learn something new every day.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mb-6">
          Along the way, I’ve also had the opportunity to guide and support many juniors in their journey of
          web development — sharing knowledge, clearing doubts, and helping them build confidence through
          practical learning.
        </p>

        <p className="text-lg leading-relaxed text-gray-300">
          This blog space reflects my curiosity, consistency, and commitment to growth —
          a place where I share ideas, experiences, and lessons learned while building in public.
        </p>

      </div>
    </div>
  );
};

export default About;
