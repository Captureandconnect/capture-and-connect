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
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 2.2,
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

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#020202] flex flex-col selection:bg-white selection:text-black overflow-hidden"
    >
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
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
        className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-20 pt-28 md:pt-32 lg:pt-36 min-h-screen items-center md:items-stretch gap-10"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-2.5 h-2.5 bg-white rounded-full">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
            </div>
            <span className="font-mono text-[11px] font-bold text-white tracking-[0.2em] uppercase">
              CAPTUREANDCONNECT.NL
            </span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-0 md:pr-12">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] font-black leading-[0.87] tracking-tighter text-white uppercase italic">
              CREATIVE <br />
              <span className="text-outline not-italic">AGENCY</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-white/55 uppercase tracking-[0.35em] max-w-md leading-relaxed">
              Content Creation, Social Media Management &amp; Web Design for
              artists, festivals and brands ready to scale.
            </p>
          </div>

          <a
            ref={ctaRef}
            href="/contact"
            className="w-fit flex items-center gap-6 group lg:-translate-y-20"
          >
            <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white transition-all duration-500 overflow-hidden">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:stroke-black stroke-white transition-colors duration-500"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em]">
              Start a Project
            </span>
          </a>
        </div>

        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col gap-4 justify-center z-20">
          {[
            {
              id: "001",
              title: "AVAILABILITY",
              val: "Open",
              type: "progress" as const,
            },
            {
              id: "002",
              title: "PUBLIC PROOF",
              val: "20M+ Viral",
              type: "data" as const,
            },
            {
              id: "003",
              title: "EXPERTISE",
              val: "Creative Dev",
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
                    <span>Public viral</span>
                    <span>20M+</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>Events filmed 2026</span>
                    <span>20+</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>Accounts managed</span>
                    <span>6</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm font-medium text-white/70 mt-3 leading-snug">
                  Content · Social · Web. One team building narrative systems
                  for artists, events and brands.
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
