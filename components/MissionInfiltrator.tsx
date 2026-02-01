
import React, { useState, useEffect, useRef } from 'react';
import { Mission, UserProfile, TutorialStep } from '../types';
import { getMentorResponse, getDiagnosticHint, validateCodeSolution } from '../services/geminiService';
import { sounds } from '../services/soundService';

interface MissionInfiltratorProps {
  mission: Mission;
  user: UserProfile;
  onComplete: (missionId: string, xpReward: number) => void;
  onExit: () => void;
}

type MissionMode = 'tutorial' | 'challenge';

const MissionInfiltrator: React.FC<MissionInfiltratorProps> = ({ mission, user, onComplete, onExit }) => {
  const [mode, setMode] = useState<MissionMode>(mission.isBoss ? 'challenge' : 'tutorial');
  const [code, setCode] = useState(mission.starterCode);
  const [output, setOutput] = useState<string[]>(mission.isBoss ? ['[CRITICAL] UNAUTHORIZED ACCESS DETECTED.', '[OVERLORD] You are not welcome here.'] : ['[SYSTEM] Protocol Ready.']);
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Mistake tracking state
  const [mistakeRegistry, setMistakeRegistry] = useState<Record<string, number>>({});
  
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { 
      role: 'assistant', 
      content: mission.isBoss 
        ? `Look at you, ${user.username}... struggling with basic logic. This mainframe is my domain. You are nothing but a bug in my code. Turn back before I wipe your drive.`
        : `Focus on the code blocks in Step 1. Copy them to the editor, test them, then hit Step 2 to solve the actual hack.` 
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Handle Boss Ambience and Initialization
  useEffect(() => {
    if (mission.isBoss) {
      sounds.startBossAmbience();
    }
    return () => {
      sounds.stopBossAmbience();
    };
  }, [mission.isBoss]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (mission.isBoss && aiChat[aiChat.length - 1].role === 'assistant') {
      sounds.playGlitch();
    }
  }, [aiChat]);

  const injectCode = (snippet: string) => {
    sounds.playUI('inject');
    setCode(snippet);
    setStatus('idle');
    setOutput(prev => [...prev, `[SYSTEM] Code loaded.`]);
  };

  const runCode = () => {
    sounds.playUI('compile');
    setIsCompiling(true);
    setStatus('idle');
    setOutput(prev => [...prev, `> Executing Payload...`]);
    
    setTimeout(async () => {
      if (mode === 'tutorial') {
        sounds.playUI('click');
        setOutput(prev => [...prev, '> Tutorial test: OK.', '> Now go to "2. Hack" and complete the challenge.']);
        setStatus('idle');
        setIsCompiling(false);
      } else {
        // Pre-check keywords to save on AI calls
        const hasKeywords = mission.solutionKeywords.every(keyword => 
          code.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasKeywords) {
          sounds.playError();
          setStatus('error');
          setOutput(prev => [...prev, `> STATUS: REJECTED.`, `> Error: Missing required system modules (Keywords).`]);
          setIsCompiling(false);
          return;
        }

        setOutput(prev => [...prev, `> Performing Logic Integrity Scan...`]);
        
        // Deep AI logic validation
        const validation = await validateCodeSolution(
          mission.id.startsWith('py') ? 'Python' : 
          mission.id.startsWith('js') ? 'JavaScript' : 
          mission.id.startsWith('sql') ? 'SQL' : 
          mission.id.startsWith('rs') ? 'Rust' : 'Code',
          mission.challengeGoal,
          code,
          mission.solutionKeywords
        );

        if (validation.success) {
          sounds.playSuccess();
          setStatus('success');
          setOutput(prev => [...prev, `> STATUS: SUCCESS.`, `> ${validation.message}`, mission.isBoss ? '> THE OVERLORD HAS FALLEN.' : '> MISSION COMPLETE.']);
        } else {
          sounds.playError();
          setStatus('error');
          
          const normalizedCode = code.trim();
          const currentMistakeCount = (mistakeRegistry[normalizedCode] || 0) + 1;
          
          setMistakeRegistry(prev => ({
            ...prev,
            [normalizedCode]: currentMistakeCount
          }));

          setOutput(prev => [...prev, `> STATUS: REJECTED.`, `> Logic Failure: ${validation.message}`]);

          // Trigger AI Diagnostic if same mistake > 3 times
          if (currentMistakeCount > 3) {
            setOutput(prev => [...prev, `[DIAGNOSTIC] Repeated failure detected...`, `[DIAGNOSTIC] Initiating Proactive Code Analysis...`]);
            setIsThinking(true);
            
            const diagnosticHint = await getDiagnosticHint(
              mission.title,
              code,
              mission.challengeGoal,
              mission.solutionKeywords,
              mission.isBoss
            );
            
            setAiChat(prev => [...prev, { 
              role: 'assistant', 
              content: `[DIAGNOSTIC OVERRIDE] ${diagnosticHint}` 
            }]);
            
            setIsThinking(false);
            setMistakeRegistry(prev => ({ ...prev, [normalizedCode]: 0 }));
          }
        }
        setIsCompiling(false);
      }
    }, 1500);
  };

  const handleAiAsk = async () => {
    if (!aiInput.trim()) return;
    sounds.playUI('click');
    const userMsg = aiInput;
    setAiInput('');
    setAiChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsThinking(true);

    const response = await getMentorResponse(mission.title, code, userMsg, mission.story, mission.isBoss);
    setAiChat(prev => [...prev, { role: 'assistant', content: response }]);
    setIsThinking(false);
  };

  const themeText = mission.isBoss ? 'text-pink-400' : 'text-cyan-400';

  return (
    <div className={`fixed inset-0 bg-[#050505] z-[100] flex flex-col animate-in fade-in duration-300 ${mission.isBoss ? 'border-4 border-pink-600/30' : ''}`}>
      {/* Header */}
      <div className={`h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-black/60 backdrop-blur-md`}>
        <div className="flex items-center gap-4">
          <button onClick={() => { sounds.playUI('click'); onExit(); }} className="text-slate-500 hover:text-white transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-6 w-px bg-slate-800"></div>
          <h1 className={`font-orbitron font-bold text-xs tracking-widest uppercase ${themeText}`}>
            {mission.isBoss ? 'BOSS ENCOUNTER: ' : ''}{mission.title}
          </h1>
        </div>

        {!mission.isBoss && (
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onMouseEnter={() => sounds.playUI('hover')}
              onClick={() => { sounds.playUI('click'); setMode('tutorial'); }}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                mode === 'tutorial' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-slate-500'
              }`}
            >
              1. Learn
            </button>
            <button 
              onMouseEnter={() => sounds.playUI('hover')}
              onClick={() => { sounds.playUI('click'); setMode('challenge'); }}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                mode === 'challenge' ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'text-slate-500'
              }`}
            >
              2. Hack
            </button>
          </div>
        )}

        {mission.isBoss && (
          <div className="px-4 py-2 bg-pink-600/10 border border-pink-500/50 rounded-xl relative overflow-hidden group">
             <span className="text-pink-500 font-orbitron font-black text-[10px] tracking-widest animate-pulse uppercase relative z-10">Hostile Protocol Active</span>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        )}

        <div className="flex items-center gap-4">
          {status === 'success' ? (
            <button 
              onClick={() => { sounds.playUI('click'); onComplete(mission.id, mission.xpReward); }}
              className="px-6 py-2.5 bg-green-500 text-black font-orbitron font-black text-[11px] uppercase tracking-widest rounded-xl animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              Exfiltrate Rewards
            </button>
          ) : (
            <button 
              onClick={runCode}
              disabled={isCompiling}
              onMouseEnter={() => sounds.playUI('hover')}
              className={`px-8 py-2.5 rounded-xl font-orbitron font-black text-[11px] uppercase tracking-widest transition-all ${
                isCompiling 
                ? 'bg-slate-800 text-slate-600' 
                : mission.isBoss 
                  ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-pink-500 hover:scale-105 active:scale-95'
                  : 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400 hover:scale-105 active:scale-95'
              }`}
            >
              {isCompiling ? 'UPLINKING...' : mission.isBoss ? 'BYPASS OVERLORD' : 'RUN PAYLOAD'}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side */}
        <div className={`w-[380px] border-r border-slate-800 flex flex-col bg-slate-950/80 ${mission.isBoss ? 'shadow-[10px_0_30px_rgba(0,0,0,0.5)]' : ''}`}>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {mode === 'tutorial' ? (
              <div className="animate-in slide-in-from-left duration-300">
                <div className="mb-6">
                  <h2 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1">Step 1: Infiltration Guide</h2>
                  <p className="text-slate-400 text-sm italic leading-relaxed">Copy and test these logic snippets to understand the vulnerability.</p>
                </div>

                <div className="space-y-4">
                  {mission.tutorialSteps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-all group">
                      <p className="text-xs text-slate-300 mb-4">{step.text}</p>
                      <button 
                        onMouseEnter={() => sounds.playUI('hover')}
                        onClick={() => injectCode(step.codeSnippet)}
                        className="w-full py-3 bg-slate-800 text-cyan-400 font-mono text-[11px] rounded-lg border border-slate-700 group-hover:bg-slate-700 transition-all text-left px-4 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {step.codeSnippet}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right duration-300 space-y-6">
                <div>
                  <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${mission.isBoss ? 'text-pink-500' : 'text-pink-500'}`}>
                    {mission.isBoss ? 'BOSS OBJECTIVE' : 'CHALLENGE OBJECTIVE'}
                  </h2>
                  <div className={`${mission.isBoss ? 'bg-pink-500/10 border-pink-500/30' : 'bg-slate-900 border-slate-800'} p-5 rounded-2xl border relative`}>
                    {mission.isBoss && <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-500/40 animate-pulse"></div>}
                    <p className="text-slate-200 text-sm leading-relaxed font-medium">
                      {mission.challengeGoal}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <h3 className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-3">Requirements Check</h3>
                  <div className="space-y-2">
                    {mission.solutionKeywords.map((kw, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${code.toLowerCase().includes(kw.toLowerCase()) ? (mission.isBoss ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]') : 'bg-slate-700'}`}></div>
                        <span className={`text-xs font-mono transition-colors duration-300 ${code.toLowerCase().includes(kw.toLowerCase()) ? 'text-slate-200' : 'text-slate-500'}`}>{kw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Hint Section */}
          <div className={`h-48 border-t border-slate-800 bg-black/40 p-4 flex flex-col transition-all ${mission.isBoss ? 'border-pink-900/40 bg-pink-950/10 boss-shake' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-black uppercase tracking-widest ${mission.isBoss ? 'text-pink-500' : 'text-slate-600'}`}>
                {mission.isBoss ? 'SYSTEM OVERLORD' : 'NEO MENTOR'}
              </span>
            </div>
            <div className={`flex-1 overflow-y-auto mb-2 pr-1 scrollbar-none text-[11px] leading-relaxed italic ${mission.isBoss ? 'text-pink-400 font-bold glitch-text' : 'text-slate-400'}`}>
               {aiChat[aiChat.length - 1].content}
               {isThinking && <span className={`ml-2 animate-pulse ${mission.isBoss ? 'text-pink-500' : 'text-cyan-500'}`}>...</span>}
            </div>
            <div className="relative">
              <input 
                type="text"
                placeholder={mission.isBoss ? "Beg for mercy..." : "Request tactical support..."}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                className={`w-full bg-slate-900 border rounded-lg px-3 py-1.5 text-[11px] text-white focus:outline-none transition-all ${mission.isBoss ? 'border-pink-800/50 focus:border-pink-500' : 'border-slate-800 focus:border-cyan-500'}`}
              />
            </div>
          </div>
        </div>

        {/* Editor Side */}
        <div className="flex-1 flex flex-col bg-[#080808]">
          <div className="h-8 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 justify-between">
            <div className={`text-[9px] font-mono tracking-widest uppercase ${mission.isBoss ? 'text-pink-500 font-bold' : 'text-slate-600'}`}>
              {mission.isBoss ? 'CRITICAL_BUFFER // CORRUPTED' : 'Standard Buffer // Active'}
            </div>
            <div className="text-[9px] text-slate-700 font-mono">UTF-8</div>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); setStatus('idle'); }}
              className={`absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-sm focus:outline-none resize-none leading-relaxed transition-colors ${mission.isBoss ? 'text-pink-400/90' : 'text-cyan-400/90'}`}
              spellCheck={false}
            />
          </div>

          <div className="h-32 border-t border-slate-800 bg-black/60 p-4 font-mono text-[11px] overflow-y-auto">
            <div className="text-[9px] text-slate-700 font-bold uppercase mb-2 tracking-widest">Diagnostic Log</div>
            {output.map((line, i) => (
              <div key={i} className={`mb-1 ${
                line.includes('SUCCESS') ? 'text-green-400' :
                line.includes('ERROR') || line.includes('UNAUTHORIZED') || line.includes('WARNING') || line.includes('REJECTED') ? 'text-red-400' :
                line.includes('[DIAGNOSTIC]') ? 'text-orange-400 font-bold' :
                line.startsWith('>') || line.startsWith('[OVERLORD]') ? (mission.isBoss ? 'text-pink-500' : 'text-cyan-500') : 'text-slate-600'
              }`}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionInfiltrator;
