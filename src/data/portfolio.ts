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
  /** URL for the homepage tile link */
  href?: string;
  /** Whether the href opens in a new tab */
  external?: boolean;
  /** 'photo' = full-bleed crop (default). 'design' = mockup/screenshot cover anchored to top. */
  coverStyle?: 'photo' | 'design';
  /** Display category label shown on homepage tile (overrides derived label) */
  displayCategory?: string;
}

export const portfolioItems: PortfolioItem[] = [
  // ── Homepage featured set (first 6 with featured: true = homepage tiles, in order) ─────

  // 1
  {
    id: 'artist-dope-doctor-viral',
    title: 'The Dope Doctor · Monster Viral',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-dopedoctor-viral.jpg',
    video: 'https://www.instagram.com/reel/DKcUyZgog7I/',
    stats: 'Viral',
    description:
      'Artist promo content for The Dope Doctor that crossed 20 million views organically, no paid boost.',
    client: 'The Dope Doctor',
    featured: true,
    href: 'https://www.instagram.com/reel/DKcUyZgog7I/',
    external: true,
    displayCategory: 'Artist',
  },
  // 2
  {
    id: 'event-rebirth-2026',
    title: 'Rebirth 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-rebirth.jpg',
    stats: '2026',
    description:
      'Filming at Rebirth Festival 2026. Cinematic stage shots, crowd energy, and high-energy recap content.',
    client: 'Rebirth Festival',
    featured: true,
    href: '/portfolio#content-creation',
    external: false,
    displayCategory: 'Event',
  },
  // 3
  {
    id: 'brand-hard-dance-store',
    title: 'Hard Dance Store · Brand Content',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-barber-tee-v2.jpg',
    stats: '320% ROAS',
    description:
      'Brand content strategy and creative production for Hard Dance Store, delivering 320% return on ad spend.',
    client: 'Hard Dance Store',
    featured: true,
    href: 'https://www.instagram.com/harddancestore/',
    external: true,
    displayCategory: 'Brand',
  },
  // 4
  {
    id: 'event-ground-zero-aftermovie-2025',
    title: 'Aftermovie Ground Zero Festival 2025',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-aftermovie.jpg',
    stats: 'Aftermovie',
    description:
      'Full aftermovie production for Ground Zero Festival 2025. Multi-cam edit capturing the complete festival experience.',
    client: 'Ground Zero Festival',
    featured: true,
    href: 'https://www.youtube.com/watch?v=wMICv0W9h8o',
    external: true,
    displayCategory: 'Event Film',
  },
  // 5
  {
    id: 'event-bkjn-partyraiser-2026',
    title: 'BKJN vs Partyraiser 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-majorconspiracy.jpg',
    stats: '2026',
    description:
      'On-site coverage of BKJN vs Partyraiser 2026. Multi-cam crowd, stage and booth captures cut into recap reels and aftermovie.',
    client: 'BKJN vs Partyraiser',
    featured: true,
    href: '/portfolio#content-creation',
    external: false,
    displayCategory: 'Event',
  },
  // 6 — Hairmoment hidden from social-media grid; still shown in Web Design Live Websites section. Re-enable by uncommenting.
  // {
  //   id: 'web-hairmoment-noordwijk',
  //   title: 'Hairmoment · Hair Salon Noordwijk',
  //   category: 'social-media',
  //   thumbnail: '/images/portfolio/cover-hairmoment-v4.jpg',
  //   stats: 'Live',
  //   description:
  //     'Full website design and build for Hairmoment hair salon in Noordwijk. Live on hairmoment.nl.',
  //   client: 'Hairmoment Noordwijk',
  //   featured: true,
  //   href: 'https://hairmoment.nl/',
  //   external: true,
  //   coverStyle: 'design',
  //   displayCategory: 'Web Design',
  // },

  // ── Additional content-creation items (not on homepage) ──────────────────

  {
    id: 'event-moh-austria-2026',
    title: 'Masters Of Hardcore Austria 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-moh-austria-v2.jpg',
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
    thumbnail: '/images/portfolio/cover-reverze.jpg',
    stats: 'Event 2026',
    description:
      'On-site filming at Reverze 2026, capturing the full-arena production design, crowd reactions and headliner sets.',
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
    featured: false,
  },
  {
    id: 'event-paaspop-2026',
    title: 'Paaspop 2026',
    category: 'content-creation',
    thumbnail: '/images/portfolio/cover-paaspop.jpg',
    stats: 'Event 2026',
    description:
      'Festival coverage at Paaspop 2026, capturing crowd energy, multi-stage performances and artist moments.',
    client: 'Paaspop',
    featured: false,
  },
];

export const featuredPortfolioItems = portfolioItems.filter((item) => item.featured);
