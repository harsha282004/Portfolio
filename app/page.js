'use client';

import SmoothScroll from '@/components/portfolio/SmoothScroll';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Journey from '@/components/portfolio/Journey';
import WhatIBuild from '@/components/portfolio/WhatIBuild';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Certifications from '@/components/portfolio/Certifications';
import DeveloperProfile from '@/components/portfolio/DeveloperProfile';
import Resume from '@/components/portfolio/Resume';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import HudCursor from '@/components/portfolio/HudCursor';
import BootSequence from '@/components/portfolio/BootSequence';

// One continuous scrolling page, ordered as a player-profile flow:
// boot -> profile -> journey -> capabilities -> loadout -> missions ->
// achievements -> credentials -> source code -> dossier -> comms.
function App() {
  return (
    <SmoothScroll>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:bg-hud focus:px-4 focus:py-2 focus:font-hud focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-void"
      >
        Skip to content
      </a>
      <main className="relative min-h-screen w-full overflow-x-clip bg-void text-ink">
        <Navbar />
        <Hero />
        <About />
        <Journey />
        <WhatIBuild />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <DeveloperProfile />
        <Resume />
        <Contact />
        <Footer />
      </main>
      <HudCursor />
      <BootSequence />
    </SmoothScroll>
  );
}

export default App;
