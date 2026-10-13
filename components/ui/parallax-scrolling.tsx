'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CalendarCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/Button';

export type ParallaxHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function ParallaxComponent({ eyebrow, title, subtitle, primaryCta, secondaryCta }: ParallaxHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    let lenis: Lenis | undefined;
    let tickerFn: ((time: number) => void) | undefined;

    if (triggerElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0
        }
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none'
          },
          idx === 0 ? undefined : '<'
        );
      });

      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={parallaxRef} className="relative">
      <section className="full-bleed relative isolate overflow-hidden bg-gradient-to-br from-[#F8F6F3] to-white">
        <div data-parallax-layers className="relative h-[100svh] min-h-[600px] w-full">
          {/* Layer 1 — farthest back, moves the most: soft brand-colored glow */}
          <div data-parallax-layer="1" className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="h-[70vmin] w-[70vmin] rounded-full bg-gradient-to-br from-[#E86C2F]/25 via-[#f59e0b]/15 to-transparent blur-3xl" />
          </div>

          {/* Layer 2 — dot-grid texture */}
          <div data-parallax-layer="2" className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />

          {/* Layer 3 — headline, subtitle and CTAs */}
          <div
            data-parallax-layer="3"
            className="site-container absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            {eyebrow && (
              <p className="mb-4 inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
                {eyebrow}
              </p>
            )}
            <h1
              className="font-heading font-black leading-tight tracking-tight text-[#1A1A2E]"
              style={{ fontSize: 'clamp(1.75rem, 8vw, 4.5rem)', maxWidth: '20ch' }}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="text-sm font-semibold text-gray-500 underline-offset-4 transition hover:text-[#E86C2F] hover:underline"
                >
                  {secondaryCta.label} →
                </a>
              )}
            </div>
          </div>

          {/* Layer 4 — nearest, moves the least: floating proof card */}
          <div
            data-parallax-layer="4"
            className="absolute inset-x-0 bottom-12 flex justify-center md:justify-end md:pr-16"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86C2F]/10 text-[#E86C2F]">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#1A1A2E]">Appointment booked</p>
                <p className="text-xs text-gray-500">via AgastyaOne CRM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="flex justify-center py-6 text-gray-400">
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </div>
    </div>
  );
}
