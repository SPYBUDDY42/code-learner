
class SoundService {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private bossOscillators: OscillatorNode[] = [];
  private bossGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) this.stopBossAmbience();
  }

  playUI(type: 'click' | 'hover' | 'inject' | 'compile' = 'click') {
    if (!this.enabled) return;
    this.initCtx();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    const now = this.ctx!.currentTime;

    if (type === 'click') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start();
      osc.stop(now + 0.05);
    } else if (type === 'inject') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start();
      osc.stop(now + 0.2);
    } else if (type === 'compile') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.5);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.25);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      osc.start();
      osc.stop(now + 0.5);
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    const now = this.ctx!.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.initCtx();
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.3);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(now + 0.3);
  }

  startBossAmbience() {
    if (!this.enabled) return;
    this.initCtx();
    this.stopBossAmbience();

    this.bossGain = this.ctx!.createGain();
    this.bossGain.gain.setValueAtTime(0, this.ctx!.currentTime);
    this.bossGain.gain.linearRampToValueAtTime(0.15, this.ctx!.currentTime + 2);
    this.bossGain.connect(this.ctx!.destination);

    // Deep sub-drone
    const osc1 = this.ctx!.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(40, this.ctx!.currentTime);
    
    // Gritty pulse
    const osc2 = this.ctx!.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(41, this.ctx!.currentTime);

    // LFO for tension
    const lfo = this.ctx!.createOscillator();
    lfo.frequency.setValueAtTime(0.5, this.ctx!.currentTime);
    const lfoGain = this.ctx!.createGain();
    lfoGain.gain.setValueAtTime(10, this.ctx!.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    osc1.connect(this.bossGain);
    osc2.connect(this.bossGain);
    
    osc1.start();
    osc2.start();
    lfo.start();

    this.bossOscillators = [osc1, osc2, lfo];
  }

  stopBossAmbience() {
    if (this.bossGain) {
      this.bossGain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.5);
      setTimeout(() => {
        this.bossOscillators.forEach(o => o.stop());
        this.bossOscillators = [];
        this.bossGain = null;
      }, 500);
    }
  }

  playGlitch() {
    if (!this.enabled) return;
    this.initCtx();
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(Math.random() * 2000 + 500, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(now + 0.05);
  }
}

export const sounds = new SoundService();
