import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveals text character by character as the paragraph moves through the
 * viewport.
 *
 * Two details that are easy to get wrong:
 *
 * 1. **Split by word first, then by character.** Every character is an
 *    inline-block, and the browser will happily break a line between any two
 *    inline-blocks. Splitting only by character produces mid-word wraps like
 *    "Enginee / r". Wrapping each word in its own inline-block keeps normal
 *    word-breaking behaviour.
 *
 * 2. **Each character keeps an invisible copy in normal flow**, with the
 *    animated copy absolutely positioned on top. Animating the glyph directly
 *    would reflow the paragraph on every frame.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const reduced = useReducedMotion();

  // Under reduced motion the paragraph is just a paragraph. The per-character
  // reveal is decoration; the words are the content.
  if (reduced) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  // Keep the spaces as their own tokens so the gaps still animate in order.
  const words = text.split(/(\s+)/);
  const totalChars = text.length;
  let charIndex = 0;

  // The per-character split is a visual effect only. Every character exists
  // twice in the DOM, so without aria-label the paragraph is announced twice,
  // character by character.
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, w) => {
        const start = charIndex;
        charIndex += word.length;
        return (
          <span
            key={w}
            aria-hidden="true"
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {word.split('').map((char, i) => {
              const index = start + i;
              return (
                <Char
                  key={i}
                  progress={scrollYProgress}
                  range={[index / totalChars, (index + 1) / totalChars]}
                >
                  {char}
                </Char>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

function Char({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre' }}>
      <span style={{ opacity: 0 }}>{children}</span>
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
