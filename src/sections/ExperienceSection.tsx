import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { useMediaQuery } from '../components/useMediaQuery';
import { experience } from '../content';

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  /**
   * The sticky card stack only works when a card fits inside the viewport with
   * room left over. On a phone these cards are taller than the screen, so a
   * fixed-height sticky container clipped the bullets and let the next card
   * slide over the text. Below `md` the cards become an ordinary vertical list.
   */
  const stackable = useMediaQuery('(min-width: 768px)');

  return (
    <section
      id="experience"
      ref={ref}
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>

      {experience.map((role, i) => (
        <Card
          key={role.number}
          role={role}
          index={i}
          total={experience.length}
          progress={scrollYProgress}
          stackable={stackable}
        />
      ))}
    </section>
  );
}

function Card({
  role,
  index,
  total,
  progress,
  stackable,
}: {
  role: (typeof experience)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  stackable: boolean;
}) {
  const reduced = useReducedMotion();

  // Each card settles at a slightly smaller scale than the one above it, so the
  // stack reads as depth rather than as cards simply overlapping.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="mb-6 flex items-start justify-center sm:mb-8 md:mb-0 md:h-[85vh]">
      <motion.div
        className="relative w-full rounded-[40px] border-2 border-[#D7E2EA] p-5 sm:rounded-[50px] sm:p-7 md:sticky md:top-32 md:rounded-[60px] md:p-10"
        style={{
          background: '#0C0C0C',
          // Scaling on scroll is decoration, and it only reads correctly while
          // the cards actually stack. Off on mobile and under reduced motion.
          scale: stackable && !reduced ? scale : 1,
          top: stackable ? `${index * 28}px` : undefined,
        }}
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {role.number}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {role.role}
              </h3>
              <p className="text-sm font-light uppercase tracking-widest text-[#D7E2EA] opacity-75 sm:text-base">
                {role.company} &nbsp;/&nbsp; {role.location}
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border-2 border-[#D7E2EA]/40 px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] sm:px-7 sm:py-2.5 sm:text-sm">
            {role.period}
          </span>
        </div>

        <ul className="flex flex-col gap-3 sm:gap-4">
          {role.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 font-light leading-relaxed text-[#D7E2EA] opacity-90"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
            >
              <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[#D7E2EA]" />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
