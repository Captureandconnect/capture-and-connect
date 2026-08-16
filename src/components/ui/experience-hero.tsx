"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(12px)", scale: 1.02 },
        {
          filter: "blur(0px)",
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
        }
      );

      gsap.from(".command-cell", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 1,
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#020202] flex flex-col selection:bg-white selection:text-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#020202]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 70% 45%, rgba(255,255,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 65%), linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 256 256%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter id%3D%22n%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%220.9%22 numOctaves%3D%224%22 stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')",
            }}
          />
        </div>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col md:flex-row px-6 md:px-14 lg:px-20 pb-10 md:pb-14 pt-24 md:pt-28 lg:pt-32 min-h-[100svh] items-center md:items-stretch gap-8 md:gap-10"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-center md:justify-between gap-8 md:gap-0 md:pb-8 w-full">
          <div className="hidden md:flex invisible items-center gap-3" aria-hidden="true">
            <div className="relative w-2.5 h-2.5 rounded-full" />
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
              &nbsp;
            </span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-0 md:pr-12">
            <h1 className="text-[clamp(2.75rem,6.5vw,7.5rem)] font-black leading-[0.95] md:leading-[0.92] tracking-tighter text-white uppercase italic">
              BUILD A BRAND <br />
              PEOPLE FOLLOW <br />
              <span className="text-outline not-italic">AND BUY FROM</span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-[15px] text-white/75 max-w-md leading-relaxed">
              Content, social media &amp; strategy that turn attention into
              views, followers and revenue.
            </p>
          </div>

          <a
            ref={ctaRef}
            href="/contact"
            className="w-fit inline-flex items-center gap-5 group lg:-translate-y-20 min-h-[56px] py-2 -my-2"
            data-event="cta_book_call"
            data-event-location="hero"
            aria-label="Book a free growth call"
          >
            <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white transition-all duration-500 overflow-hidden">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:stroke-black stroke-white transition-colors duration-500"
                aria-hidden="true"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-mono text-[12px] font-bold text-white uppercase tracking-[0.18em]">
              Book Your Free Call
            </span>
          </a>
        </div>

        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col gap-4 justify-center z-20">
          {[
            {
              id: "001",
              title: "AVAILABILITY",
              val: "Open for projects",
              type: "progress" as const,
            },
            {
              id: "002",
              title: "PUBLIC PROOF",
              val: "125M+ reach",
              type: "data" as const,
            },
            {
              id: "003",
              title: "POSITIONING",
              val: "Growth Partner",
              type: "text" as const,
            },
          ].map((item) => (
            <div
              key={item.id}
              className="command-cell glass-panel p-6 sm:p-7 block opacity-100"
            >
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest block mb-3">
                {item.id} // {item.title}
              </span>
              {item.type === "progress" ? (
                <div className="flex justify-between items-end mt-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">
                    {item.val}
                  </span>
                  <div className="h-[2px] w-20 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white animate-loading" />
                  </div>
                </div>
              ) : item.type === "data" ? (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>Total reach</span>
                    <span>125M+</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>Events filmed</span>
                    <span>250+</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>Accounts growing</span>
                    <span>9</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm font-medium text-white/70 mt-3 leading-snug">
                  Content · Social · Strategy. One team turning artists,
                  events and brands into content machines.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceHero;
