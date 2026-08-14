# Portfolio

Personal site for Rawia Ahmed, Technical Team Lead and Senior Frontend Engineer.

React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · Vite

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the production build locally
```

---

## Structure

```
src/
├── content.ts                 all copy and data
├── components/
│   ├── FadeIn.tsx             entrance animation, on scroll or on mount
│   ├── Magnet.tsx             cursor-following hover effect
│   ├── AnimatedText.tsx       per-character scroll reveal
│   ├── Buttons.tsx            contact and CV download
│   └── useMediaQuery.ts       viewport-conditional behaviour
└── sections/
    ├── HeroSection.tsx        nav, gradient headline, availability, portrait
    ├── AboutSection.tsx       bio, stack marks, contact
    ├── ExpertiseSection.tsx   numbered capability list
    ├── ExperienceSection.tsx  sticky cards that stack and scale
    └── ContactSection.tsx     email, links, signature
```

**All copy and data lives in [`src/content.ts`](src/content.ts).** No section component references content by name, so editing that one file cannot break the layout. Assets are local, in `public/`.

---

## Implementation notes

The parts that were not obvious, and why they are the way they are.

### `motion.create()` is cached at module level

It returns a **new component type on every call**. Calling it inside a render means React sees a different type each time, unmounts the node and remounts it, so the entrance animation restarts from its initial state and never completes. The element stays invisible. `FadeIn` caches by tag to keep the identity stable.

### Above-the-fold content animates on mount, not on scroll

The hero is visible immediately, so gating it behind an `IntersectionObserver` callback risks it never appearing if the observer is delayed or blocked. `FadeIn` takes an `immediate` prop that switches from `useInView` to a plain `animate`.

### Nothing is visible *only* because an animation ran

`FadeIn`, `Magnet` and `AnimatedText` all check `useReducedMotion` and render their settled state directly, and `FadeIn` also shows content if `IntersectionObserver` is missing entirely. Anything that appears only as the result of an animation is invisible whenever that animation does not run: reduced-motion users, background tabs where the browser pauses `requestAnimationFrame`, and older browsers.

### `AnimatedText` splits by word first, then by character

Each character is an inline-block, and the browser will break a line between any two inline-blocks. Splitting only by character produces mid-word wraps such as `Enginee / r`. Each word is its own inline-block so normal word-breaking survives.

Every character also exists twice in the DOM, an invisible placeholder holding the line box plus an absolutely positioned animated copy, so the paragraph carries an `aria-label` with the real sentence and the spans are hidden from assistive technology. Without that, a screen reader announces the paragraph twice, letter by letter.

### Never put a Tailwind `translate-*` class on a `motion` element

Framer Motion writes `transform` as an inline style, which beats the class. The hero portrait had `-translate-x-1/2` on the same element that Framer animated, so it lost its centring and sat with its left edge at centre. Positioning now lives on a plain wrapper and animation on the motion child.

### The sticky card stack is disabled below `md`

The effect assumes a card fits inside the viewport with room to spare. On a phone these cards are taller than the screen, so a fixed-height sticky container clipped the text and let the next card slide over it. Below 768px the cards are an ordinary vertical list at natural height.

### The hero heading is sized in `vw` and must not exceed `100vw`

The wrapper clips overflow, so an oversized heading is silently cropped. The safe size depends on the string: the current one renders about 5.83× its font-size in width. If the heading changes, re-measure:

```js
ctx.font = '900 100px Kanit';
ctx.measureText(text).width / 100;   // width per font-pixel
```

and set the largest breakpoint a little under `100 / ratio`.

---

## Accessibility

- Skip link to `#main`, visible on focus
- Explicit `:focus-visible` rings; the browser default is invisible on this dark palette
- All text meets WCAG AA against its actual background (lowest measured 14.86:1 on dark, 19.56:1 on the light panel)
- `prefers-reduced-motion` respected in components and as a page-level backstop
- Labelled `nav` landmark, meaningful `alt` text on the stack marks, decorative elements hidden from assistive tech

---

## Deploying

Static output, so any host works. Build with `npm run build` and serve `dist/`.

On Vercel or Netlify, connect the repository and accept the defaults: build command `npm run build`, output directory `dist`.

Update the absolute URLs in `index.html` (`og:image`, `twitter:image`) to the live domain once it exists, otherwise link previews will not resolve the image.

---

## Licence

The **code** in this repository is MIT licensed. See [LICENSE](LICENSE). Use it, fork it, learn from it.

The **personal content is not**, and is excluded from that grant: my name, the avatar in `public/portrait.png`, my CV in `public/Rawia_Ahmed_CV.pdf`, and the biography, experience and contact text in `src/content.ts`.

If you want to reuse the site, take the components and replace `src/content.ts` and the files in `public/` with your own. That is exactly why all the copy lives in a single file.
