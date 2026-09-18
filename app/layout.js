import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'M Harshavardhana — Computer Science Engineer',
  description:
    'Computer Science Engineer | AI & Software Developer. Building intelligent software systems across AI, data and modern web technologies.',
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the boot script below may add data-booted to
    // <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
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
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
