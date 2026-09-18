'use client';

import SmoothScroll from '@/components/portfolio/SmoothScroll';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Education from '@/components/portfolio/Education';
import WhatIBuild from '@/components/portfolio/WhatIBuild';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Certifications from '@/components/portfolio/Certifications';
import DeveloperProfile from '@/components/portfolio/DeveloperProfile';
import Resume from '@/components/portfolio/Resume';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

// One continuous scrolling page. Phase 9 adds the closing Footer + polish.
function App() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full overflow-x-hidden bg-void text-ink">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <WhatIBuild />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <DeveloperProfile />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default App;
