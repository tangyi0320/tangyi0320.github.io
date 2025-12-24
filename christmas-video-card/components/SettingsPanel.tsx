import React, { useState, useEffect } from 'react';
import { Settings, Upload, Link, Check, X, Share2, AlertTriangle, ExternalLink } from 'lucide-react';
import { VideoConfig } from '../types';

interface SettingsPanelProps {
  onSave: (config: VideoConfig) => void;
  currentVideoUrl: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave, currentVideoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'file'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isPreviewEnv, setIsPreviewEnv] = useState(false);

  // Default sample video
  const DEFAULT_VIDEO = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  useEffect(() => {
    // Check if running in a common preview/dev environment
    const hostname = window.location.hostname;
    if (
      hostname.includes('localhost') || 
      hostname.includes('127.0.0.1') || 
      hostname.includes('.goog') || 
      hostname.includes('webcontainer') ||
      hostname.includes('stackblitz') ||
      hostname.includes('codesandbox')
    ) {
      setIsPreviewEnv(true);
    }
  }, []);

  const handleSave = () => {
    if (activeTab === 'url') {
      // Basic validation
      let finalUrl = urlInput.trim();
      if (finalUrl && !finalUrl.startsWith('http')) {
        alert("Video URL must start with http:// or https://");
        return;
      }

      onSave({
        sourceType: 'url',
        url: finalUrl || DEFAULT_VIDEO,
      });
    } else {
        onSave({
            sourceType: 'file',
            url: '',
            file: fileInput
        });
    }
    setIsOpen(false);
  };

  const generateShareLink = () => {
    // Only works for URLs, not local files
    const baseUrl = window.location.origin + window.location.pathname;
    const videoToShare = activeTab === 'url' && urlInput ? urlInput : (currentVideoUrl.startsWith('blob:') ? '' : currentVideoUrl);
    
    if (!videoToShare || videoToShare.startsWith('blob:')) {
      alert("To share a link, you must use the 'Public Link' option, not a local file.");
      return;
    }
    
    if (!videoToShare.startsWith('http')) {
       alert("Please enter a valid video URL starting with http:// or https://");
       return;
    }

    const shareUrl = `${baseUrl}?video=${encodeURIComponent(videoToShare)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white rounded-full transition-all z-40 backdrop-blur-md border border-white/10 shadow-lg"
        title="Customize & Share"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>

        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings size={20} className="text-slate-400"/> Settings
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex space-x-2 mb-6 bg-slate-800 p-1 rounded-lg shrink-0">
          <button 
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'url' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Link size={16} className="mr-2" /> Public Link
          </button>
          <button 
             onClick={() => setActiveTab('file')}
             className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'file' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Upload size={16} className="mr-2" /> Local File
          </button>
        </div>

        <div className="mb-6 min-h-[120px] overflow-y-auto">
          {activeTab === 'url' ? (
            <div className="animate-fade-in">
              <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider font-semibold">Video URL (MP4)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-slate-600 transition-all"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Paste a direct link to an .mp4 file (e.g., dropbox dl=1, or other hosting).
              </p>
              
              {/* Share Button Section */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                 {isPreviewEnv ? (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-left">
                        <div className="flex items-start gap-2 text-amber-500 text-xs font-bold mb-1">
                            <AlertTriangle size={14} className="mt-0.5"/>
                            <span>Link Sharing Unavailable</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                            You are currently in a private preview mode. Links generated here will not work for others.
                            <br/><br/>
                            <span className="text-white">To share:</span> Deploy this project (e.g., to Netlify) first, then open that live site to copy the link.
                        </p>
                    </div>
                 ) : (
                    <>
                        <button 
                        onClick={generateShareLink}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 border-dashed"
                        >
                        {copySuccess ? <Check size={16} /> : <Share2 size={16} />}
                        {copySuccess ? "Link Copied!" : "Copy Shareable Link"}
                        </button>
                        <p className="text-center text-[10px] text-slate-600 mt-1">
                        Generates a link with this video pre-loaded
                        </p>
                    </>
                 )}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider font-semibold">Select Video File</label>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 hover:border-slate-600 transition-all relative group cursor-pointer">
                 <input 
                    type="file" 
                    accept="video/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => setFileInput(e.target.files ? e.target.files[0] : null)}
                 />
                 <div className="p-3 bg-slate-800 rounded-full mb-3 group-hover:scale-110 transition-transform">
                   <Upload size={24} className="text-indigo-400" />
                 </div>
                 <p className="text-slate-300 text-sm font-medium truncate w-full px-4">
                    {fileInput ? fileInput.name : "Click to browse"}
                 </p>
                 <p className="text-slate-500 text-xs mt-1">Supports MP4, WebM</p>
              </div>
              <p className="text-orange-400/80 text-xs mt-3 flex items-start gap-1">
                <span>⚠️</span> Local files cannot be shared via link. They only work on this device.
              </p>
            </div>
          )}
        </div>

        <button 
            onClick={handleSave}
            className="w-full shrink-0 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-green-900/20"
        >
            <Check size={20} className="mr-2" /> Apply & Play
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;