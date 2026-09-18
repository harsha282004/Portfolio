import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time by next/font: no render-blocking font request and
// no layout shift. Exposed as CSS variables used by globals.css / Tailwind.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const title = 'M Harshavardhana — Computer Science Engineer';
const description =
  'Computer Science Engineer | AI & Software Developer. Building intelligent software systems across AI, data and modern web technologies.';

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary', title, description },
};

export const viewport = {
  themeColor: '#05070c',
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the boot script below may add data-booted to
    // <html> before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        {/* Boot sequence plays once per session and never for reduced motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("hud-booted")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-booted","")}catch(e){}',
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
