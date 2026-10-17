const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const {
  VisitorCounter,
  TipJar,
  GuestbookManager,
  TerminalEmulator,
  ContentManager,
  SoundEngine,
  AppController,
  escapeHtml
} = require('../app.js');

// Helper: In-memory mock storage replicating localStorage
function createMockStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    _store: store
  };
}

describe('VisitorCounter Module', () => {
  test('returns default count when storage is empty', () => {
    const storage = createMockStorage();
    const counter = new VisitorCounter(storage, 50000);
    assert.strictEqual(counter.getCounter(), 50000);
  });

  test('increments counter and persists to storage', () => {
    const storage = createMockStorage();
    const counter = new VisitorCounter(storage, 100);
    const nextVal = counter.increment();
    assert.strictEqual(nextVal, 101);
    assert.strictEqual(counter.getCounter(), 101);
    assert.strictEqual(storage.getItem('retro_visitor_count'), '101');
  });

  test('handles corrupted non-numeric stored value gracefully', () => {
    const storage = createMockStorage({ 'retro_visitor_count': 'corrupted_value' });
    const counter = new VisitorCounter(storage, 42);
    assert.strictEqual(counter.getCounter(), 42);
  });

  test('formats digits with leading zeros', () => {
    const counter = new VisitorCounter();
    assert.strictEqual(counter.formatDigits(7, 6), '000007');
    assert.strictEqual(counter.formatDigits(12345, 6), '012345');
    assert.strictEqual(counter.formatDigits(9999999, 6), '9999999');
    assert.strictEqual(counter.formatDigits(-5, 4), '0000');
  });
});

describe('TipJar Module', () => {
  test('initializes with default loot total if empty', () => {
    const storage = createMockStorage();
    const tipJar = new TipJar(storage);
    assert.strictEqual(tipJar.getTotal(), 1337);
  });

  test('adds tip and updates history', () => {
    const storage = createMockStorage();
    const tipJar = new TipJar(storage);
    const result = tipJar.addTip(5.00, 'CyberKnight');
    
    assert.strictEqual(result.total, 1342.00);
    assert.strictEqual(result.added, 5.00);
    assert.strictEqual(result.donor, 'CyberKnight');
    
    const history = tipJar.getHistory();
    assert.strictEqual(history.length, 1);
    assert.strictEqual(history[0].donor, 'CyberKnight');
    assert.strictEqual(history[0].amount, 5.00);
  });

  test('handles invalid tip amounts safely with minimum 0.01 floor', () => {
    const storage = createMockStorage();
    const tipJar = new TipJar(storage);
    const result = tipJar.addTip('invalid_text');
    assert.strictEqual(result.added, 0.01);
  });

  test('formats currency properly', () => {
    const tipJar = new TipJar();
    assert.strictEqual(tipJar.formatCurrency(1337.5), '$1,337.50');
    assert.strictEqual(tipJar.formatCurrency(0), '$0.00');
  });
});

describe('GuestbookManager Module', () => {
  test('returns default entries when storage is uninitialized', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    const entries = manager.getEntries();
    assert.ok(entries.length >= 3);
    assert.strictEqual(entries[0].name, 'CyberSamurai_99');
  });

  test('adds valid new entry to the top', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    const newEntry = manager.addEntry({
      name: 'RetroCoder',
      avatar: '💾',
      message: 'Awesome page! Loving the synth music.'
    });

    assert.ok(newEntry.id.startsWith('msg-'));
    assert.strictEqual(newEntry.name, 'RetroCoder');
    assert.strictEqual(newEntry.avatar, '💾');

    const entries = manager.getEntries();
    assert.strictEqual(entries[0].name, 'RetroCoder');
  });

  test('throws error if message is empty or whitespace', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    assert.throws(() => {
      manager.addEntry({ name: 'Hacker', message: '   ' });
    }, /Message cannot be empty/);
  });

  test('truncates oversized names and messages safely', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    const longName = 'A'.repeat(50);
    const longMsg = 'B'.repeat(300);

    const entry = manager.addEntry({ name: longName, message: longMsg });
    assert.strictEqual(entry.name.length, 30);
    assert.strictEqual(entry.message.length, 200);
  });

  test('deletes entry by id', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    const initialCount = manager.getEntries().length;
    const remaining = manager.deleteEntry('msg-1');
    assert.strictEqual(remaining.length, initialCount - 1);
    assert.strictEqual(remaining.find(e => e.id === 'msg-1'), undefined);
  });

  test('resets to defaults', () => {
    const storage = createMockStorage();
    const manager = new GuestbookManager(storage);
    manager.addEntry({ name: 'Temp', message: 'Temp test' });
    manager.resetDefaults();
    const entries = manager.getEntries();
    assert.strictEqual(entries[0].name, 'CyberSamurai_99');
  });
});

describe('TerminalEmulator Module', () => {
  const terminal = new TerminalEmulator();

  test('handles empty input', () => {
    const res = terminal.execute('');
    assert.strictEqual(res.type, 'empty');
  });

  test('executes "help" command', () => {
    const res = terminal.execute('help');
    assert.strictEqual(res.type, 'help');
    assert.ok(res.text.includes('AVAILABLE COMMANDS'));
  });

  test('executes "about" command', () => {
    const res = terminal.execute('about');
    assert.strictEqual(res.type, 'about');
    assert.ok(res.text.includes('IDENTITY: KIRA_NOVA'));
  });

  test('executes "specs" command', () => {
    const res = terminal.execute('specs');
    assert.strictEqual(res.type, 'specs');
    assert.ok(res.text.includes('CREATOR STUDIO GEAR'));
  });

  test('executes "schedule" command', () => {
    const res = terminal.execute('schedule');
    assert.strictEqual(res.type, 'schedule');
    assert.ok(res.text.includes('WEEKLY BROADCAST TIMETABLE'));
  });

  test('executes "socials" command', () => {
    const res = terminal.execute('socials');
    assert.strictEqual(res.type, 'socials');
    assert.ok(res.text.includes('TRANSMISSION FREQUENCIES'));
  });

  test('executes "tracks" command', () => {
    const res = terminal.execute('tracks');
    assert.strictEqual(res.type, 'tracks');
    assert.ok(res.text.includes('RETRO CHIPTUNE SOUNDTRACKS'));
  });

  test('executes "tip" command', () => {
    const res = terminal.execute('tip');
    assert.strictEqual(res.type, 'tip');
    assert.ok(res.text.includes('support the stream'));
  });

  test('executes "date" command', () => {
    const res = terminal.execute('date');
    assert.strictEqual(res.type, 'date');
    assert.ok(res.text.includes('SYSTEM TIME'));
  });

  test('executes "echo" command with arguments and empty arguments', () => {
    const res = terminal.execute('echo Hello Cyber World');
    assert.strictEqual(res.type, 'echo');
    assert.strictEqual(res.text, 'Hello Cyber World');

    const resEmpty = terminal.execute('echo');
    assert.strictEqual(resEmpty.text, '(nothing to echo)');
  });

  test('executes "clear" command', () => {
    const res = terminal.execute('clear');
    assert.strictEqual(res.type, 'clear');
    assert.strictEqual(res.text, '');
  });

  test('unlocks Easter egg on "secret" or "konami"', () => {
    const resSecret = terminal.execute('secret');
    assert.strictEqual(resSecret.type, 'secret');
    assert.ok(resSecret.text.includes('CHEAT CODE ACCEPTED'));

    const resKonami = terminal.execute('konami');
    assert.strictEqual(resKonami.type, 'secret');
  });

  test('returns error on unknown command', () => {
    const res = terminal.execute('unknown_xyz');
    assert.strictEqual(res.type, 'error');
    assert.ok(res.text.includes('Command not found'));
  });
});

describe('ContentManager Module', () => {
  test('returns all items by default', () => {
    const manager = new ContentManager();
    const all = manager.getItems('all');
    assert.strictEqual(all.length, 6);
  });

  test('filters items by category correctly', () => {
    const manager = new ContentManager();
    const streams = manager.getItems('streams');
    assert.ok(streams.length > 0);
    assert.ok(streams.every(item => item.category === 'streams'));

    const music = manager.getItems('music');
    assert.ok(music.length > 0);
    assert.ok(music.every(item => item.category === 'music'));

    const gear = manager.getItems('gear');
    assert.ok(gear.length > 0);
    assert.ok(gear.every(item => item.category === 'gear'));
  });

  test('toggles likes and persists in storage', () => {
    const storage = createMockStorage();
    const manager = new ContentManager(storage);
    const itemId = 'item-1';
    const initialLikes = manager.getLikes(itemId);

    // First like
    const like1 = manager.toggleLike(itemId);
    assert.strictEqual(like1.count, initialLikes + 1);
    assert.strictEqual(like1.liked, true);
    assert.strictEqual(manager.getLikes(itemId), initialLikes + 1);

    // Unlike
    const like2 = manager.toggleLike(itemId);
    assert.strictEqual(like2.count, initialLikes);
    assert.strictEqual(like2.liked, false);
  });
});

describe('SoundEngine Web Audio Synthesizer', () => {
  let originalWindow;

  beforeEach(() => {
    originalWindow = globalThis.window;
    // Mock Web Audio Context
    globalThis.window = {
      AudioContext: class MockAudioContext {
        constructor() {
          this.currentTime = 0;
          this.state = 'suspended';
          this.destination = {};
        }
        resume() {
          this.state = 'running';
        }
        createGain() {
          return {
            gain: {
              setValueAtTime: () => {},
              exponentialRampToValueAtTime: () => {}
            },
            connect: () => {}
          };
        }
        createOscillator() {
          return {
            type: 'square',
            frequency: {
              setValueAtTime: () => {},
              exponentialRampToValueAtTime: () => {}
            },
            connect: () => {},
            start: () => {},
            stop: () => {}
          };
        }
      }
    };
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  test('initializes and plays sound fx', () => {
    const sound = new SoundEngine();
    sound.init();
    assert.ok(sound.audioCtx);

    // Test sound methods
    sound.playBeep();
    sound.playClick();
    sound.playCoinSound();
    sound.playLaser();
    sound.playSuccess();

    // Test mute behavior
    sound.setMute(true);
    assert.strictEqual(sound.isMuted, true);
    sound.playBeep(); // Does not throw when muted

    sound.setMute(false);
    assert.strictEqual(sound.isMuted, false);
  });

  test('manages chiptune music playback loop', () => {
    const sound = new SoundEngine();
    sound.init();

    const started = sound.toggleMusic();
    assert.strictEqual(started, true);
    assert.strictEqual(sound.isPlayingMusic, true);

    // Run a step
    sound.scheduleNextBeat();

    // Toggle off
    const stopped = sound.toggleMusic();
    assert.strictEqual(stopped, false);
    assert.strictEqual(sound.isPlayingMusic, false);

    // Track switching
    const track = sound.nextTrack();
    assert.strictEqual(track.title, 'Track 02: 8-Bit Sunset');
  });
});

describe('AppController DOM Integration', () => {
  let originalDocument;
  let originalWindow;
  let originalAlert;

  beforeEach(() => {
    originalDocument = globalThis.document;
    originalWindow = globalThis.window;
    originalAlert = globalThis.alert;

    const eventListeners = new Map();

    class MockElement {
      constructor(tag = 'div') {
        this.tagName = tag.toUpperCase();
        this.attributes = new Map();
        this.classList = {
          _classes: new Set(),
          add: (c) => this.classList._classes.add(c),
          remove: (c) => this.classList._classes.delete(c),
          toggle: (c, force) => {
            if (force !== undefined) {
              if (force) this.classList._classes.add(c);
              else this.classList._classes.delete(c);
              return force;
            }
            if (this.classList._classes.has(c)) {
              this.classList._classes.delete(c);
              return false;
            } else {
              this.classList._classes.add(c);
              return true;
            }
          },
          contains: (c) => this.classList._classes.has(c)
        };
        this.style = {};
        this.children = [];
        this.innerHTML = '';
        this.textContent = '';
        this.value = '';
        this.listeners = new Map();
      }

      setAttribute(k, v) { this.attributes.set(k, String(v)); }
      getAttribute(k) { return this.attributes.has(k) ? this.attributes.get(k) : null; }
      addEventListener(event, fn) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push(fn);
      }
      dispatchEvent(event, data = {}) {
        const fns = this.listeners.get(event) || [];
        for (const fn of fns) fn(data);
      }
      appendChild(child) {
        this.children.push(child);
        return child;
      }
      remove() {}
      querySelector() {
        return new MockElement('div');
      }
    }

    const elementsById = new Map([
      ['system-clock', new MockElement('div')],
      ['visitor-counter-digits', new MockElement('div')],
      ['toggle-crt', new MockElement('button')],
      ['crt-overlay', new MockElement('div')],
      ['toggle-sfx', new MockElement('button')],
      ['synth-play-btn', new MockElement('button')],
      ['synth-next-btn', new MockElement('button')],
      ['synth-track-title', new MockElement('span')],
      ['synth-visualizer', new MockElement('div')],
      ['tip-total-amount', new MockElement('div')],
      ['custom-tip-input', new MockElement('input')],
      ['custom-tip-submit', new MockElement('button')],
      ['coin-drop-zone', new MockElement('div')],
      ['content-grid-container', new MockElement('div')],
      ['guestbook-list', new MockElement('div')],
      ['guestbook-form', new MockElement('form')],
      ['guestbook-name', new MockElement('input')],
      ['guestbook-msg', new MockElement('textarea')],
      ['guestbook-avatar', new MockElement('select')],
      ['terminal-output', new MockElement('div')],
      ['terminal-input', new MockElement('input')],
      ['terminal-form', new MockElement('form')],
      ['btn-back-to-top', new MockElement('button')]
    ]);

    const themeChoiceBtn = new MockElement('button');
    themeChoiceBtn.setAttribute('data-theme-choice', 'matrix');

    const tipAmountBtn = new MockElement('button');
    tipAmountBtn.setAttribute('data-tip-amount', '5');

    const filterTabBtn = new MockElement('button');
    filterTabBtn.setAttribute('data-filter', 'music');

    const anchorLink = new MockElement('a');
    anchorLink.setAttribute('href', '#about');

    globalThis.document = {
      body: new MockElement('body'),
      getElementById: (id) => elementsById.get(id) || null,
      querySelectorAll: (sel) => {
        if (sel === '[data-theme-choice]') return [themeChoiceBtn];
        if (sel === '[data-tip-amount]') return [tipAmountBtn];
        if (sel === '.filter-tab-btn') return [filterTabBtn];
        if (sel === 'a[href^="#"]') return [anchorLink];
        return [];
      },
      querySelector: () => new MockElement('div'),
      createElement: (tag) => new MockElement(tag)
    };

    globalThis.window = {
      addEventListener: (evt, fn) => {
        if (!eventListeners.has(evt)) eventListeners.set(evt, []);
        eventListeners.get(evt).push(fn);
      },
      scrollTo: () => {}
    };

    globalThis.alert = () => {};
  });

  afterEach(() => {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
    globalThis.alert = originalAlert;
  });

  test('initializes all DOM components without errors', () => {
    const app = new AppController();
    app.init();

    // Test CRT toggle click
    const crtBtn = document.getElementById('toggle-crt');
    crtBtn.dispatchEvent('click');
    assert.strictEqual(app.crtActive, false);
    crtBtn.dispatchEvent('click');
    assert.strictEqual(app.crtActive, true);

    // Test SFX toggle click
    const sfxBtn = document.getElementById('toggle-sfx');
    sfxBtn.dispatchEvent('click');
    assert.strictEqual(app.sfxMuted, true);
    sfxBtn.dispatchEvent('click');
    assert.strictEqual(app.sfxMuted, false);

    // Test theme choice click
    const themeBtn = document.querySelectorAll('[data-theme-choice]')[0];
    themeBtn.dispatchEvent('click');
    assert.strictEqual(document.body.getAttribute('data-theme'), 'matrix');

    // Test audio player play / next
    const playBtn = document.getElementById('synth-play-btn');
    playBtn.dispatchEvent('click');
    const nextBtn = document.getElementById('synth-next-btn');
    nextBtn.dispatchEvent('click');

    // Test tip jar coin button
    const coinBtn = document.querySelectorAll('[data-tip-amount]')[0];
    coinBtn.dispatchEvent('click');

    // Test custom tip
    const customInput = document.getElementById('custom-tip-input');
    customInput.value = '25';
    const customSubmit = document.getElementById('custom-tip-submit');
    customSubmit.dispatchEvent('click');

    // Test guestbook submission
    const gbForm = document.getElementById('guestbook-form');
    const gbName = document.getElementById('guestbook-name');
    const gbMsg = document.getElementById('guestbook-msg');
    gbName.value = 'Alice';
    gbMsg.value = 'Hello world!';
    gbForm.dispatchEvent('submit', { preventDefault: () => {} });

    // Test terminal submission
    const termForm = document.getElementById('terminal-form');
    const termInput = document.getElementById('terminal-input');
    termInput.value = 'help';
    termForm.dispatchEvent('submit', { preventDefault: () => {} });

    // Test back to top click
    const topBtn = document.getElementById('btn-back-to-top');
    topBtn.dispatchEvent('click');

    app.destroy();
  });
});

describe('escapeHtml Utility', () => {
  test('escapes special HTML characters', () => {
    const raw = '<script>alert("XSS" & \'attack\');</script>';
    const escaped = escapeHtml(raw);
    assert.strictEqual(
      escaped,
      '&lt;script&gt;alert(&quot;XSS&quot; &amp; &#039;attack&#039;);&lt;/script&gt;'
    );
  });

  test('handles null and empty input', () => {
    assert.strictEqual(escapeHtml(''), '');
    assert.strictEqual(escapeHtml(null), '');
  });
});
