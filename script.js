// State
const state = { A: 0, B: 0, C: 0, D: 0 };
const CORRECT_PASSWORD = "1011";

// Toggle switch function
function toggleSwitch(bit) {
  state[bit] = state[bit] === 0 ? 1 : 0;
  playSound('click');  // ← Yeh line add hui
  updateUI();
}

// Update entire UI
function updateUI() {
  // Update switch visuals
  ['A', 'B', 'C', 'D'].forEach(bit => {
    const sw = document.getElementById('switch' + bit);
    const led = document.getElementById('led' + bit);
    const val = document.getElementById('val' + bit);
    
    if (state[bit] === 1) {
      sw.classList.add('on');
      led.classList.add('on');
    } else {
      sw.classList.remove('on');
      led.classList.remove('on');
    }
    val.textContent = state[bit];
  });

  // Binary display
  const binary = `${state.A}${state.B}${state.C}${state.D}`;
  document.getElementById('binaryValue').textContent = binary;

  // Logic gates computation
  const notB = state.B === 0 ? 1 : 0;
  const and1 = state.A & notB;
  const and2 = state.C & state.D;
  const match = and1 & and2;

  // Activate gates visually
  document.getElementById('notGate').classList.toggle('active', notB === 1);
  document.getElementById('and1').classList.toggle('active', and1 === 1);
  document.getElementById('and2').classList.toggle('active', and2 === 1);
  document.getElementById('and3').classList.toggle('active', match === 1);

  // LEDs
  const greenLED = document.getElementById('greenLED');
  const redLED = document.getElementById('redLED');
  const door = document.getElementById('door');
  const doorStatus = document.getElementById('doorStatus');

  if (match === 1) {
    greenLED.classList.add('on');
    redLED.classList.remove('on');
    door.classList.add('open');
    doorStatus.innerHTML = '🟢 UNLOCKED - Door Open!';
    doorStatus.style.color = '#00ff88';
    playSound('success');
  } else {
    greenLED.classList.remove('on');
    redLED.classList.add('on');
    door.classList.remove('open');
    doorStatus.innerHTML = '🔴 LOCKED';
    doorStatus.style.color = '#ff2244';
    if (binary !== '0000') playSound('beep');
  }

  // Highlight current row in truth table
  highlightTruthTableRow(binary);
}

// Reset all
function resetAll() {
  state.A = 0;
  state.B = 0;
  state.C = 0;
  state.D = 0;
  updateUI();
}

// Play sound (Enhanced - Cinematic effects)
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    if (type === 'success') {
      // SUCCESS: Pleasant ascending chime (C-E-G major chord arpeggio)
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const startTime = now + (i * 0.08);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });

      // Add a soft "unlock click" at start
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = 'triangle';
      click.frequency.value = 1500;
      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickGain.gain.setValueAtTime(0.1, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      click.start(now);
      click.stop(now + 0.05);

    } else if (type === 'beep') {
      // ERROR: Deep double buzz (like access denied)
      for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.value = 180;
        
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        const startTime = now + (i * 0.12);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
        gain.gain.setValueAtTime(0.12, startTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
        
        osc.start(startTime);
        osc.stop(startTime + 0.1);
      }

    } else if (type === 'click') {
      // SWITCH CLICK: Tactile feedback
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 2000;
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch(e) {}
}

// Build truth table
function buildTruthTable() {
  const table = document.getElementById('truthTable');
  let html = '<tr><th>A</th><th>B</th><th>C</th><th>D</th><th>OUT</th></tr>';
  for (let i = 0; i < 16; i++) {
    const bin = i.toString(2).padStart(4, '0');
    const isMatch = bin === CORRECT_PASSWORD;
    html += `<tr class="${isMatch ? 'match' : ''}" data-bin="${bin}">
      <td>${bin[0]}</td><td>${bin[1]}</td><td>${bin[2]}</td><td>${bin[3]}</td>
      <td>${isMatch ? '✅ 1' : '0'}</td>
    </tr>`;
  }
  table.innerHTML = html;
}

// Highlight current combo in truth table
function highlightTruthTableRow(binary) {
  document.querySelectorAll('#truthTable tr').forEach(row => {
    row.classList.remove('current');
    if (row.dataset.bin === binary) {
      row.classList.add('current');
    }
  });
}

// Init
buildTruthTable();
updateUI();