// Web Audio Procedural Sound Engine for Neo-Noir Atmosphere

class NeoNoirAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isAmbiencePlaying: boolean = false;
  private ambientTimer: number | null = null;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.5;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.7;
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolumes(master: number, music: number, sfx: number) {
    this.initContext();
    if (!this.masterGain || !this.musicGain || !this.sfxGain) return;
    this.masterGain.gain.value = (master / 100) * (this.isMuted ? 0 : 1);
    this.musicGain.gain.value = music / 100;
    this.sfxGain.gain.value = sfx / 100;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 0.8;
    }
    return this.isMuted;
  }

  // --- PROCEDURAL AMBIENCE (Rain + Low Noir Drone + Occasional Jazz Piano) ---
  public startNoirAmbience() {
    this.initContext();
    if (this.isAmbiencePlaying || !this.ctx || !this.musicGain) return;
    this.isAmbiencePlaying = true;

    // Continuous Sub-Bass Noir Drone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.value = 55; // A1
    osc2.type = 'sine';
    osc2.frequency.value = 82.4; // E2

    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 3;

    droneGain.gain.value = 0.25;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(this.musicGain);

    osc1.start();
    osc2.start();

    // Occasional Melancholic Piano Chords in background
    const pianoNotes = [
      [220, 261.63, 329.63, 392], // Am7
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [196, 246.94, 293.66, 349.23], // G7
      [164.81, 207.65, 246.94, 329.63], // E7
      [146.83, 174.61, 220, 261.63] // Dm7
    ];

    let chordIdx = 0;
    const playChordCycle = () => {
      if (!this.isAmbiencePlaying || !this.ctx) return;
      const chord = pianoNotes[chordIdx % pianoNotes.length];
      chordIdx++;
      this.playNoirChord(chord, 3.5);
      
      const nextDelay = 7000 + Math.random() * 4000;
      this.ambientTimer = window.setTimeout(playChordCycle, nextDelay);
    };

    this.ambientTimer = window.setTimeout(playChordCycle, 2000);
  }

  private playNoirChord(freqs: number[], durationSec: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08); // slight arpeggio stagger

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + durationSec);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1 + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain!);

      osc.start(now + i * 0.08);
      osc.stop(now + durationSec + 0.5);
    });
  }

  // --- SOUND EFFECTS ---

  // Evidence Discovery Chime (warm brass harmonics)
  public playEvidenceDiscovered() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.07);

      g.gain.setValueAtTime(0, now + idx * 0.07);
      g.gain.linearRampToValueAtTime(0.25, now + idx * 0.07 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 1.2);

      osc.connect(g);
      g.connect(this.sfxGain!);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 1.3);
    });
  }

  // Typewriter Key Click
  public playTypewriter() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    g.gain.setValueAtTime(0.09, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(g);
    g.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Mentalist Heartbeat Pulse (during Baseline Observation)
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Double thump (lub-dub)
    [0, 0.15].forEach((offset) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, now + offset);
      osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.12);

      g.gain.setValueAtTime(0.3, now + offset);
      g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);

      osc.connect(g);
      g.connect(this.sfxGain!);

      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  // Psychological Bluff Stinger (tense dissonant riser)
  public playBluffStinger(success: boolean) {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    if (success) {
      // Dark resolving chord with brass impact
      const freqs = [110, 220, 277.18, 329.63, 440];
      freqs.forEach((f) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.2, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(g);
        g.connect(this.sfxGain!);

        osc.start(now);
        osc.stop(now + 1.9);
      });
    } else {
      // Dissonant fail screech
      const freqs = [300, 318, 450, 477];
      freqs.forEach((f) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(g);
        g.connect(this.sfxGain!);

        osc.start(now);
        osc.stop(now + 0.9);
      });
    }
  }

  // Mind Palace Node Connected
  public playNodeConnect() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(g);
    g.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Dramatic Gavel / Accusation Stinger
  public playAccusationStrike() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Deep sub boom
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(100, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.8);
    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 1.3);

    // Dramatic brass triad
    [220, 277.18, 329.63].forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc.connect(g);
      g.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 1.6);
    });
  }

  // Paper rustle / Notebook flip
  public playPaperRustle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.value = 1.2;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }
}

export const audioEngine = new NeoNoirAudioEngine();
