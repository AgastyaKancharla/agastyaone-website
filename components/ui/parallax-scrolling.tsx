'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronDown } from 'lucide-react';
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
        { layer: '1', yPercent: 45 },
        { layer: '2', yPercent: 8 }
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
      <section className="full-bleed relative isolate overflow-hidden bg-[#0b0f19]">
        <div data-parallax-layers className="relative h-[100svh] min-h-[600px] w-full">
          {/* Layer 1 — the scene, moves away fastest as you scroll */}
          <div data-parallax-layer="1" className="absolute inset-0" aria-hidden="true">
            <Image
              src="/hero-parallax.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/10" />
          </div>

          {/* Layer 2 — title, stays nearly pinned while the scene recedes */}
          <div
            data-parallax-layer="2"
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            {eyebrow && (
              <p className="mb-4 inline-flex items-center rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-orange-700">
                {eyebrow}
              </p>
            )}
            <h1
              className="font-heading font-black leading-[0.95] tracking-tight text-[#1A1A2E] drop-shadow-sm"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 7rem)' }}
            >
              AgastyaOne
            </h1>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8F6F3] to-transparent" />
      </section>

      {/* Supporting copy + CTAs — sits below the cinematic shot so it stays readable regardless of the photo */}
      <div className="site-container flex flex-col items-center py-14 text-center">
        <h2
          className="font-heading font-black leading-tight tracking-tight text-[#1A1A2E]"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2.75rem)', maxWidth: '22ch' }}
        >
          {title}
        </h2>
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
        <ChevronDown className="mt-10 h-6 w-6 animate-bounce text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
}
