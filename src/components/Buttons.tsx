import { Download } from 'lucide-react';
import { contact, cv } from '../content';

/**
 * An anchor, not a button. It navigates to a mail client, which is a link, so
 * it gets link semantics for free: keyboard activation, right-click to copy the
 * address, and the destination announced by a screen reader.
 */
export function ContactButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={`mailto:${contact.email}`}
      className={`inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-90 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </a>
  );
}


/**
 * Download rather than navigate, so it is an anchor with `download`. Kept
 * visually distinct from ContactButton (outline, not gradient) so the two
 * primary actions on the page do not compete with each other.
 */
export function DownloadCvButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={cv.href}
      download={cv.filename}
      className={`inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
      {cv.label}
    </a>
  );
}
