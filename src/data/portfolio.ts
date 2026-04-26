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
  // ── Content Creation — Events filmed ───────────────────────────────────
  {
    id: 'event-bkjn-partyraiser-2026',
    title: 'BKJN vs Partyraiser 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-majorconspiracy.jpg',
    stats: 'Event 2026',
    description:
      'On-site coverage of BKJN vs Partyraiser 2026. Multi-cam crowd, stage and booth captures cut into recap reels and aftermovie.',
    client: 'BKJN vs Partyraiser',
    featured: true,
  },
  {
    id: 'event-moh-austria-2026',
    title: 'Masters Of Hardcore Austria 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-moh-austria.jpg',
    stats: 'Event 2026',
    description:
      'Full event coverage at Masters Of Hardcore Austria. Stage energy, artist booth shots and high-impact recap edits.',
    client: 'Masters Of Hardcore',
    featured: false,
  },
  {
    id: 'event-reverze-2026',
    title: 'Reverze 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-festival-crowd.jpg',
    stats: 'Event 2026',
    description:
      'On-site filming at Reverze 2026 — capturing the full-arena production design, crowd reactions and headliner sets.',
    client: 'Reverze',
    featured: false,
  },
  {
    id: 'event-moh-2026',
    title: 'Masters Of Hardcore 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-moh-2026.jpg',
    stats: 'Event 2026',
    description:
      'Multi-cam coverage of the flagship Masters Of Hardcore edition. Mainstage recaps, artist clips and behind-the-scenes content.',
    client: 'Masters Of Hardcore',
    featured: true,
  },
  {
    id: 'event-paaspop-2026',
    title: 'Paaspop 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-dopedoctor.jpg',
    stats: 'Event 2026',
    description:
      'Festival coverage at Paaspop 2026 — capturing crowd energy, multi-stage performances and artist moments.',
    client: 'Paaspop',
    featured: false,
  },
  {
    id: 'event-rebirth-2026',
    title: 'Rebirth 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-rave-lights.jpg',
    stats: 'Event 2026',
    description:
      'Filming at Rebirth Festival 2026. Cinematic stage shots, crowd energy, and high-energy recap content.',
    client: 'Rebirth Festival',
    featured: false,
  },

  // ── Content Creation — Artist work ────────────────────────────────────
  {
    id: 'artist-dope-doctor-viral',
    title: 'The Dope Doctor — Viral Promo',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-dopedoctor-viral.jpg',
    video: 'https://www.instagram.com/reel/DKcUyZgog7I/',
    stats: '20M+ views',
    description:
      'Artist promo content for The Dope Doctor that crossed 20 million views organically, no paid boost.',
    client: 'The Dope Doctor',
    featured: true,
  },

];

export const featuredPortfolioItems = portfolioItems.filter((item) => item.featured);
