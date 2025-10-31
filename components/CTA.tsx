'use client';

import MagneticButton from './MagneticButton';

interface CTAProps {
  href: string;
  label: string;
}

export default function CTA({ href, label }: CTAProps) {
  return (
    <MagneticButton
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-accentBlue-600 to-accentBlue-700 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-accentBlue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-accentBlue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue-400 focus-visible:ring-offset-2 min-h-[44px]"
      strength={12}
    >
      <span>{label}</span>
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
      </svg>
    </MagneticButton>
  );
}
