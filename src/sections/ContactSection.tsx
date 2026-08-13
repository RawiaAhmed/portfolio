import { Mail, Linkedin, Github, Languages } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { contact, site } from '../content';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 py-24 sm:px-8 sm:py-28 md:px-10 md:py-36"
      style={{ background: '#0C0C0C' }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:gap-12">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {contact.heading}
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          className="max-w-[520px] font-light leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        >
          {contact.blurb}
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-col items-center gap-5 sm:gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1rem, 2.4vw, 1.6rem)' }}
          >
            <Mail aria-hidden="true" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            {contact.email}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4 shrink-0" />
              LinkedIn
            </a>
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base"
            >
              <Github aria-hidden="true" className="h-4 w-4 shrink-0" />
              GitHub
            </a>
            <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-base">
              <Languages aria-hidden="true" className="h-4 w-4 shrink-0" />
              {contact.languages}
            </span>
          </div>
        </FadeIn>

      </div>

      {/*
        The signature sits outside the centred column so it can run to the page
        edge. Not uppercase and no letter-spacing: a signature should read as
        handwriting, and both would fight the script face.
      */}
      <FadeIn
        as="p"
        delay={0.2}
        className="mt-20 pr-2 text-right font-signature leading-none text-[#D7E2EA] sm:mt-24 md:mt-28"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5rem)' }}
      >
        {site.name}
      </FadeIn>
    </section>
  );
}
