import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { DownloadCvButton } from '../components/Buttons';
import { site, heroPortrait } from '../content';

export function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" immediate delay={0} y={-20} className="px-6 pt-6 md:px-10 md:pt-8" aria-label="Primary">
        <ul className="flex justify-between">
          {site.nav.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/*
        The heading is sized in vw and must not exceed 100vw, because the
        wrapper clips overflow. The safe size depends on the name: this string
        renders about 5.83x its font-size in width, so 16.8vw fills roughly 98vw.
        If the heading text changes, re-check with:
          ctx.font = `900 100px Kanit`; ctx.measureText(text).width / 100
        and set the largest breakpoint to a little under 100 / that ratio.
      */}
      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          immediate
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[16.8vw]"
        >
          {site.heroHeading}
        </FadeIn>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <div className="flex max-w-[180px] flex-col gap-3 sm:max-w-[240px] md:max-w-[300px]">
          <FadeIn
            as="p"
            immediate
            delay={0.35}
            y={20}
            className="font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {site.heroTagline}
          </FadeIn>

          {/*
            Availability sits in the hero because it is the filter a recruiter
            applies first. Buried at the foot of the page it reaches almost
            nobody. The dot marks it as status rather than prose.
          */}
          <FadeIn
            immediate
            delay={0.45}
            y={20}
            className="flex items-center gap-2 text-[#D7E2EA]"
          >
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#BBCCD7]" />
            <span
              className="font-medium uppercase tracking-widest"
              style={{ fontSize: 'clamp(0.65rem, 1vw, 0.95rem)' }}
            >
              {site.availability}
            </span>
          </FadeIn>
        </div>

        <FadeIn immediate delay={0.5} y={20}>
          <DownloadCvButton />
        </FadeIn>
      </div>

      {/*
        Centring lives on this plain wrapper, NOT on the FadeIn.

        FadeIn is a motion component and Framer Motion writes `transform` as an
        inline style, which beats Tailwind's `-translate-x-1/2` class. Putting
        both on one element leaves the portrait sitting with its left edge at
        centre instead of its middle. Separating them lets the wrapper own
        position and the motion component own animation.
      */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn immediate delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img src={heroPortrait} alt={`${site.name}, Frontend Tech Lead`} className="w-full" />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
