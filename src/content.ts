/**
 * ALL SITE COPY AND DATA LIVES HERE.
 *
 * Every claim below is drawn from the CV and is verifiable. Nothing is
 * embellished. If a number changes, change it here and nowhere else.
 *
 * IMAGES: all assets are local, under `public/`. Nothing is hot-linked from a
 * third party. The files currently in `public/` are placeholders; replace them
 * with real artwork keeping the same filenames and the layout is unaffected.
 */

export const site = {
  name: 'Rawia Ahmed',
  title: 'Rawia Ahmed -- Frontend Tech Lead',
  heroHeading: "Hi, i'm rawia",
  heroTagline: 'a frontend tech lead building interfaces over genuinely complex systems',
  /** Short enough to scan in the hero. The full sentence lives in the contact section. */
  availability: 'Open to remote or relocation',
  nav: ['About', 'Expertise', 'Experience', 'Contact'],
} as const;

export const contact = {
  heading: 'Get in touch',
  blurb: 'Open to senior engineering and tech lead roles, either fully remote or with relocation.',
  email: 'rawia.emam91@gmail.com',
  linkedin: 'linkedin.com/in/rawia-ahmed-3b372733',
  linkedinUrl: 'https://linkedin.com/in/rawia-ahmed-3b372733',
  github: 'github.com/RawiaAhmed',
  githubUrl: 'https://github.com/RawiaAhmed',
  languages: 'Arabic (native) / English (C1)',
} as const;

export const cv = {
  label: 'Download CV',
  href: '/Rawia_Ahmed_CV.pdf',
  filename: 'Rawia_Ahmed_CV.pdf',
} as const;

export const about = {
  heading: 'About me',
  body:
    'I am a Technical Team Lead and Senior Frontend Engineer with 13 years of experience. ' +
    'I lead a team of 8 to 10 engineers and own delivery end to end, from architecture and ' +
    'code review through testing and release, with a zero QA rejection rate sustained since ' +
    '2022. I care most about the parts nobody sees: contracts that cannot drift, migrations ' +
    'that can be done incrementally, and interfaces that stay honest when the system underneath ' +
    'is only partly working.',
  /**
   * The four corner marks are the core stack, one per corner. These are
   * meaningful rather than decorative, so each carries real alt text.
   */
  props: {
    topLeft: { src: '/props/angular.svg', alt: 'Angular' },
    bottomLeft: { src: '/props/typescript.svg', alt: 'TypeScript' },
    topRight: { src: '/props/react.svg', alt: 'React' },
    bottomRight: { src: '/props/node.svg', alt: 'Node.js' },
  },
} as const;

/** Rawia's 3D avatar. */
export const heroPortrait = '/portrait.png';

export const expertise = [
  {
    number: '01',
    name: 'Frontend Architecture',
    description:
      'Angular and TypeScript at scale: a 250,000 line platform across 247 components, consolidated from 2 applications into a single workspace sharing one component library.',
  },
  {
    number: '02',
    name: 'Systems Integration',
    description:
      'Contract-first integration with 10 backend services, using typed clients generated from OpenAPI specifications so client and server contracts fail at compile time rather than in front of a customer.',
  },
  {
    number: '03',
    name: 'Team Leadership',
    description:
      'Leading 8 to 10 engineers through bi-weekly 1:1s, structured code review and pairing, owning performance reviews, career development and hiring. I have mentored graduates who left as senior engineers.',
  },
  {
    number: '04',
    name: 'Delivery Engineering',
    description:
      '197 versioned releases, moving from every few months to at least monthly. CI/CD on Azure DevOps built before a DevOps team existed, conventional commits, automated semantic versioning, linting enforced at zero warnings.',
  },
  {
    number: '05',
    name: 'AI-Assisted Development',
    description:
      'Setting team standards for working with AI tooling in production delivery, including written rules for what generated tests must cover. Generated code is reviewed with the same rigour as any pull request.',
  },
] as const;

export const experience = [
  {
    number: '01',
    role: 'Technical Team Lead, Front-End Focused',
    company: 'Intouch.com',
    location: 'Ireland (remote from Egypt)',
    period: '07/2022 - 08/2026',
    points: [
      'Lead a cross-functional team of 8 to 10 engineers to a zero QA rejection rate sustained since 2022, owning the full delivery lifecycle from PRDs and architecture through code review, testing and production deployment.',
      'Consolidated 2 enterprise Angular applications into a single workspace sharing 1 shared component library, eliminating logic that had drifted between separate repositories.',
      'Architected contract-first integration with 10 backend services, generating typed API clients from OpenAPI specifications so client and server contracts cannot drift silently.',
      'Built role-based access control across multiple tenant types using Azure AD and MSAL, with route guards, per-feature permissions and feature flags for staged rollout.',
      'Accelerated releases from every few months to at least monthly, shipping 197 versioned releases with same-week fast-track fixes.',
    ],
  },
  {
    number: '02',
    role: 'Senior Fullstack Web Developer',
    company: 'Intouch.com',
    location: 'El-Gouna, Egypt',
    period: '07/2018 - 06/2022',
    points: [
      'Joined as the 3rd technical hire and established engineering practices from scratch, including QA processes, CI/CD pipelines and infrastructure, and helped interview and hire the growing engineering team.',
      "Designed and implemented the company's first CI/CD pipelines with Azure DevOps, before a dedicated DevOps team existed.",
      'Migrated the platform from AWS to Azure and re-architected workloads onto serverless functions, completing the full migration in under 3 months without service disruption.',
      'Built and maintained RESTful APIs and BFF services using Node.js and NestJS, serving 5 to 6 consuming applications across the platform.',
    ],
  },
  {
    number: '03',
    role: 'Senior Front-End Developer',
    company: '247Labs',
    location: 'Cairo, Egypt',
    period: '02/2018 - 07/2018',
    points: [
      'Delivered responsive, cross-browser Angular single-page applications with Bootstrap and SCSS, translating UX and UI wireframes into interactive production interfaces.',
    ],
  },
  {
    number: '04',
    role: 'Senior Front-End Web Developer',
    company: 'HPE (DXC)',
    location: 'Cairo, Egypt',
    period: '01/2017 - 01/2018',
    points: [
      'Built a data-dense Angular dashboard for Mercedes-Benz managing factory production lines across German plants, as part of the core development team.',
      'Delivered bi-weekly progress demos directly to the client, gathering feedback and iterating on requirements.',
    ],
  },
  {
    number: '05',
    role: 'Front-End Web Developer',
    company: 'Youxel Technology',
    location: 'Cairo, Egypt',
    period: '09/2013 - 12/2016',
    points: [
      'Built the EFG Hermes mobile application for one of the largest financial services firms in the Middle East, delivering Arabic right-to-left interfaces.',
      'Delivered mobile banking applications for Saudi Arabian banking clients, implementing bilingual Arabic and English UI with full RTL layout support.',
    ],
  },
] as const;

