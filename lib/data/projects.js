// PHASE 5 — Featured Projects data. Content is authoritative (from resume /
// brief). Do NOT invent metrics, outcomes, extra tech, or statistics.
// `src` points at the real screenshot in public/images/projects/<dir>/;
// `aspect` is the image's native width / height so it is never cropped.

export const projectsIntro = {
  eyebrow: 'Selected Work',
  heading: 'Projects that turn ideas into systems.',
  supporting:
    'Selected work across AI systems, computer vision, full-stack development, and intelligent software applications.',
};

export const projects = {
  virtualCampus: {
    id: 'virtual-campus',
    index: '01',
    title: 'AI Agent-Based Virtual Campus Tour and Query Assistant',
    category: 'AI / RAG / Multi-Agent System / Full-Stack',
    description:
      'An AI-powered campus query and virtual tour system designed to provide grounded campus information, interactive navigation, and voice-assisted guidance.',
    approach: [
      'Supervisor-led multi-agent architecture',
      'Retrieval-Augmented Generation (RAG)',
      'Interactive campus navigation',
    ],
    agents: ['Admissions', 'Academics', 'Facilities', 'Navigation'],
    tech: [
      'SentenceTransformers',
      'ChromaDB',
      'BM25',
      'SVM Reranking',
      'PostgreSQL',
      'PostGIS',
    ],
    imageDir: '/images/projects/virtual-campus/',
    images: [
      {
        src: '/images/projects/virtual-campus/virtual-campus.png',
        aspect: '1901 / 860',
        label: 'Interface',
        alt: 'AI Virtual Campus Tour and Query Assistant interface',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/harsha282004/GAT-AI-Virtual-Campus',
        kind: 'github',
      },
      {
        label: 'Live Demo',
        href: 'https://gat-ai-virtual-campus.vercel.app/',
        kind: 'demo',
      },
    ],
  },

  satellite: {
    id: 'satellite-change-detection',
    index: '02',
    title: 'Deep Learning-Based Multi-Temporal Satellite Image Change Detection System',
    category: 'Computer Vision / Deep Learning / Satellite Imagery',
    description:
      'A deep learning-based change detection system for identifying and localizing changes between multi-temporal satellite images.',
    approach: [
      'LEVIR-CD dataset',
      'Siamese U-Net',
      'Pixel-level binary change masks',
      'Change-region quantification',
      'Building localization',
      'Overlay visualization',
    ],
    tech: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision', 'Siamese U-Net'],
    imageDir: '/images/projects/satellite-change-detection/',
    images: [
      {
        src: '/images/projects/satellite-change-detection/satellite-before.png',
        aspect: '1901 / 837',
        label: 'Before',
        alt: 'Satellite image — before (time A)',
      },
      {
        src: '/images/projects/satellite-change-detection/change.png',
        aspect: '1902 / 842',
        label: 'Change',
        alt: 'Detected change mask output',
      },
      {
        src: '/images/projects/satellite-change-detection/satellite-after.png',
        aspect: '1221 / 822',
        label: 'After',
        alt: 'Satellite image — after (time B)',
      },
    ],
    pipeline: [
      'Multi-temporal images',
      'Siamese U-Net',
      'Pixel-level change mask',
      'Change region',
      'Visualization',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/harsha282004/Satellite-Image-Change-Detection-System',
        kind: 'github',
      },
    ],
  },

  suite: {
    id: 'codealpha-suite',
    index: '03',
    title: 'Full-Stack Development Suite',
    category: 'Full-Stack Development / REST APIs / Database Systems',
    description:
      'A collection of full-stack applications developed during my CodeAlpha Full-Stack Development Internship.',
    subProjects: [
      {
        name: 'ShopSphere',
        imageDir: '/images/projects/shopsphere/',
        src: '/images/projects/shopsphere/shopsphere.png',
        aspect: '1917 / 863',
        alt: 'ShopSphere e-commerce application',
        description:
          'E-commerce application with product browsing, cart, checkout, authentication, and admin functionality.',
        tech: [
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
        github:
          'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task1',
      },
      {
        name: 'Connectly',
        imageDir: '/images/projects/connectly/',
        src: '/images/projects/connectly/connectly.png',
        aspect: '1917 / 845',
        alt: 'Connectly social platform',
        description:
          'Social platform featuring profiles, posts, likes, comments, follows, feeds, explore, and search functionality.',
        tech: ['React', 'TanStack Start', 'Express.js', 'PostgreSQL', 'Prisma'],
        github:
          'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task2',
      },
      {
        name: 'TaskFlow',
        imageDir: '/images/projects/taskflow/',
        src: '/images/projects/taskflow/taskflow.png',
        aspect: '1917 / 961',
        alt: 'TaskFlow project management application',
        description:
          'Project management application for task assignments, boards, comments, notifications, and workflow management.',
        tech: ['React', 'TanStack Start', 'Express.js', 'PostgreSQL', 'Prisma'],
        github:
          'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task3',
      },
    ],
  },
};
