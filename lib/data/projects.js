// Mission Select data. Content is authoritative (from resume / brief).
// Do NOT invent metrics, outcomes, extra tech, or statistics.
// `features` items are lifted verbatim from each project's own description.
// `src` points at the real screenshot in public/images/projects/<dir>/;
// `aspect` is the image's native width / height so it is never cropped.

export const projectsIntro = {
  eyebrow: 'Mission Archive',
  heading: 'Projects that turn ideas into systems.',
  supporting:
    'Selected work across AI systems, computer vision, full-stack development, and intelligent software applications. Select a mission to open its briefing.',
};

const CODEALPHA_CONTEXT =
  'Developed during my CodeAlpha Full-Stack Development Internship.';
const CODEALPHA_STACK = ['React', 'TanStack Start', 'Express.js', 'PostgreSQL', 'Prisma'];

export const missions = [
  {
    id: 'virtual-campus',
    index: '01',
    featured: true,
    shortTitle: 'Virtual Campus',
    title: 'AI Agent-Based Virtual Campus Tour and Query Assistant',
    classLabel: 'AI Agent System',
    category: 'AI / RAG / Multi-Agent System / Full-Stack',
    status: 'Completed',
    objective:
      'An AI-powered campus query and virtual tour system designed to provide grounded campus information, interactive navigation, and voice-assisted guidance.',
    approach: [
      'Supervisor-led multi-agent architecture',
      'Retrieval-Augmented Generation (RAG)',
      'Interactive campus navigation',
    ],
    features: ['Grounded campus information', 'Interactive navigation', 'Voice-assisted guidance'],
    agents: ['Admissions', 'Academics', 'Facilities', 'Navigation'],
    tech: ['SentenceTransformers', 'ChromaDB', 'BM25', 'SVM Reranking', 'PostgreSQL', 'PostGIS'],
    // Skills this mission demonstrates beyond its tech list (from `approach`).
    skills: ['RAG', 'AI Agents'],
    images: [
      {
        src: '/images/projects/virtual-campus/virtual-campus.png',
        aspect: '1901 / 860',
        label: 'Interface',
        alt: 'AI Virtual Campus Tour and Query Assistant interface',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/harsha282004/GAT-AI-Virtual-Campus', kind: 'github' },
      { label: 'Live Demo', href: 'https://gat-ai-virtual-campus.vercel.app/', kind: 'demo' },
    ],
  },
  {
    id: 'satellite-change-detection',
    index: '02',
    shortTitle: 'Satellite Change Detection',
    title: 'Deep Learning-Based Multi-Temporal Satellite Image Change Detection System',
    classLabel: 'Computer Vision',
    category: 'Computer Vision / Deep Learning / Satellite Imagery',
    status: 'Completed',
    objective:
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
    // Rendered as a Before -> Change -> After sequence.
    sequence: true,
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
  {
    id: 'shopsphere',
    index: '03',
    group: 'CodeAlpha',
    shortTitle: 'ShopSphere',
    title: 'ShopSphere',
    classLabel: 'Full-Stack System',
    category: 'Full-Stack Development / E-commerce',
    status: 'Completed',
    objective:
      'E-commerce application with product browsing, cart, checkout, authentication, and admin functionality.',
    context: CODEALPHA_CONTEXT,
    features: ['Product browsing', 'Cart', 'Checkout', 'Authentication', 'Admin functionality'],
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
    images: [
      {
        src: '/images/projects/shopsphere/shopsphere.png',
        aspect: '1917 / 863',
        label: 'ShopSphere',
        alt: 'ShopSphere e-commerce application',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task1',
        kind: 'github',
      },
    ],
  },
  {
    id: 'connectly',
    index: '04',
    group: 'CodeAlpha',
    shortTitle: 'Connectly',
    title: 'Connectly',
    classLabel: 'Full-Stack System',
    category: 'Full-Stack Development / Social Platform',
    status: 'Completed',
    objective:
      'Social platform featuring profiles, posts, likes, comments, follows, feeds, explore, and search functionality.',
    context: CODEALPHA_CONTEXT,
    features: ['Profiles', 'Posts', 'Likes', 'Comments', 'Follows', 'Feeds', 'Explore', 'Search'],
    tech: CODEALPHA_STACK,
    images: [
      {
        src: '/images/projects/connectly/connectly.png',
        aspect: '1917 / 845',
        label: 'Connectly',
        alt: 'Connectly social platform',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task2',
        kind: 'github',
      },
    ],
  },
  {
    id: 'taskflow',
    index: '05',
    group: 'CodeAlpha',
    shortTitle: 'TaskFlow',
    title: 'TaskFlow',
    classLabel: 'Full-Stack System',
    category: 'Full-Stack Development / Project Management',
    status: 'Completed',
    objective:
      'Project management application for task assignments, boards, comments, notifications, and workflow management.',
    context: CODEALPHA_CONTEXT,
    features: ['Task assignments', 'Boards', 'Comments', 'Notifications', 'Workflow management'],
    tech: CODEALPHA_STACK,
    images: [
      {
        src: '/images/projects/taskflow/taskflow.png',
        aspect: '1917 / 961',
        label: 'TaskFlow',
        alt: 'TaskFlow project management application',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/harsha282004/CodeAlpha_FullStack_Internship/tree/main/Task3',
        kind: 'github',
      },
    ],
  },
];
