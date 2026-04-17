export interface PortfolioItem {
  id: string;
  title: string;
  category: 'content-creation' | 'social-media';
  thumbnail: string;
  video?: string;
  stats?: string;
  description: string;
  client: string;
  featured: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  // ── Content Creation ──────────────────────────────────────────────────
  {
    id: 'content-001',
    title: 'Festival Aftermovie',
    category: 'content-creation',
    thumbnail: '/images/portfolio/event-mainstage-aftermovie.jpg',
    video: 'https://www.youtube.com/watch?v=wMICv0W9h8o',
    stats: '2.4M views',
    description:
      'Full festival aftermovie captured across multiple stages. High-energy cinematic edit delivered post-event.',
    client: 'Festival Client',
    featured: true,
  },
  {
    id: 'content-002',
    title: 'Club Night Highlights',
    category: 'content-creation',
    thumbnail: '/images/portfolio/event-club-night.jpg',
    video: '/videos/portfolio/event-club-night.mp4',
    stats: '850K reach',
    description:
      'High-energy edit of a sold-out club night, crowd energy, lighting, and booth shots cut to the drop.',
    client: 'Event Promoter',
    featured: false,
  },
  {
    id: 'content-003',
    title: 'Outdoor Stage Recap',
    category: 'content-creation',
    thumbnail: '/images/portfolio/event-outdoor-stage.jpg',
    video: '/videos/portfolio/event-outdoor-stage.mp4',
    stats: '1.1M impressions',
    description:
      'Multi-cam outdoor stage coverage turned into a vertical-first recap reel optimized for TikTok and Instagram.',
    client: 'Outdoor Festival',
    featured: false,
  },
  {
    id: 'content-004',
    title: 'The Dope Doctor, Viral Promo',
    category: 'content-creation',
    thumbnail: '/images/portfolio/artist-the-dope-doctor.jpg',
    video: 'https://www.instagram.com/reel/DKcUyZgog7I/',
    stats: '20M+ views',
    description:
      'Artist promo content for The Dope Doctor that crossed 20 million views organically, no paid boost.',
    client: 'The Dope Doctor',
    featured: true,
  },
  {
    id: 'content-005',
    title: 'Major Conspiracy, Visual Identity',
    category: 'content-creation',
    thumbnail: '/images/portfolio/artist-major-conspiracy.jpg',
    video: '/videos/portfolio/artist-major-conspiracy.mp4',
    stats: '3.2M reach',
    description:
      'Full visual rollout for Major Conspiracy, cover art direction, live edits, and a launch reel series.',
    client: 'Major Conspiracy',
    featured: true,
  },
  {
    id: 'content-006',
    title: 'DJ Profile Series',
    category: 'content-creation',
    thumbnail: '/images/portfolio/artist-dj-profile.jpg',
    video: '/videos/portfolio/artist-dj-profile.mp4',
    stats: '640K views',
    description:
      'Behind-the-scenes documentary-style series following a rising DJ through studio sessions and live sets.',
    client: 'Emerging Artist',
    featured: false,
  },

  // ── Social Media Management ───────────────────────────────────────────
  {
    id: 'social-001',
    title: 'Hard Dance Store, Launch Campaign',
    category: 'social-media',
    thumbnail: '/images/portfolio/brand-hard-dance-store.jpg',
    video: '/videos/portfolio/brand-hard-dance-store.mp4',
    stats: '4.7M impressions',
    description:
      'Full content campaign for Hard Dance Store, product drops, lifestyle content, and community-driven UGC hooks.',
    client: 'Hard Dance Store',
    featured: false,
  },
  {
    id: 'social-002',
    title: 'Merch Brand Launch',
    category: 'social-media',
    thumbnail: '/images/portfolio/brand-merch-launch.jpg',
    video: '/videos/portfolio/brand-merch-launch.mp4',
    stats: '1.8M reach',
    description:
      'Zero-to-launch content strategy for a new artist merch brand, from identity to first viral drop.',
    client: 'Merch Brand',
    featured: false,
  },

];

export const featuredPortfolioItems = portfolioItems.filter((item) => item.featured);
