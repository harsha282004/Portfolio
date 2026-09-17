// Central portfolio content for M Harshavardhana.
// Phase 1: identity + navigation only. Do NOT invent additional data here.

export const identity = {
  fullName: 'M Harshavardhana',
  // Visual name treatment is intentionally split (the leading "M" is omitted in the hero).
  firstName: 'HARSHA',
  lastName: 'VARDHANA',
  wordmark: 'HARSHAVARDHANA',
  headline: 'Computer Science Engineer | AI & Software Developer',
  supporting:
    'Building intelligent software systems across AI, data and modern web technologies.',
  photo: {
    src: '/images/formal-attire.jpeg',
    alt: 'Portrait photograph of M Harshavardhana, Computer Science Engineer',
  },
};

// Navigation targets for the one-page scroll. All anchors are live in Phase 8.
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Work', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// ---------------------------------------------------------------------------
// PHASE 2 CONTENT — verbatim from the brief. Do NOT embellish or invent.
// ---------------------------------------------------------------------------
export const about = {
  eyebrow: 'About Me',
  statement: ['I build solutions', 'for real-world problems.'],
  paragraphs: [
    'I chose Computer Science and Engineering because I enjoy building solutions for real-world problems. I am particularly interested in artificial intelligence and software development, and I enjoy turning ideas into practical systems.',
    'Currently, I am strengthening my skills in advanced Java, system design concepts, and problem solving through LeetCode.',
    'I am looking for opportunities in Software Development, Full-Stack Development, and Data Analytics where I can continue learning while contributing to real-world engineering problems.',
  ],
  facts: [
    { label: 'Discipline', value: 'Computer Science Engineering' },
    { label: 'Institution', value: 'Global Academy of Technology' },
    { label: 'Graduating', value: '2027' },
    { label: 'Current Focus', value: 'Java · System Design · DSA' },
  ],
};

export const education = [
  {
    id: 'x',
    year: '2021',
    institution: 'Bunts Sangha RNS Vidyaniketan',
    qualification: 'Class X — ICSE',
    score: '88%',
  },
  {
    id: 'xii',
    year: '2023',
    institution: 'Narayana PU College',
    qualification: 'Class XII — State Board',
    score: '76%',
  },
  {
    id: 'be',
    yearRange: ['2023', '2027'],
    institution: 'Global Academy of Technology',
    location: 'Bangalore',
    qualification: 'B.E. in Computer Science and Engineering',
    score: 'CGPA: 7.07',
  },
];

// ---------------------------------------------------------------------------
// PHASE 3 CONTENT — authoritative. Do NOT add technologies beyond these lists.
// ---------------------------------------------------------------------------
export const build = {
  bridge: 'Learning became building.',
  eyebrow: 'What I Build',
  statement: 'I build intelligent software systems.',
  supporting:
    'My work combines artificial intelligence, software engineering, data and computer vision to turn real-world problems into practical technical solutions.',
  areas: [
    { index: '01', title: 'AI Systems', tags: ['RAG', 'LLMs', 'AI Agents', 'NLP'] },
    {
      index: '02',
      title: 'Software Engineering',
      tags: ['Full-Stack Development', 'REST APIs', 'Backend Systems', 'Modern Web Applications'],
    },
    {
      index: '03',
      title: 'Computer Vision',
      tags: ['Deep Learning', 'Image Analysis', 'Satellite Imagery', 'Siamese U-Net'],
    },
    {
      index: '04',
      title: 'Data & Geospatial Systems',
      tags: ['SQL', 'Databases', 'PostgreSQL', 'PostGIS', 'Data-driven applications'],
    },
  ],
};

export const skills = {
  eyebrow: 'Capabilities',
  heading: 'Technical Skills',
  categories: [
    { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
    {
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'React', 'Next.js', 'TanStack Start', 'Vite', 'Tailwind CSS'],
    },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT'] },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'Prisma', 'PostGIS', 'MongoDB', 'Redis', 'ChromaDB'],
    },
    {
      category: 'AI / Machine Learning',
      items: [
        'Machine Learning',
        'Deep Learning',
        'PyTorch',
        'Scikit-learn',
        'RAG',
        'AI Agents',
        'SentenceTransformers',
        'BM25',
        'SVM Reranking',
        'Siamese U-Net',
      ],
    },
    { category: 'Tools', items: ['Git', 'GitHub', 'Docker'] },
  ],
};

// ---------------------------------------------------------------------------
// PHASE 4 CONTENT — verbatim from resume. Do NOT invent metrics/roles/etc.
// ---------------------------------------------------------------------------
export const experience = {
  eyebrow: 'Career',
  heading: 'Experience',
  items: [
    {
      id: 'codealpha',
      index: '01',
      company: 'CodeAlpha',
      role: 'Full-Stack Development Intern',
      period: 'September 2026 – October 2026',
      duration: '1 Month',
      descriptions: [
        'Developed full-stack applications using React, TypeScript, TanStack Start, Node.js, Express.js, PostgreSQL, Prisma, REST APIs, and JWT authentication.',
        'Built ShopSphere, Connectly, and TaskFlow, implementing responsive interfaces, backend endpoints, database models, authentication, CRUD workflows, and application functionality.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'TanStack Start',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Prisma',
        'REST APIs',
        'JWT',
      ],
      applications: [
        { name: 'ShopSphere', kind: 'E-commerce application' },
        { name: 'Connectly', kind: 'Social media application' },
        { name: 'TaskFlow', kind: 'Project management application' },
      ],
    },
    {
      id: 'unlox',
      index: '02',
      company: 'Unlox Academy',
      role: 'Campus Ambassador',
      period: '2026',
      duration: '1 Month',
      descriptions: [
        'Represented Unlox Academy at Global Academy of Technology, promoting student programs and educating students about opportunities and participation.',
      ],
      technologies: [],
      applications: [],
    },
  ],
};

// ---------------------------------------------------------------------------
// PHASE 6 CONTENT — verbatim. Do NOT invent ranks, prizes, scores, IDs, dates.
// ---------------------------------------------------------------------------
export const achievements = {
  eyebrow: 'Achievements',
  heading: 'Built through challenges.',
  supporting:
    'Experiences that reflect my interest in solving real-world problems through technology.',
  items: [
    {
      id: 'sih',
      year: '2025',
      title: 'Smart India Hackathon 2025',
      description:
        'Selected through the internal college hackathon to participate in Smart India Hackathon 2025.',
    },
    {
      id: 'ibmz',
      year: '2025',
      title: 'IBM Z Datathon 2025',
      description:
        'Participated in IBM Z Datathon 2025 and submitted an AI/ML project focused on climate-health risk prediction.',
    },
  ],
};

export const certifications = {
  eyebrow: 'Certifications',
  heading: 'Continuously learning.',
  supporting:
    'Certifications and structured learning that complement my engineering journey.',
  items: [
    {
      id: 'frontend',
      title: 'Front End Web Developer',
      provider: 'Infosys Springboard',
      image: {
        // Add /images/certificates/frontend-web-developer.png then set src.
        src: null,
        alt: 'Front End Web Developer certificate — Infosys Springboard',
      },
    },
    {
      id: 'cloud',
      title: 'Cloud Computing Fundamentals',
      provider: 'Simplilearn',
      image: {
        // Add /images/certificates/cloud-computing-fundamentals.png then set src.
        src: null,
        alt: 'Cloud Computing Fundamentals certificate — Simplilearn',
      },
    },
  ],
  cta: {
    title: 'View my professional journey',
    supporting:
      'More project updates, certificates, and professional activity are available on my LinkedIn profile.',
    linkLabel: 'LinkedIn',
    href: 'https://www.linkedin.com/in/m-harshavardhana-gowda-321977339/',
  },
};

// ---------------------------------------------------------------------------
// PHASE 7 CONTENT — real repositories + contact links. No fabricated stats.
// ---------------------------------------------------------------------------
export const developer = {
  eyebrow: 'Developer Profile',
  heading: 'Code is where I build.',
  supporting:
    'My repositories document the systems, experiments, and applications I have built while developing my engineering skills.',
  github: { username: 'harsha282004', url: 'https://github.com/harsha282004' },
  repos: [
    {
      index: '01',
      name: 'GAT AI Virtual Campus',
      category: 'AI / RAG / Multi-Agent',
      description:
        'AI-powered virtual campus tour and query assistant with RAG, multi-agent architecture, interactive navigation, and voice-assisted guidance.',
      links: [
        { label: 'GitHub', href: 'https://github.com/harsha282004/GAT-AI-Virtual-Campus', kind: 'github' },
        { label: 'Live Demo', href: 'https://gat-ai-virtual-campus.vercel.app/', kind: 'demo' },
      ],
    },
    {
      index: '02',
      name: 'Satellite Image Change Detection System',
      category: 'Computer Vision / Deep Learning',
      description:
        'Deep learning-based multi-temporal satellite image change detection using a Siamese U-Net architecture.',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/harsha282004/Satellite-Image-Change-Detection-System',
          kind: 'github',
        },
      ],
    },
    {
      index: '03',
      name: 'ORCA — Marine Ecosystem Reasoning with Collaborative Agents',
      category: 'Agentic AI / Marine Intelligence',
      description:
        'Agentic AI platform for marine intelligence combining Earth observation, oceanographic, weather, and GIS information.',
      links: [
        { label: 'GitHub', href: 'https://github.com/harsha282004/ORCA-SIH-2026', kind: 'github' },
      ],
    },
    {
      index: '04',
      name: 'CodeAlpha Full-Stack Internship',
      category: 'Full-Stack / REST API / Databases',
      description:
        'Full-stack development internship repository containing ShopSphere, Connectly, and TaskFlow.',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/harsha282004/CodeAlpha_FullStack_Internship',
          kind: 'github',
        },
      ],
    },
  ],
  connect: [
    { label: 'GitHub', value: 'harsha282004', href: 'https://github.com/harsha282004', icon: 'github', external: true },
    {
      label: 'LinkedIn',
      value: 'm-harshavardhana-gowda',
      href: 'https://www.linkedin.com/in/m-harshavardhana-gowda-321977339/',
      icon: 'linkedin',
      external: true,
    },
    { label: 'Email', value: 'harshamgowda28@gmail.com', href: 'mailto:harshamgowda28@gmail.com', icon: 'mail', external: false },
    { label: 'Phone', value: '+91 97413 28124', href: 'tel:+919741328124', icon: 'phone', external: false },
  ],
};

// ---------------------------------------------------------------------------
// PHASE 8 — centralized profile/config (contact + resume). Real values only.
// ---------------------------------------------------------------------------
export const profile = {
  name: 'M Harshavardhana',
  email: 'harshamgowda28@gmail.com',
  emailHref: 'mailto:harshamgowda28@gmail.com',
  phone: '+91 9741328124',
  phoneHref: 'tel:+919741328124',
  linkedin: 'https://www.linkedin.com/in/m-harshavardhana-gowda-321977339/',
  github: 'https://github.com/harsha282004',
  // Place the real PDF at public/resume/M-Harshavardhana-Resume.pdf
  resume: '/resume/M-Harshavardhana-Resume.pdf',
  resumeFilename: 'M-Harshavardhana-Resume.pdf',
};

export const resumeSection = {
  eyebrow: 'Resume',
  heading: "Let's build what's next.",
  supporting:
    'A concise overview of my education, experience, projects, and technical skills.',
};

export const contactSection = {
  eyebrow: 'Contact',
  heading: "Let's connect.",
  supporting:
    'Open to opportunities in software development, full-stack development, and data analytics.',
};
