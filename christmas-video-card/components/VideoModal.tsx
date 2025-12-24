import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-4xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-[twinkle_0.5s_ease-out]">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
          <h3 className="text-white font-christmas text-2xl drop-shadow-md">Special Message for You</h3>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video w-full bg-black">
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full h-full object-contain"
            controls 
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;