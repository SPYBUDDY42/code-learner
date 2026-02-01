
import React, { useState } from 'react';
import { Icons } from '../constants';
import { sounds } from '../services/soundService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
  isSaving?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, username, isSaving }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  const toggleAudio = () => {
    const newVal = !audioEnabled;
    setAudioEnabled(newVal);
    sounds.setEnabled(newVal);
    if (newVal) sounds.playUI('click');
  };

  const menuItems = [
    { id: 'map', icon: Icons.Map, label: 'World Map' },
    { id: 'profile', icon: Icons.User, label: 'Operator' },
    { id: 'leaderboard', icon: Icons.Award, label: 'Elite Rank' },
    { id: 'settings', icon: Icons.Shield, label: 'Security' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    sounds.playUI('click');
  };

  return (
    <div className="w-20 md:w-64 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 flex flex-col items-center py-8 z-50">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center neon-border transform hover:scale-105 transition-transform cursor-pointer">
          <span className="font-orbitron font-bold text-black text-2xl">C</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            onMouseEnter={() => sounds.playUI('hover')}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
              activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
            }`}
          >
            <item.icon />
            <span className={`hidden md:block font-medium ${activeTab === item.id ? 'neon-text-cyan' : ''}`}>
              {item.label}
            </span>
            {activeTab === item.id && (
               <div className="hidden md:block ml-auto w-1 h-1 rounded-full bg-cyan-400 neon-border animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto w-full px-2 space-y-4">
        {/* Audio Toggle */}
        <button 
          onClick={toggleAudio}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
            audioEnabled ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' : 'border-slate-800 text-slate-600'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {audioEnabled ? (
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm3 8.77c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.50-2.25 2.50-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>
            ) : (
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Neural Link Audio</span>
        </button>

        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1 hidden md:flex">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Mainframe Link</div>
            {isSaving && (
              <span className="text-[8px] text-orange-400 animate-pulse font-bold">SYNCING...</span>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${isSaving ? 'bg-orange-500 animate-ping' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
            <div className="text-xs text-slate-300 truncate font-mono hidden md:block">
               {isSaving ? 'UPLINK_ACTIVE' : username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
