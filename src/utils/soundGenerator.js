class SoundGenerator {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.nodes = {
      wind: null,
      rain: null,
      birds: null,
      gainWind: null,
      gainRain: null,
      gainBirds: null,
    };
    this.timers = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported in this browser");
      return;
    }
    this.ctx = new AudioContextClass();
    this.setupNodes();
  }

  setupNodes() {
    // Master volume
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Wind Gain
    this.nodes.gainWind = this.ctx.createGain();
    this.nodes.gainWind.gain.setValueAtTime(0, this.ctx.currentTime);
    this.nodes.gainWind.connect(this.masterGain);

    // Rain Gain
    this.nodes.gainRain = this.ctx.createGain();
    this.nodes.gainRain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.nodes.gainRain.connect(this.masterGain);

    // Birds Gain
    this.nodes.gainBirds = this.ctx.createGain();
    this.nodes.gainBirds.gain.setValueAtTime(0, this.ctx.currentTime);
    this.nodes.gainBirds.connect(this.masterGain);
  }

  // Helper to generate white noise
  createNoiseBuffer() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  // Helper to generate pink noise
  createPinkNoiseBuffer() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // rough compensation
      b6 = white * 0.115926;
    }
    return noiseBuffer;
  }

  startWind() {
    if (!this.ctx) this.init();
    if (this.nodes.wind) return;

    const windBuffer = this.createPinkNoiseBuffer();
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = windBuffer;
    windSource.loop = true;

    // Filter to shape wind sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Modulate filter frequency (LFO) to simulate gusts
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.07, this.ctx.currentTime); // slow wind oscillations
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime); // frequency swing in Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    windSource.connect(filter);
    filter.connect(this.nodes.gainWind);

    lfo.start();
    windSource.start();

    this.nodes.wind = { source: windSource, filter, lfo };
  }

  startRain() {
    if (!this.ctx) this.init();
    if (this.nodes.rain) return;

    const rainBuffer = this.createNoiseBuffer();
    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = rainBuffer;
    rainSource.loop = true;

    // Bandpass filter to make noise sound like rain hitting leaves/soil
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.6, this.ctx.currentTime);

    // Dynamic gain node to add slight rustling fluctuation
    const flutterLfo = this.ctx.createOscillator();
    flutterLfo.frequency.setValueAtTime(8, this.ctx.currentTime); // fast flutter
    const flutterGain = this.ctx.createGain();
    flutterGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    rainSource.connect(filter);
    filter.connect(this.nodes.gainRain);
    
    rainSource.start();
    this.nodes.rain = { source: rainSource, filter };
  }

  startBirds() {
    if (!this.ctx) this.init();
    
    const triggerChirp = () => {
      if (!this.isPlaying) return;
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = Math.random() > 0.4 ? 'sine' : 'triangle';
      
      const baseFreq = 2200 + Math.random() * 1200;
      osc.frequency.setValueAtTime(baseFreq, now);
      
      const chirpType = Math.floor(Math.random() * 3);
      const duration = 0.08 + Math.random() * 0.12;
      
      if (chirpType === 0) {
        // Fast sweep up
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + duration);
      } else if (chirpType === 1) {
        // Fast sweep down
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 600, now + duration);
      } else {
        // Vibrato / quick shake
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.linearRampToValueAtTime(baseFreq + 200, now + duration * 0.3);
        osc.frequency.linearRampToValueAtTime(baseFreq - 200, now + duration * 0.7);
        osc.frequency.linearRampToValueAtTime(baseFreq, now + duration);
      }

      // Envelope: smooth fade-in, fast decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.nodes.gainBirds);
      osc.start(now);
      osc.stop(now + duration + 0.05);

      // Re-schedule chirp randomly
      const nextTime = 1500 + Math.random() * 3500;
      const timerId = setTimeout(triggerChirp, nextTime);
      this.timers.push(timerId);
    };

    triggerChirp();
  }

  clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  setVolume(source, volume) {
    if (!this.ctx) return;
    const gainNode = this.nodes[`gain${source.charAt(0).toUpperCase() + source.slice(1)}`];
    if (gainNode) {
      gainNode.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.2);
    }
  }

  setMasterVolume(volume) {
    if (!this.ctx) return;
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.1);
    }
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.startWind();
    this.startRain();
    this.startBirds();
  }

  stop() {
    this.isPlaying = false;
    this.clearTimers();
    
    if (this.nodes.wind) {
      try { this.nodes.wind.source.stop(); } catch(e) {}
      try { this.nodes.wind.lfo.stop(); } catch(e) {}
      this.nodes.wind = null;
    }
    if (this.nodes.rain) {
      try { this.nodes.rain.source.stop(); } catch(e) {}
      this.nodes.rain = null;
    }
    
    if (this.nodes.gainWind) this.nodes.gainWind.gain.setValueAtTime(0, this.ctx.currentTime);
    if (this.nodes.gainRain) this.nodes.gainRain.gain.setValueAtTime(0, this.ctx.currentTime);
    if (this.nodes.gainBirds) this.nodes.gainBirds.gain.setValueAtTime(0, this.ctx.currentTime);
  }

  adjustForBiome(biome) {
    if (!this.isPlaying) return;
    switch (biome) {
      case 'rainforest':
        this.setVolume('wind', 0.1);
        this.setVolume('rain', 0.6);
        this.setVolume('birds', 0.08);
        break;
      case 'meadow':
        this.setVolume('wind', 0.55);
        this.setVolume('rain', 0.0);
        this.setVolume('birds', 0.15);
        break;
      case 'redwood':
        this.setVolume('wind', 0.25);
        this.setVolume('rain', 0.0);
        this.setVolume('birds', 0.6);
        break;
      case 'glen':
        this.setVolume('wind', 0.15);
        this.setVolume('rain', 0.08);
        this.setVolume('birds', 0.04);
        break;
      default:
        break;
    }
  }
}

export const soundManager = new SoundGenerator();
