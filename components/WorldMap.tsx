
import React from 'react';
import { WORLDS_DATA } from '../constants';
import { LanguageType } from '../types';
import { sounds } from '../services/soundService';

interface WorldMapProps {
  onSelectWorld: (worldId: string) => void;
  completedMissionIds: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ onSelectWorld, completedMissionIds }) => {
  const handleSelect = (id: string) => {
    sounds.playUI('click');
    onSelectWorld(id);
  };

  return (
    <div className="p-8 cyber-grid min-h-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black font-orbitron text-white mb-2 tracking-tighter uppercase">
            Sector <span className="text-cyan-400 neon-text-cyan">Uplink</span>
          </h1>
          <p className="text-slate-400">Select a mainframe to infiltrate. Each world yields specific power.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {WORLDS_DATA.map((world) => {
            const completedCount = world.missions.filter(m => completedMissionIds.includes(m.id)).length;
            const progress = world.missions.length > 0 ? (completedCount / world.missions.length) * 100 : 0;
            const isMaster = world.id === 'w_fullstack';
            
            return (
              <div 
                key={world.id}
                onMouseEnter={() => world.isUnlocked && sounds.playUI('hover')}
                onClick={() => world.isUnlocked && handleSelect(world.id)}
                className={`relative group p-5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  world.isUnlocked 
                    ? isMaster 
                      ? 'bg-slate-900 border-pink-500/50 hover:bg-slate-800 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:scale-105' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 hover:scale-105' 
                    : 'bg-slate-950/80 border-slate-900 grayscale pointer-events-none opacity-60'
                }`}
              >
                {!world.isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                    <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}

                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                    isMaster ? 'bg-pink-500 text-white' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {world.language}
                  </div>
                  {progress === 100 && (
                     <div className="text-green-500">
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                       </svg>
                     </div>
                  )}
                </div>

                <h3 className={`text-sm font-bold uppercase tracking-tight mb-2 group-hover:text-cyan-300 transition-colors ${isMaster ? 'text-pink-400' : 'text-white'}`}>
                  {world.description}
                </h3>
                
                <div className="mt-6">
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${isMaster ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
