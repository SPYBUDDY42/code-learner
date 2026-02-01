
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PlayerProfileProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.username);
  
  const xpForNextLevel = 1000;
  const progress = (user.xp % xpForNextLevel) / xpForNextLevel * 100;

  const handleSaveName = () => {
    if (newName.trim() && newName !== user.username) {
      onUpdateUser({ username: newName.trim() });
    }
    setIsEditingName(false);
  };

  const handleCancel = () => {
    setNewName(user.username);
    setIsEditingName(false);
  };

  return (
    <div className="p-8 cyber-grid min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-black font-orbitron font-black px-3 py-1 rounded-full text-sm neon-border">
                LVL {user.level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-black/50 border border-cyan-500/50 rounded-lg px-3 py-1 font-orbitron font-black text-xl text-white focus:outline-none w-full max-w-[250px]"
                      autoFocus
                    />
                    <button 
                      onClick={handleSaveName}
                      className="p-1.5 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-all"
                      title="Save Codename"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="p-1.5 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-all"
                      title="Cancel"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-orbitron font-black text-white tracking-tighter">
                      {user.username.toUpperCase()}
                    </h2>
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="text-slate-600 hover:text-cyan-400 transition-colors"
                      title="Modify Identity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Elite Infiltrator // Sector 7</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">Sync Progress</span>
                  <span className="text-white font-mono">{user.xp} / {(user.level) * xpForNextLevel} XP</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center min-w-[120px]">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Streak</div>
                <div className="text-2xl font-orbitron font-bold text-orange-500 neon-text-pink">{user.streak} Days</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center min-w-[120px]">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Missions</div>
                <div className="text-2xl font-orbitron font-bold text-cyan-400">{user.completedMissionIds.length}</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-orbitron font-bold text-white mb-6 tracking-widest flex items-center gap-3">
          EXTRACTED <span className="text-pink-500">BADGES</span>
          <div className="h-px flex-1 bg-slate-800"></div>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {user.badges.map((badge, i) => (
            <div key={i} className="group aspect-square bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-pink-500/50 hover:bg-slate-800 transition-all cursor-default">
              <div className="w-12 h-12 mb-3 text-pink-500 group-hover:scale-110 transition-transform">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[10px] text-center font-bold uppercase tracking-widest text-slate-400">{badge}</span>
            </div>
          ))}
          {user.badges.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-600 font-mono text-xs italic">No trophies extracted yet. Complete missions to earn badges.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
