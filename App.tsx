
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, World, Mission } from './types';
import { WORLDS_DATA } from './constants';
import Sidebar from './components/Sidebar';
import WorldMap from './components/WorldMap';
import PlayerProfile from './components/PlayerProfile';
import MissionInfiltrator from './components/MissionInfiltrator';
import AuthSystem from './components/AuthSystem';

const App: React.FC = () => {
  const [isAuthRequired, setIsAuthRequired] = useState(() => !localStorage.getItem('cb_session_active'));
  const [activeTab, setActiveTab] = useState('map');
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cb_user_progress');
    if (saved) return JSON.parse(saved);
    return {
      username: 'Ghost_Cipher',
      level: 1,
      xp: 0,
      streak: 1,
      badges: ['New Recruit'],
      avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Ghost',
      completedMissionIds: []
    };
  });

  // Auto-save effect: Runs whenever 'user' changes
  useEffect(() => {
    if (isAuthRequired) return;

    setIsSaving(true);
    
    // 1. Save current session for quick resume
    localStorage.setItem('cb_user_progress', JSON.stringify(user));

    // 2. Sync to global users database
    const timeout = setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('cb_users') || '[]');
      const updatedUsers = storedUsers.map((u: any) => 
        u.username.toLowerCase() === user.username.toLowerCase() ? { ...u, ...user } : u
      );
      
      // If user wasn't in db for some reason (e.g. guest mode), we don't force it here
      // but usually they come from AuthSystem
      localStorage.setItem('cb_users', JSON.stringify(updatedUsers));
      
      setIsSaving(false);
    }, 800); // Visual delay for hacker feel

    return () => clearTimeout(timeout);
  }, [user, isAuthRequired]);

  const handleLogin = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    localStorage.setItem('cb_session_active', 'true');
    setIsAuthRequired(false);
  };

  const handleSelectWorld = (worldId: string) => {
    setSelectedWorldId(worldId);
  };

  const handleStartMission = (mission: Mission) => {
    setActiveMission(mission);
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleMissionComplete = (missionId: string, xpReward: number) => {
    setUser(prev => {
      const isNewCompletion = !prev.completedMissionIds.includes(missionId);
      const newXp = isNewCompletion ? prev.xp + xpReward : prev.xp;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const newCompletedIds = isNewCompletion 
        ? [...prev.completedMissionIds, missionId] 
        : prev.completedMissionIds;

      // Logic for granting new badges on certain milestones
      const newBadges = [...prev.badges];
      if (newCompletedIds.length === 5 && !newBadges.includes('Fast Learner')) {
        newBadges.push('Fast Learner');
      }
      if (newLevel === 5 && !newBadges.includes('Elite Operative')) {
        newBadges.push('Elite Operative');
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedMissionIds: newCompletedIds,
        badges: newBadges
      };
    });
    setActiveMission(null);
  };

  if (isAuthRequired) {
    return <AuthSystem onLogin={handleLogin} />;
  }

  const currentWorld = WORLDS_DATA.find(w => w.id === selectedWorldId);

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        username={user.username}
        isSaving={isSaving}
      />

      <main className="flex-1 relative">
        {activeTab === 'map' && !selectedWorldId && (
          <WorldMap 
            onSelectWorld={handleSelectWorld} 
            completedMissionIds={user.completedMissionIds} 
          />
        )}

        {activeTab === 'map' && selectedWorldId && currentWorld && (
          <div className="p-8 cyber-grid min-h-full">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedWorldId(null)}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm uppercase tracking-widest font-bold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Sector Overview
              </button>

              <header className="mb-12">
                <h1 className="text-4xl font-black font-orbitron text-white mb-2 tracking-tighter">
                  WORLD: <span className="text-cyan-400 neon-text-cyan">{currentWorld.language.toUpperCase()}</span>
                </h1>
                <p className="text-slate-400 max-w-lg">{currentWorld.description}</p>
              </header>

              <div className="grid gap-6">
                {currentWorld.missions.map((mission, idx) => {
                  const isCompleted = user.completedMissionIds.includes(mission.id);
                  const isLocked = idx > 0 && !user.completedMissionIds.includes(currentWorld.missions[idx-1].id);
                  const isBoss = mission.isBoss;

                  return (
                    <div 
                      key={mission.id}
                      className={`group p-6 rounded-2xl border transition-all relative overflow-hidden ${
                        isLocked 
                        ? 'bg-slate-950/80 border-slate-900 opacity-60 pointer-events-none' 
                        : isBoss
                          ? 'bg-slate-900 border-pink-500/50 hover:border-pink-500 hover:bg-slate-800 shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                          : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800'
                      }`}
                    >
                      {isLocked && (
                        <div className="absolute right-6 top-6 text-slate-700">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-orbitron font-black text-lg transition-all ${
                             isCompleted 
                             ? isBoss ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                             : isBoss ? 'bg-pink-900/40 text-pink-400 border border-pink-500/30' : 'bg-slate-800 text-slate-500'
                           }`}>
                             {isBoss ? '☠' : idx + 1}
                           </div>
                           <div>
                             <h3 className={`text-xl font-bold mb-1 group-hover:text-white transition-colors ${isBoss ? 'text-pink-400' : 'text-white'}`}>
                               {mission.title}
                               {isBoss && <span className="ml-3 text-[9px] bg-pink-500 text-white px-2 py-0.5 rounded font-black tracking-tighter uppercase align-middle">Final Boss</span>}
                             </h3>
                             <p className="text-sm text-slate-500 line-clamp-1">{mission.description}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">XP Reward</div>
                             <div className={`text-xs font-bold uppercase ${isBoss ? 'text-pink-400' : 'text-cyan-400'}`}>+{mission.xpReward}</div>
                          </div>
                          <button 
                            onClick={() => handleStartMission(mission)}
                            className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest transition-all ${
                              isCompleted 
                              ? 'bg-slate-800 text-slate-400 hover:text-white' 
                              : isBoss
                                ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse'
                                : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                            }`}
                          >
                            {isCompleted ? 'Retry' : isBoss ? 'Boss Fight' : 'Infiltrate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <PlayerProfile user={user} onUpdateUser={handleUpdateUser} />
        )}
        
        {activeTab === 'leaderboard' && (
          <div className="flex items-center justify-center h-full cyber-grid">
            <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-3xl max-w-md">
              <div className="w-20 h-20 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-orbitron font-bold text-white mb-4 uppercase tracking-tighter">Leaderboards Locked</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed italic">The rankings mainframe is currently under heavy encryption. Only Tier-5 operators can decrypt the standings.</p>
              <button onClick={() => setActiveTab('map')} className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-orbitron font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                Back to Missions
              </button>
            </div>
          </div>
        )}
      </main>

      {activeMission && (
        <MissionInfiltrator 
          mission={activeMission}
          user={user}
          onExit={() => setActiveMission(null)}
          onComplete={handleMissionComplete}
        />
      )}
    </div>
  );
};

export default App;
