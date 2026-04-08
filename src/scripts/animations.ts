/**
 * animations.ts — GSAP ScrollTrigger animations for Capture & Connect.
 *
 * Handles:
 *  - [data-reveal]   scroll-triggered reveal animations (fade-up, fade-in, slide-left,
 *                    slide-right, stagger)
 *  - [data-count]    animated number counters
 *  - [data-animate]  generic fade-in fallback
 *
 * Imported dynamically by BaseLayout.astro after DOM ready.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse a count string like "20M+", "150+", "3x", "320%" into { value, suffix }. */
function parseCount(raw: string): { value: number; suffix: string } {
  // Match an optional leading integer/float followed by any non-numeric suffix
  const match = raw.trim().match(/^([\d,.]+)(.*)/);
  if (!match) return { value: 0, suffix: raw };
  const value = parseFloat(match[1].replace(/,/g, ''));
  const suffix = match[2] ?? '';
  return { value: isNaN(value) ? 0 : value, suffix };
}

/** Convert a data-delay attribute value (milliseconds string) to seconds. */
function delaySeconds(el: HTMLElement): number {
  const raw = el.dataset.delay;
  if (!raw) return 0;
  const ms = parseFloat(raw);
  return isNaN(ms) ? 0 : ms / 1000;
}

// ---------------------------------------------------------------------------
// Reduced-motion guard
// ---------------------------------------------------------------------------

function handleReducedMotion(): boolean {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  // Make every animated element immediately visible
  const selectors = ['[data-reveal]', '[data-animate]', '[data-count]', '[data-stagger] > *'];
  document.querySelectorAll<HTMLElement>(selectors.join(', ')).forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.remove('opacity-0');
  });

  return true;
}

// ---------------------------------------------------------------------------
// Scroll reveal — [data-reveal]
// ---------------------------------------------------------------------------

function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const type = el.dataset.reveal;
    const delay = delaySeconds(el);

    // Stagger containers are handled separately
    if (type === 'stagger') {
      initStaggerContainer(el);
      return;
    }

    // Ensure the element starts hidden (may already have opacity-0 via Tailwind)
    gsap.set(el, { opacity: 0 });

    const commonVars: gsap.TweenVars = {
      opacity: 1,
      duration: 0.8,
      ease: 'expo.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    };

    switch (type) {
      case 'fade-up':
        gsap.set(el, { y: 40 });
        gsap.to(el, { ...commonVars, y: 0 });
        break;

      case 'fade-in':
        gsap.to(el, { ...commonVars, duration: 0.6 });
        break;

      case 'slide-left':
        gsap.set(el, { x: -60 });
        gsap.to(el, { ...commonVars, x: 0 });
        break;

      case 'slide-right':
        gsap.set(el, { x: 60 });
        gsap.to(el, { ...commonVars, x: 0 });
        break;

      default:
        // Unknown type — fall back to simple fade-in
        gsap.to(el, { ...commonVars, duration: 0.6 });
        break;
    }
  });
}

// ---------------------------------------------------------------------------
// Stagger containers — [data-reveal="stagger"] or [data-stagger]
// ---------------------------------------------------------------------------

function initStaggerContainer(container: HTMLElement): void {
  const children = Array.from(container.children) as HTMLElement[];
  if (!children.length) return;

  gsap.set(children, { opacity: 0, y: 30 });

  gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

function initStagger(): void {
  // [data-stagger] standalone (not covered by initReveal's stagger branch)
  const containers = document.querySelectorAll<HTMLElement>('[data-stagger]');
  if (!containers.length) return;

  containers.forEach((container) => {
    // Avoid double-initialising containers that also have data-reveal="stagger"
    if (container.dataset.reveal === 'stagger') return;
    initStaggerContainer(container);
  });
}

// ---------------------------------------------------------------------------
// Counter animations — [data-count]
// ---------------------------------------------------------------------------

function initCounters(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const raw = el.dataset.count ?? el.textContent ?? '';
    const { value: target, suffix } = parseCount(raw);

    if (target === 0) return;

    // Start at 0 visually
    el.textContent = `0${suffix}`;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        // For large numbers (≥ 1000) use locale formatting; otherwise integer
        const display =
          target >= 1000
            ? Math.round(obj.val).toLocaleString('en-US')
            : target % 1 === 0
              ? Math.round(obj.val).toString()
              : obj.val.toFixed(1);
        el.textContent = `${display}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ---------------------------------------------------------------------------
// Generic [data-animate] — simple fade-in fallback
// ---------------------------------------------------------------------------

function initGenericAnimate(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
  if (!elements.length) return;

  elements.forEach((el) => {
    // Skip elements already handled by BaseLayout's inline GSAP block
    // (they are set up identically; this is a no-op duplicate guard)
    if (el.dataset.animateInit) return;
    el.dataset.animateInit = '1';

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Public init
// ---------------------------------------------------------------------------

export function init(): void {
  if (handleReducedMotion()) return;

  initReveal();
  initStagger();
  initCounters();
  initGenericAnimate();
}

// Auto-initialise when this module is imported
init();
