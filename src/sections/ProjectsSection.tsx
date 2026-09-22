import { FadeIn } from '../components/FadeIn';
import { projects } from '../content';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {projects.map((project, i) => (
          <FadeIn
            key={project.number}
            delay={i * 0.1}
            className="flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.15)' }}
          >
            <span
              className="shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#FFFFFF' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-3">
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.1rem)', color: '#FFFFFF' }}
              >
                {project.name}
              </h3>

              <p
                className="font-light leading-snug"
                style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.35rem)', color: '#FFFFFF', opacity: 0.75 }}
              >
                {project.tagline}
              </p>

              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)', color: '#FFFFFF', opacity: 0.6 }}
              >
                {project.description}
              </p>

              {/* The stack is a list rather than prose: it is scanned, not read. */}
              <ul className="flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full px-3 py-1 text-xs font-light sm:text-sm"
                    style={{ border: '1px solid rgba(255, 255, 255, 0.25)', color: '#FFFFFF', opacity: 0.8 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap gap-5">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                    style={{ color: '#FFFFFF' }}
                  >
                    {/* The project name is in the label so the link makes sense read on its own. */}
                    {link.label}
                    <span className="sr-only"> for {project.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
