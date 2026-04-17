export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string; // Simple SVG path data for an inline icon
}

export const services: Service[] = [
  {
    id: 'content-creation',
    title: 'Content Creation',
    description:
      'Cinematic event coverage, festival aftermovies, artist visuals and high-energy edits. We capture the moment and turn it into scroll-stopping content.',
    bullets: [
      'Event videography & aftermovies',
      'Multi-cam live event & festival coverage',
      'Artist promo videos & visual identity',
      'Professional photography on location',
      'Reels, TikToks & short-form edits',
      'Motion graphics & color grading',
    ],
    icon: 'M15 10l4.553-2.277A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4zm-2 7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10z',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description:
      'We run your Instagram, TikTok, and YouTube so you can focus on what you do. Consistent posting, real growth, zero guesswork.',
    bullets: [
      'Instagram, TikTok & YouTube management',
      'Monthly content calendar & scheduling',
      'Community management & engagement',
      'Analytics reporting & performance reviews',
      'Hashtag strategy & SEO optimization',
      'Story, Reel & post sequencing',
    ],
    icon: 'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4zm0 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1z',
  },
  {
    id: 'growth-strategy',
    title: 'Growth Strategy',
    description:
      'Data-backed strategy that turns content into reach. We identify what works, double down on it, and cut everything else.',
    bullets: [
      'Platform-specific growth roadmaps',
      'Viral content format research',
      'Audience targeting & persona mapping',
      'Brand positioning & tone-of-voice',
      'Competitor analysis & benchmarking',
      'Monthly strategy sessions & adjustments',
    ],
    icon: 'M3 17l6-6 4 4 8-8M17 7h4v4',
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description:
      'Custom websites that match your brand identity. Fast, mobile-first and built to convert visitors into clients.',
    bullets: [
      'Custom website design & development',
      'Mobile-first, responsive layouts',
      'SEO optimization & fast load times',
      'Landing pages & campaign microsites',
      'Domain setup & hosting configuration',
      'Delivered ready to go, fully yours',
    ],
    icon: 'M3 3h18a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 18h6m-3-4v4',
  },
];
