import React from 'react';
import { Star } from 'lucide-react';

interface ChristmasTreeProps {
  onStarClick: () => void;
}

const ChristmasTree: React.FC<ChristmasTreeProps> = ({ onStarClick }) => {
  return (
    <div className="relative flex flex-col items-center justify-center animate-float mt-10">
      {/* Star - The Interaction Point */}
      <div 
        onClick={onStarClick}
        className="relative z-20 cursor-pointer group transition-transform hover:scale-125 duration-300 -mb-2"
        title="Click me!"
      >
        <div className="absolute inset-0 bg-yellow-400 blur-lg rounded-full opacity-50 animate-pulse group-hover:opacity-80"></div>
        <Star 
          fill="#FACC15" 
          stroke="#EAB308" 
          size={64} 
          className="relative z-10 text-yellow-400 animate-twinkle drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
        />
        {/* Helper Text */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-32 hidden md:block">
           <div className="bg-white/90 text-slate-900 text-sm p-2 rounded-lg rounded-l-none relative animate-bounce">
              <span className="font-bold">Click me!</span> 🎁
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-white/90"></div>
           </div>
        </div>
      </div>

      {/* Tree Layers */}
      <div className="z-10 flex flex-col items-center drop-shadow-2xl">
        {/* Top Layer */}
        <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[80px] border-l-transparent border-r-transparent border-b-green-600 -mb-8 filter brightness-110"></div>
        
        {/* Middle Layer */}
        <div className="w-0 h-0 border-l-[90px] border-r-[90px] border-b-[100px] border-l-transparent border-r-transparent border-b-green-700 -mb-8"></div>
        
        {/* Bottom Layer */}
        <div className="w-0 h-0 border-l-[120px] border-r-[120px] border-b-[120px] border-l-transparent border-r-transparent border-b-green-800"></div>

        {/* Trunk */}
        <div className="w-16 h-20 bg-amber-900 rounded-b-lg shadow-inner"></div>
      </div>

      {/* Ornaments (Decorations) */}
      <div className="absolute top-[80px] left-[calc(50%-10px)] w-4 h-4 bg-red-500 rounded-full shadow-lg animate-ping duration-[3s]"></div>
      <div className="absolute top-[130px] left-[calc(50%+30px)] w-5 h-5 bg-blue-400 rounded-full shadow-lg"></div>
      <div className="absolute top-[150px] left-[calc(50%-40px)] w-5 h-5 bg-purple-400 rounded-full shadow-lg"></div>
      <div className="absolute top-[200px] left-[calc(50%+50px)] w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
      <div className="absolute top-[220px] left-[calc(50%-60px)] w-6 h-6 bg-yellow-300 rounded-full shadow-lg"></div>
      
      {/* Shadow on ground */}
      <div className="w-64 h-8 bg-black/30 rounded-[100%] blur-md mt-[-10px]"></div>
    </div>
  );
};

export default ChristmasTree;