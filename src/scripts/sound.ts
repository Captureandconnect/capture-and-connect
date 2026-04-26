/**
 * CnC Click Sound System — Web Audio API, no asset files.
 * Reads localStorage key `cnc-sound` ("on" | "off"). Default: off.
 * Respects prefers-reduced-motion.
 */

const STORAGE_KEY = 'cnc-sound';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(freq: number, duration: number, peakGain: number): void {
  if (reducedMotion) return;
  if (localStorage.getItem(STORAGE_KEY) !== 'on') return;
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = 'sine';
  osc.frequency.value = freq;
  const now = ac.currentTime;
  gain.gain.setValueAtTime(peakGain, now);
  gain.gain.linearRampToValueAtTime(0, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

export function softClick(): void {
  playTone(800, 0.04, 0.05);
}

export function hoverTick(): void {
  playTone(1200, 0.02, 0.025);
}

// ── Attach handlers ──────────────────────────────────────────────

const CLICK_SELECTOR = 'a[class*="group/cta"], button[type="submit"], [data-sound="click"]';
const HOVER_SELECTOR = '[data-sound="hover"]';

document.querySelectorAll<HTMLElement>(CLICK_SELECTOR).forEach((el) => {
  el.addEventListener('click', softClick, { passive: true });
});

let hoverCooldown = false;
document.querySelectorAll<HTMLElement>(HOVER_SELECTOR).forEach((el) => {
  el.addEventListener('pointerenter', () => {
    if (hoverCooldown) return;
    hoverTick();
    hoverCooldown = true;
    setTimeout(() => { hoverCooldown = false; }, 200);
  }, { passive: true });
});

// ── Public API ───────────────────────────────────────────────────

function toggle(): boolean {
  const next = localStorage.getItem(STORAGE_KEY) !== 'on';
  localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
  if (next) {
    // Lazily warm up the AudioContext on first enable
    getContext();
    softClick();
  }
  return next;
}

function isOn(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'on';
}

(window as any).__cncSound = { toggle, isOn };
