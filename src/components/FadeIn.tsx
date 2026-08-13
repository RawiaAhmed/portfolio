import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ComponentType, CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';

interface FadeInProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'style'> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /**
   * Animate on mount instead of on scroll. Use for above-the-fold content: the
   * hero is visible immediately, so gating it behind an IntersectionObserver
   * callback risks it never appearing if the observer is delayed or blocked.
   */
  immediate?: boolean;
}

type Variant = { opacity: number; x: number; y: number };

/**
 * `motion.create()` is generic over the tag, so a cache cannot preserve each
 * element's exact prop type. This is the narrow surface we actually use, which
 * keeps `className` and `style` type-checked rather than falling back to `any`.
 */
type MotionLike = ComponentType<
  HTMLAttributes<HTMLElement> & {
    ref?: React.Ref<HTMLElement>;
    initial?: Variant;
    animate?: Variant;
    transition?: { delay: number; duration: number; ease: number[] };
  }
>;

/**
 * Module-level cache, and it is load-bearing.
 *
 * `motion.create()` returns a NEW component type on every call. Calling it in
 * the render body means React sees a different type each render, unmounts the
 * node and remounts it, so the entrance animation restarts from its initial
 * state and never finishes. Caching by tag keeps the identity stable.
 */
const motionCache = new Map<ElementType, MotionLike>();

function motionFor(tag: ElementType): MotionLike {
  let component = motionCache.get(tag);
  if (!component) {
    component = motion.create(tag) as unknown as MotionLike;
    motionCache.set(tag, component);
  }
  return component;
}

/**
 * Scroll-triggered entrance.
 *
 * Uses the `useInView` hook driving an explicit `animate` prop rather than the
 * `whileInView` shorthand. Two reasons: the visible state is derived from a
 * value we can read and debug, and `animate` always reflects that value, so the
 * element cannot get stuck part-way if the observer fires oddly.
 *
 * `once: true` so sections do not replay when scrolling back up.
 */
export function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  immediate = false,
  // Anything else (aria-*, id, role, data-*) is forwarded. Without this the
  // component silently swallows attributes it does not know about, which is
  // how an aria-label can pass type checking and never reach the DOM.
  ...rest
}: FadeInProps) {
  const Tag = motionFor(as);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Matches the original design spec: a positive margin EXPANDS the observer
  // root, so an element counts as in-view 50px BEFORE it reaches the viewport,
  // and `amount: 0` means any single pixel is enough. Together they make the
  // entrance arrive with the scroll rather than trailing behind it. A negative
  // bottom margin here is what makes the animation feel late.
  const inView = useInView(ref, { once: true, margin: '50px', amount: 0 });

  // If the environment has no IntersectionObserver at all, there is nothing to
  // trigger the entrance, and content that only appears via an animation would
  // stay invisible forever. Showing it immediately is the correct failure mode.
  const noObserver = typeof IntersectionObserver === 'undefined';

  // Reduced motion, or any environment where rAF is paused, must still show the
  // content. Rendering the settled state directly means the page is never gated
  // behind an animation that may never run.
  if (reduced) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const settled: Variant = { opacity: 1, x: 0, y: 0 };
  const hidden: Variant = { opacity: 0, x, y };
  const visible = immediate || noObserver || inView;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      {...rest}
      initial={hidden}
      animate={visible ? settled : hidden}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Tag>
  );
}
