
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { sounds } from '../services/soundService';

interface AuthSystemProps {
  onLogin: (user: UserProfile) => void;
}

const AuthSystem: React.FC<AuthSystemProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/pixel-art/svg?seed=Ghost');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'standard' | 'google'>('standard');

  const handleGoogleLogin = () => {
    sounds.playUI('click');
    setError('');
    setIsLoading(true);
    setAuthMethod('google');

    // Simulated Google OAuth Handshake
    setTimeout(() => {
      const googleUser: UserProfile = {
        username: 'Google_Operator_' + Math.floor(Math.random() * 999),
        level: 1,
        xp: 0,
        streak: 1,
        badges: ['Google Verified', 'New Recruit'],
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        completedMissionIds: []
      };

      const storedUsers = JSON.parse(localStorage.getItem('cb_users') || '[]');
      const existingUser = storedUsers.find((u: any) => u.username === googleUser.username);
      
      if (!existingUser) {
        localStorage.setItem('cb_users', JSON.stringify([...storedUsers, googleUser]));
      }

      sounds.playSuccess();
      onLogin(existingUser || googleUser);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playUI('compile');
    setError('');
    setIsLoading(true);
    setAuthMethod('standard');

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('cb_users') || '[]');

      if (isLogin) {
        const user = storedUsers.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        if (user) {
          sounds.playSuccess();
          onLogin(user);
        } else {
          sounds.playError();
          setError('ACCESS DENIED: Identity signature mismatch.');
          setIsLoading(false);
        }
      } else {
        if (storedUsers.some((u: any) => u.username.toLowerCase() === username.toLowerCase())) {
          sounds.playError();
          setError('ERROR: Codename already taken in this sector.');
          setIsLoading(false);
        } else {
          const newUser: UserProfile = {
            username,
            password,
            level: 1,
            xp: 0,
            streak: 1,
            badges: ['New Recruit'],
            avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
            completedMissionIds: []
          };
          localStorage.setItem('cb_users', JSON.stringify([...storedUsers, newUser]));
          sounds.playSuccess();
          onLogin(newUser);
        }
      }
    }, 1500);
  };

  const toggleForm = () => {
    sounds.playUI('click');
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-4 cyber-grid">
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-pulse"></div>
      
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
           <div className="w-full h-[1px] bg-cyan-400 absolute top-0 animate-[scan_4s_linear_infinite]"></div>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500 mx-auto mb-4 flex items-center justify-center neon-border transform -rotate-12 transition-transform hover:rotate-0 cursor-pointer">
            <span className="font-orbitron font-black text-black text-3xl">C</span>
          </div>
          <h1 className="text-2xl font-orbitron font-black text-white tracking-tighter mb-1 uppercase">
            {isLogin ? 'Neural Uplink' : 'Initialize Protocol'}
          </h1>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">
            {isLogin ? 'Establish secure connection' : 'Create new operator profile'}
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            onMouseEnter={() => sounds.playUI('hover')}
            className="w-full py-3 bg-white hover:bg-slate-100 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
            {isLoading && authMethod === 'google' && (
               <div className="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>
            )}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-800"></div>
            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-slate-800"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operator Codename</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Neo_Cipher"
                className="w-full bg-black/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>

            {!isLogin && (
              <div className="space-y-1 animate-in slide-in-from-top duration-300">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Avatar Uplink (URL)</label>
                <input 
                  type="url" 
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-black/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-[10px] text-red-500 font-mono uppercase text-center animate-bounce">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => sounds.playUI('hover')}
              className="w-full py-4 bg-cyan-500 text-black font-orbitron font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading && authMethod === 'standard' ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  INFILTRATING...
                </span>
              ) : (
                isLogin ? 'ESTABLISH LINK' : 'INITIALIZE PROFILE'
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={toggleForm}
            className="text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
          >
            {isLogin ? "No identity signature? Register New Operator" : "Existing Identity? Access Uplink"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

export default AuthSystem;
