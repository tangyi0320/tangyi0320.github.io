import React, { useState, useEffect } from 'react';
import Snow from './components/Snow';
import ChristmasTree from './components/ChristmasTree';
import VideoModal from './components/VideoModal';
import SettingsPanel from './components/SettingsPanel';
import { VideoConfig } from './types';

const App: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Default video (A nice Big Buck Bunny clip or similar harmless public video)
  const DEFAULT_VIDEO = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  
  const [currentVideoUrl, setCurrentVideoUrl] = useState(DEFAULT_VIDEO);

  // Initialize from URL parameters if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const videoParam = params.get('video');
    if (videoParam) {
      setCurrentVideoUrl(decodeURIComponent(videoParam));
    }
  }, []);

  // Handle configuration changes
  const handleConfigSave = (config: VideoConfig) => {
    if (config.sourceType === 'file' && config.file) {
      // Create a temporary object URL for local preview
      const objectUrl = URL.createObjectURL(config.file);
      setCurrentVideoUrl(objectUrl);
    } else if (config.sourceType === 'url') {
      setCurrentVideoUrl(config.url);
    }
  };

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (currentVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentVideoUrl);
      }
    };
  }, [currentVideoUrl]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden text-white font-sans selection:bg-red-500 selection:text-white">
      
      {/* Background Elements */}
      <Snow />
      
      {/* Moon */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-100 rounded-full blur-[2px] shadow-[0_0_50px_rgba(255,255,200,0.3)] opacity-80 z-0 animate-pulse"></div>

      {/* Main Content */}
      <main className="z-10 flex flex-col items-center text-center p-4">
        <h1 className="font-christmas text-5xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 drop-shadow-lg animate-pulse tracking-wide">
          Merry Christmas!
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-md mb-8 opacity-90 leading-relaxed">
          We have a special surprise for you. <br/>
          <span className="text-yellow-300 font-bold border-b-2 border-yellow-300/30">Tap the glowing star</span> on the tree.
        </p>

        {/* The Tree */}
        <div className="transform scale-90 md:scale-100 transition-transform duration-500 hover:scale-105">
           <ChristmasTree onStarClick={() => setIsVideoOpen(true)} />
        </div>
      </main>

      {/* Video Overlay */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl={currentVideoUrl}
      />

      {/* Settings for the user to upload/change video */}
      <SettingsPanel onSave={handleConfigSave} currentVideoUrl={currentVideoUrl} />
      
      {/* Footer */}
      <footer className="absolute bottom-2 w-full text-center text-slate-600 text-xs z-10 font-christmas tracking-widest opacity-60">
        MADE WITH ❤️ FOR THE HOLIDAYS
      </footer>
    </div>
  );
};

export default App;