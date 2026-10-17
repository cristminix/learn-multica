/**
 * RETRO CREATOR LANDING PAGE - CORE APPLICATION LOGIC
 * High-performance, modular retro interactive engine.
 * Supports audio synthesis, terminal emulation, visitor analytics,
 * guestbook management, and interactive creator utilities.
 */

// --- 1. VISITOR COUNTER MODULE ---
class VisitorCounter {
  constructor(storage = null, defaultStart = 42890) {
    this.storage = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.storageKey = 'retro_visitor_count';
    this.defaultStart = defaultStart;
  }

  getCounter() {
    if (!this.storage) return this.defaultStart;
    try {
      const stored = this.storage.getItem(this.storageKey);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        return isNaN(parsed) ? this.defaultStart : parsed;
      }
    } catch {
      // Graceful degradation on storage error
    }
    return this.defaultStart;
  }

  increment() {
    const current = this.getCounter();
    const next = current + 1;
    if (this.storage) {
      try {
        this.storage.setItem(this.storageKey, next.toString());
      } catch {
        // Ignore storage quotas / privacy modes
      }
    }
    return next;
  }

  formatDigits(num, minDigits = 6) {
    const str = Math.max(0, num).toString();
    return str.padStart(minDigits, '0');
  }
}

// --- 2. TIP JAR MODULE ---
class TipJar {
  constructor(storage = null) {
    this.storage = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.storageKey = 'retro_total_tips';
    this.historyKey = 'retro_tip_history';
  }

  getTotal() {
    if (!this.storage) return 1337;
    try {
      const val = this.storage.getItem(this.storageKey);
      if (val !== null) {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 1337 : parsed;
      }
    } catch {
      // Fallback
    }
    return 1337;
  }

  addTip(amount, donorName = 'Anonymous Gamer') {
    const cleanAmount = Math.max(0.01, parseFloat(amount) || 0);
    const newTotal = Math.round((this.getTotal() + cleanAmount) * 100) / 100;

    if (this.storage) {
      try {
        this.storage.setItem(this.storageKey, newTotal.toFixed(2));
        const history = this.getHistory();
        history.unshift({
          amount: cleanAmount,
          donor: donorName,
          timestamp: new Date().toISOString()
        });
        this.storage.setItem(this.historyKey, JSON.stringify(history.slice(0, 20)));
      } catch {
        // Storage error handling
      }
    }

    return { total: newTotal, added: cleanAmount, donor: donorName };
  }

  getHistory() {
    if (!this.storage) return [];
    try {
      const stored = this.storage.getItem(this.historyKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // Ignore parse error
    }
    return [];
  }

  formatCurrency(amount) {
    return '$' + Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

// --- 3. BBS GUESTBOOK MODULE ---
class GuestbookManager {
  constructor(storage = null) {
    this.storage = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.storageKey = 'retro_guestbook_entries';
    this.defaultEntries = [
      {
        id: 'msg-1',
        name: 'CyberSamurai_99',
        avatar: '👾',
        message: 'Your chiptune stream yesterday was legendary! The bassline at 01:24 melted my CRT monitor!',
        date: '1999-10-12 14:32'
      },
      {
        id: 'msg-2',
        name: 'PixelRanger',
        avatar: '🕹️',
        message: 'Bookmarked your shrine! Still rockin that Sound Blaster 16 in your setup?',
        date: '1999-10-12 11:15'
      },
      {
        id: 'msg-3',
        name: 'NeonDreamer',
        avatar: '📼',
        message: 'Greetings from the BBS underground! Drop by our IRC channel #retrowave soon!',
        date: '1999-10-11 20:04'
      }
    ];
  }

  getEntries() {
    if (!this.storage) return [...this.defaultEntries];
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return [...this.defaultEntries];
  }

  addEntry({ name, avatar, message }) {
    const cleanName = (name || '').trim().slice(0, 30) || 'Mystery Netizen';
    const cleanMsg = (message || '').trim().slice(0, 200);
    const cleanAvatar = avatar || '👾';

    if (!cleanMsg) {
      throw new Error('Message cannot be empty');
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name: cleanName,
      avatar: cleanAvatar,
      message: cleanMsg,
      date: formattedDate
    };

    const entries = this.getEntries();
    entries.unshift(newEntry);

    if (this.storage) {
      try {
        this.storage.setItem(this.storageKey, JSON.stringify(entries.slice(0, 50)));
      } catch {
        // Storage full or quota exceeded
      }
    }

    return newEntry;
  }

  deleteEntry(id) {
    let entries = this.getEntries();
    entries = entries.filter(e => e.id !== id);
    if (this.storage) {
      try {
        this.storage.setItem(this.storageKey, JSON.stringify(entries));
      } catch {
        // Fail-safe
      }
    }
    return entries;
  }

  resetDefaults() {
    if (this.storage) {
      try {
        this.storage.setItem(this.storageKey, JSON.stringify(this.defaultEntries));
      } catch {}
    }
    return [...this.defaultEntries];
  }
}

// --- 4. TERMINAL EMULATOR MODULE ---
class TerminalEmulator {
  constructor(creatorInfo = {}) {
    this.creator = Object.assign({
      handle: 'KIRA_NOVA',
      alias: 'Alex "Kira" Vance',
      role: 'Chiptune Composer, Indie Game Streamer & Pixel Artist',
      location: 'Sector 7, Neo-Kyoto (GMT+7)',
      status: 'TRANSMITTING OVER RETRO_OS v1.99',
      schedule: [
        'Tue 20:00 UTC - 16-bit Synth Sound Design & Tracker Jam',
        'Thu 19:30 UTC - Retro Speedruns & TurboGrafx-16 Gems',
        'Sat 21:00 UTC - Community Hangout & Pixel Art Live'
      ],
      specs: {
        'Main Rig': 'CyberTower Custom (Ryzen 9, RTX 4080, 64GB DDR5)',
        'Retro Rig': 'Commodore Amiga 1200 + Roland MT-32 Synth Module',
        'Audio Deck': 'Yamaha DX7 Synthesizer + Korg Volca FM + Scarlett 2i2',
        'Display': 'Sony Trinitron CRT 20" + Dual 27" 4K Monitors',
        'Microphone': 'Shure SM7B + Cloudlifter CL-1',
        'Software': 'MilkyTracker, DefleMask, Reaper, OBS Studio, Aseprite'
      },
      socials: {
        'Twitch': 'twitch.tv/kiranova_retro',
        'YouTube': 'youtube.com/@kiranova',
        'Discord': 'discord.gg/pixelvoid',
        'Bandcamp': 'kiranova.bandcamp.com',
        'GitHub': 'github.com/kiranova'
      }
    }, creatorInfo);

    this.history = [];
    this.historyIndex = -1;
  }

  execute(rawCommand) {
    const trimmed = (rawCommand || '').trim();
    if (!trimmed) return { text: '', type: 'empty' };

    this.history.push(trimmed);
    this.historyIndex = this.history.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        return {
          type: 'help',
          text: [
            'AVAILABLE COMMANDS IN RETRO_OS SHELL:',
            '  about      - Display creator background & bio',
            '  specs      - Show streaming rig & retro studio equipment',
            '  schedule   - View live stream broadcast schedule',
            '  socials    - List all official channel links',
            '  tracks     - Chiptune discography & sound bank',
            '  tip        - Show support instructions & coin drop info',
            '  echo <msg> - Print message to terminal buffer',
            '  date       - Output system timestamp',
            '  secret     - ??? Classified hacker subroutine',
            '  clear      - Clear terminal screen buffer'
          ].join('\n')
        };

      case 'about':
        return {
          type: 'about',
          text: [
            `IDENTITY: ${this.creator.handle} (${this.creator.alias})`,
            `MISSION:  ${this.creator.role}`,
            `ORIGIN:   ${this.creator.location}`,
            `STATE:    ${this.creator.status}`,
            'BIO:      Creating authentic FM-synthesis chiptune beats,',
            '          modding vintage electronics, and broadcasting nightly',
            '          retro adventures across the digital cosmos.'
          ].join('\n')
        };

      case 'specs': {
        const lines = ['--- CREATOR STUDIO GEAR & HARDWARE SPECS ---'];
        for (const [key, val] of Object.entries(this.creator.specs)) {
          lines.push(`  [+] ${key.padEnd(14, ' ')} : ${val}`);
        }
        return { type: 'specs', text: lines.join('\n') };
      }

      case 'schedule':
        return {
          type: 'schedule',
          text: [
            '--- WEEKLY BROADCAST TIMETABLE ---',
            ...this.creator.schedule.map(s => `  [*] ${s}`),
            '',
            'Hit notification bell or join Discord for pop-up guerilla streams!'
          ].join('\n')
        };

      case 'socials': {
        const lines = ['--- TRANSMISSION FREQUENCIES (SOCIALS) ---'];
        for (const [platform, url] of Object.entries(this.creator.socials)) {
          lines.push(`  > ${platform.padEnd(10, ' ')}: https://${url}`);
        }
        return { type: 'socials', text: lines.join('\n') };
      }

      case 'tracks':
        return {
          type: 'tracks',
          text: [
            '--- RETRO CHIPTUNE SOUNDTRACKS ---',
            '  Track 01: Cyber Midnight (138 BPM, Synthwave FM)',
            '  Track 02: 8-Bit Sunset (112 BPM, Game Boy DMG Chiptune)',
            '  Track 03: Dungeon Crawler (144 BPM, Amiga MOD Arpeggio)',
            'Use the cassette tape deck above to toggle playback!'
          ].join('\n')
        };

      case 'tip':
        return {
          type: 'tip',
          text: [
            'Want to fuel the coffee machine and support the stream?',
            'Drop coins in the Retro Coin Box or send bits during live streams!',
            'Every coin triggers an authentic 8-bit sound fx on this page!'
          ].join('\n')
        };

      case 'echo':
        return {
          type: 'echo',
          text: args.join(' ') || '(nothing to echo)'
        };

      case 'date':
        return {
          type: 'date',
          text: 'SYSTEM TIME: ' + new Date().toUTCString()
        };

      case 'clear':
        return {
          type: 'clear',
          text: ''
        };

      case 'secret':
      case 'konami':
        return {
          type: 'secret',
          text: [
            '>> CHEAT CODE ACCEPTED: [UP, UP, DOWN, DOWN, LEFT, RIGHT, B, A]',
            '>> 30 LIVES GRANTED! OVERCLOCKING CRT RASTER GENERATOR...',
            '>> TURBO MODE UNLOCKED. You found the hidden Easter Egg! 🌟'
          ].join('\n')
        };

      default:
        return {
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`
        };
    }
  }
}

// --- 5. CONTENT FILTER & LIKES MODULE ---
class ContentManager {
  constructor(storage = null) {
    this.storage = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.likesKey = 'retro_content_likes';
    this.items = [
      {
        id: 'item-1',
        title: 'Building a Chiptune Tracker in 48 Hours',
        category: 'streams',
        tag: 'LIVE ARCHIVE',
        badge: 'POPULAR',
        duration: '2h 45m',
        likes: 1420,
        desc: 'Deep dive into FM synthesis chips, Yamaha YM2612 emulation, and tracker sequencing from scratch.',
        link: '#',
        icon: '🕹️'
      },
      {
        id: 'item-2',
        title: 'Cyber Midnight (Original Chiptune OST)',
        category: 'music',
        tag: 'ALBUM DROP',
        badge: 'NEW',
        duration: '8 Tracks',
        likes: 980,
        desc: 'Nostalgic 16-bit synthwave meets crunchy Game Boy arpeggios. Free digital download for fans.',
        link: '#',
        icon: '📼'
      },
      {
        id: 'item-3',
        title: 'The Ultimate 1995 Battlestation Tour',
        category: 'gear',
        tag: 'RETRO RIG',
        badge: 'FEATURED',
        duration: '18m 20s',
        likes: 2130,
        desc: 'Full breakdown of the dual CRT setup, mechanical keyboards, Roland synth rack, and capture cards.',
        link: '#',
        icon: '💾'
      },
      {
        id: 'item-4',
        title: 'Speedrunning Mega Man X with DDR Pad',
        category: 'streams',
        tag: 'CHALLENGE',
        badge: 'HIGHLIGHT',
        duration: '1h 12m',
        likes: 1874,
        desc: 'Chaos ensues when chat controls the boss weapon selector while beating Sigma on dance pads.',
        link: '#',
        icon: '👾'
      },
      {
        id: 'item-5',
        title: 'FM-Bassline Soundbank Vol. 1 (.WAV/.SF2)',
        category: 'music',
        tag: 'FREE SAMPLE PACK',
        badge: 'DOWNLOAD',
        duration: '64 Samples',
        likes: 642,
        desc: 'Pure recorded samples from the Yamaha DX7 and Sega Genesis soundboard. Royalty-free!',
        link: '#',
        icon: '🎹'
      },
      {
        id: 'item-6',
        title: 'Restoring an Amiga 1200 Found in an Attic',
        category: 'gear',
        tag: 'HARDWARE RESTORE',
        badge: 'MUST WATCH',
        duration: '32m 45s',
        likes: 3105,
        desc: 'Recapping capacitors, retrobrite yellowed plastics, and installing Gotek floppy emulator.',
        link: '#',
        icon: '⚡'
      }
    ];
  }

  getItems(category = 'all') {
    if (category === 'all') return this.items;
    return this.items.filter(item => item.category === category);
  }

  getLikes(itemId) {
    const defaultLikes = this.items.find(i => i.id === itemId)?.likes || 0;
    if (!this.storage) return defaultLikes;
    try {
      const stored = this.storage.getItem(`${this.likesKey}_${itemId}`);
      if (stored !== null) {
        return parseInt(stored, 10);
      }
    } catch {}
    return defaultLikes;
  }

  toggleLike(itemId) {
    const current = this.getLikes(itemId);
    const hasLikedKey = `${this.likesKey}_user_${itemId}`;
    let isLiked = false;

    if (this.storage) {
      try {
        isLiked = this.storage.getItem(hasLikedKey) === 'true';
      } catch {}
    }

    const nextCount = isLiked ? Math.max(0, current - 1) : current + 1;
    const nextState = !isLiked;

    if (this.storage) {
      try {
        this.storage.setItem(`${this.likesKey}_${itemId}`, nextCount.toString());
        this.storage.setItem(hasLikedKey, nextState ? 'true' : 'false');
      } catch {}
    }

    return { itemId, count: nextCount, liked: nextState };
  }
}

// --- 6. SYNTHESIZER & SOUND FX ENGINE (WEB AUDIO API) ---
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.currentTrack = 0;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.synthStep = 0;

    // Track definitions: procedural chiptune patterns
    this.tracks = [
      {
        title: 'Track 01: Cyber Midnight',
        tempo: 130,
        scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // C Major pentatonic
        bass: [130.81, 146.83, 164.81, 174.61],
        pattern: [0, 2, 4, 2, 3, 5, 4, 1]
      },
      {
        title: 'Track 02: 8-Bit Sunset',
        tempo: 110,
        scale: [220.00, 246.94, 261.63, 293.66, 329.63, 392.00], // A Minor
        bass: [110.00, 130.81, 146.83, 98.00],
        pattern: [0, 1, 2, 4, 3, 2, 1, 0]
      },
      {
        title: 'Track 03: Dungeon Crawler',
        tempo: 145,
        scale: [293.66, 311.13, 349.23, 392.00, 415.30, 466.16], // Phrygian mode
        bass: [146.83, 155.56, 174.61, 196.00],
        pattern: [0, 3, 2, 1, 4, 3, 5, 2]
      }
    ];
  }

  init() {
    if (this.audioCtx) return;
    const AudioContextClass = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AudioContextClass) return;

    try {
      this.audioCtx = new AudioContextClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    } catch {
      // AudioContext policy restrictions
    }
  }

  ensureContext() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMute(mute) {
    this.isMuted = !!mute;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.audioCtx.currentTime);
    }
    return this.isMuted;
  }

  playTone(freq, type = 'square', duration = 0.08, startTime = null) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx || !this.masterGain) return;

    try {
      const now = startTime !== null ? startTime : this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Catch audio interruption
    }
  }

  playBeep() {
    this.playTone(880, 'square', 0.05);
  }

  playClick() {
    this.playTone(400, 'triangle', 0.03);
  }

  playCoinSound() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    // B5 then E6 classic coin sound
    this.playTone(987.77, 'square', 0.09, now);
    this.playTone(1318.51, 'square', 0.28, now + 0.09);
  }

  playLaser() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx || !this.masterGain) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  playSuccess() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    // C5, E5, G5, C6 arpeggio
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      this.playTone(freq, 'square', 0.12, now + idx * 0.08);
    });
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    this.ensureContext();
    this.isPlayingMusic = true;
    this.synthStep = 0;
    this.scheduleNextBeat();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    this.synthStep = 0;
    return this.tracks[this.currentTrack];
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrack];
  }

  scheduleNextBeat() {
    if (!this.isPlayingMusic) return;

    const track = this.tracks[this.currentTrack];
    const beatIntervalMs = (60 / track.tempo) * 500; // 16th-note feel

    if (!this.isMuted && this.audioCtx) {
      const scaleNote = track.scale[track.pattern[this.synthStep % track.pattern.length] % track.scale.length];
      const bassNote = track.bass[Math.floor(this.synthStep / 4) % track.bass.length];

      // Play lead
      this.playTone(scaleNote, 'square', 0.1);

      // Play bass on even quarter-steps
      if (this.synthStep % 2 === 0) {
        this.playTone(bassNote, 'triangle', 0.18);
      }

      // Noise-like snare on beat 4
      if (this.synthStep % 4 === 2) {
        this.playTone(220, 'sawtooth', 0.04);
      }
    }

    this.synthStep++;
    this.musicTimer = setTimeout(() => {
      this.scheduleNextBeat();
    }, beatIntervalMs);
  }
}

// --- 7. DOM CONTROLLER & INITIALIZATION (BROWSER) ---
class AppController {
  constructor() {
    this.visitorCounter = new VisitorCounter();
    this.tipJar = new TipJar();
    this.guestbook = new GuestbookManager();
    this.terminal = new TerminalEmulator();
    this.contentManager = new ContentManager();
    this.sound = new SoundEngine();

    this.crtActive = true;
    this.sfxMuted = false;
  }

  init() {
    if (typeof document === 'undefined') return;

    this.initClock();
    this.initVisitorCounter();
    this.initSystemToggles();
    this.initAudioPlayer();
    this.initTipJar();
    this.initContentCards();
    this.initGuestbook();
    this.initTerminal();
    this.initSmoothScroll();
  }

  initClock() {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;

    const update = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hrs}:${mins}:${secs}`;
    };
    update();
    this.clockInterval = setInterval(update, 1000);
    if (this.clockInterval && typeof this.clockInterval.unref === 'function') {
      this.clockInterval.unref();
    }
  }

  destroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    if (this.sound) {
      this.sound.stopMusic();
    }
  }

  initVisitorCounter() {
    const nextVal = this.visitorCounter.increment();
    const formatted = this.visitorCounter.formatDigits(nextVal);
    const counterDisplay = document.getElementById('visitor-counter-digits');
    if (counterDisplay) {
      counterDisplay.innerHTML = '';
      for (const char of formatted) {
        const span = document.createElement('span');
        span.className = 'digit-box';
        span.textContent = char;
        counterDisplay.appendChild(span);
      }
    }
  }

  initSystemToggles() {
    // CRT toggle
    const crtBtn = document.getElementById('toggle-crt');
    const crtOverlay = document.getElementById('crt-overlay');
    if (crtBtn && crtOverlay) {
      crtBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.crtActive = !this.crtActive;
        if (this.crtActive) {
          crtOverlay.classList.remove('crt-disabled');
          crtBtn.setAttribute('aria-pressed', 'true');
          crtBtn.classList.add('active');
        } else {
          crtOverlay.classList.add('crt-disabled');
          crtBtn.setAttribute('aria-pressed', 'false');
          crtBtn.classList.remove('active');
        }
      });
    }

    // SFX toggle
    const sfxBtn = document.getElementById('toggle-sfx');
    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        this.sfxMuted = !this.sfxMuted;
        this.sound.setMute(this.sfxMuted);
        sfxBtn.setAttribute('aria-pressed', (!this.sfxMuted).toString());
        sfxBtn.classList.toggle('active', !this.sfxMuted);
        const iconSpan = sfxBtn.querySelector('.toggle-icon');
        const textSpan = sfxBtn.querySelector('.toggle-label');
        if (iconSpan) iconSpan.textContent = this.sfxMuted ? '🔇' : '🔊';
        if (textSpan) textSpan.textContent = this.sfxMuted ? 'SFX: OFF' : 'SFX: ON';
        if (!this.sfxMuted) this.sound.playBeep();
      });
    }

    // Theme selector buttons
    const themeButtons = document.querySelectorAll('[data-theme-choice]');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme-choice');
        document.body.setAttribute('data-theme', theme);
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.sound.playClick();
      });
    });
  }

  initAudioPlayer() {
    const playBtn = document.getElementById('synth-play-btn');
    const nextBtn = document.getElementById('synth-next-btn');
    const trackLabel = document.getElementById('synth-track-title');
    const visualizer = document.getElementById('synth-visualizer');

    const updateDisplay = () => {
      if (trackLabel) {
        trackLabel.textContent = this.sound.getCurrentTrack().title;
      }
      if (playBtn) {
        playBtn.textContent = this.sound.isPlayingMusic ? '⏸ PAUSE' : '▶ PLAY';
        playBtn.setAttribute('aria-label', this.sound.isPlayingMusic ? 'Pause retro music' : 'Play retro music');
      }
      if (visualizer) {
        visualizer.classList.toggle('active', this.sound.isPlayingMusic);
      }
    };

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.sound.toggleMusic();
        updateDisplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.sound.nextTrack();
        this.sound.playBeep();
        updateDisplay();
      });
    }

    updateDisplay();
  }

  initTipJar() {
    const totalEl = document.getElementById('tip-total-amount');
    const coinButtons = document.querySelectorAll('[data-tip-amount]');
    const customInput = document.getElementById('custom-tip-input');
    const customBtn = document.getElementById('custom-tip-submit');
    const coinDropBox = document.getElementById('coin-drop-zone');

    const updateTotal = () => {
      if (totalEl) {
        totalEl.textContent = this.tipJar.formatCurrency(this.tipJar.getTotal());
      }
    };

    const triggerCoinDrop = (amount) => {
      const res = this.tipJar.addTip(amount);
      this.sound.playCoinSound();
      updateTotal();

      // Visual coin animation
      if (coinDropBox) {
        const coin = document.createElement('div');
        coin.className = 'falling-coin';
        coin.textContent = '🪙';
        coin.style.left = `${Math.floor(Math.random() * 70) + 15}%`;
        coinDropBox.appendChild(coin);

        const floatMsg = document.createElement('div');
        floatMsg.className = 'coin-float-text';
        floatMsg.textContent = `+${this.tipJar.formatCurrency(res.added)}`;
        coinDropBox.appendChild(floatMsg);

        setTimeout(() => {
          coin.remove();
          floatMsg.remove();
        }, 1200);
      }
    };

    coinButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const amt = parseFloat(btn.getAttribute('data-tip-amount'));
        triggerCoinDrop(amt);
      });
    });

    if (customBtn && customInput) {
      customBtn.addEventListener('click', () => {
        const amt = parseFloat(customInput.value);
        if (amt && amt > 0) {
          triggerCoinDrop(amt);
          customInput.value = '';
        } else {
          this.sound.playLaser();
        }
      });
    }

    updateTotal();
  }

  initContentCards() {
    const tabs = document.querySelectorAll('.filter-tab-btn');
    const container = document.getElementById('content-grid-container');

    const render = (category = 'all') => {
      if (!container) return;
      const items = this.contentManager.getItems(category);
      container.innerHTML = '';

      items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'retro-card content-card';
        card.setAttribute('data-category', item.category);

        const likes = this.contentManager.getLikes(item.id);

        card.innerHTML = `
          <div class="card-header">
            <span class="card-badge">${item.badge}</span>
            <span class="card-tag">${item.tag}</span>
          </div>
          <div class="card-thumbnail-box">
            <span class="card-thumbnail-icon">${item.icon}</span>
            <span class="card-duration">${item.duration}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.desc}</p>
          </div>
          <div class="card-footer">
            <button class="retro-btn card-action-btn" data-action="explore">
              <span class="btn-text">OPEN LINK</span>
            </button>
            <button class="retro-btn card-like-btn" data-like-id="${item.id}" aria-label="Like ${item.title}">
              <span class="like-heart">♥</span>
              <span class="like-count">${likes}</span>
            </button>
          </div>
        `;

        const likeBtn = card.querySelector('.card-like-btn');
        likeBtn.addEventListener('click', () => {
          const res = this.contentManager.toggleLike(item.id);
          const countSpan = likeBtn.querySelector('.like-count');
          if (countSpan) countSpan.textContent = res.count;
          likeBtn.classList.toggle('liked', res.liked);
          this.sound.playBeep();
        });

        const actionBtn = card.querySelector('.card-action-btn');
        actionBtn.addEventListener('click', () => {
          this.sound.playSuccess();
          alert(`Opening transmission: "${item.title}"`);
        });

        container.appendChild(card);
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const cat = tab.getAttribute('data-filter') || 'all';
        this.sound.playClick();
        render(cat);
      });
    });

    render('all');
  }

  initGuestbook() {
    const listEl = document.getElementById('guestbook-list');
    const form = document.getElementById('guestbook-form');
    const nameInput = document.getElementById('guestbook-name');
    const msgInput = document.getElementById('guestbook-msg');
    const avatarSelect = document.getElementById('guestbook-avatar');

    const render = () => {
      if (!listEl) return;
      const entries = this.guestbook.getEntries();
      listEl.innerHTML = '';

      if (entries.length === 0) {
        listEl.innerHTML = '<div class="guestbook-empty">No messages recorded in the BBS yet. Be the first to leave your mark!</div>';
        return;
      }

      entries.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'guestbook-entry';
        item.innerHTML = `
          <div class="entry-header">
            <span class="entry-avatar">${entry.avatar}</span>
            <strong class="entry-author">${escapeHtml(entry.name)}</strong>
            <time class="entry-date">${entry.date}</time>
          </div>
          <p class="entry-body">${escapeHtml(entry.message)}</p>
        `;
        listEl.appendChild(item);
      });
    };

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput ? nameInput.value : '';
        const msg = msgInput ? msgInput.value : '';
        const avatar = avatarSelect ? avatarSelect.value : '👾';

        if (!msg.trim()) {
          this.sound.playLaser();
          return;
        }

        this.guestbook.addEntry({ name, avatar, message: msg });
        this.sound.playSuccess();
        if (msgInput) msgInput.value = '';
        render();
      });
    }

    render();
  }

  initTerminal() {
    const outputEl = document.getElementById('terminal-output');
    const inputEl = document.getElementById('terminal-input');
    const form = document.getElementById('terminal-form');

    const appendLine = (text, className = '') => {
      if (!outputEl) return;
      const div = document.createElement('div');
      div.className = `terminal-line ${className}`;
      div.textContent = text;
      outputEl.appendChild(div);
      outputEl.scrollTop = outputEl.scrollHeight;
    };

    if (form && inputEl) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const command = inputEl.value;
        if (!command.trim()) return;

        appendLine(`> ${command}`, 'user-cmd');
        const result = this.terminal.execute(command);

        if (result.type === 'clear') {
          if (outputEl) outputEl.innerHTML = '';
        } else {
          appendLine(result.text, result.type === 'error' ? 'err-cmd' : 'res-cmd');
          if (result.type === 'secret') {
            this.sound.playSuccess();
          } else if (result.type === 'error') {
            this.sound.playLaser();
          } else {
            this.sound.playBeep();
          }
        }

        inputEl.value = '';
      });
    }
  }

  initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            this.sound.playClick();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    const toTopBtn = document.getElementById('btn-back-to-top');
    if (toTopBtn) {
      toTopBtn.addEventListener('click', () => {
        this.sound.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Auto-boot if in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.init();
    window.__RETRO_APP__ = app;
  });
}

// Export for Node.js test environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VisitorCounter,
    TipJar,
    GuestbookManager,
    TerminalEmulator,
    ContentManager,
    SoundEngine,
    AppController,
    escapeHtml
  };
}
