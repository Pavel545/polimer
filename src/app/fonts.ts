// app/fonts.ts
import localFont from 'next/font/local';

// --- Inter ---
export const inter = localFont({
  src: [
    {
      path: '../../public/fonts/web/inter-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/web/inter-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-family',
  display: 'swap',
});

// --- Montserrat ---
export const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/web/montserrat-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  preload: false,
  variable: '--third-family',
  display: 'swap',
});


// --- Montserrat ---
export const russoOne = localFont({
  src: [
    {
      path: '../../public/fonts/RussoOne-Regular.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  // preload: false,
  variable: '--russo-family',
  display: 'swap',
});