export interface PublicProof {
  id: string;
  client: string;
  category: string;
  headline: string;
  context: string;
  detail: string;
  proofLabel: string;
  proofValue: string;
  url: string;
  thumbnail: string;
  featured: boolean;
}

// Every entry below points to something publicly visible (a public IG reel,
// YouTube upload, live website or public IG profile). No private client metrics.
export const publicProof: PublicProof[] = [
  {
    id: 'proof-dope-doctor-viral',
    client: 'The Dope Doctor',
    category: 'Artist · Viral Promo',
    headline: 'One promo clip. 20 million views. Zero ad spend.',
    context:
      'Artist promo directed and shipped end-to-end by Capture & Connect.',
    detail:
      'Open the post on Instagram — the play count is right there on the public reel.',
    proofLabel: 'Public reel',
    proofValue: '20M+',
    url: 'https://www.instagram.com/reel/DKcUyZgog7I/',
    thumbnail: 'cover-dopedoctor-viral.jpg',
    featured: true,
  },
  {
    id: 'proof-aftermovie-ground-zero',
    client: 'Ground Zero Festival 2025',
    category: 'Event Film · Aftermovie',
    headline: 'Official 2025 aftermovie shipped on YouTube',
    context:
      'Multicam, edit and color — delivered as the official festival aftermovie.',
    detail:
      'Public YouTube upload on the Ground Zero channel. Open the video to watch the full edit.',
    proofLabel: 'YouTube upload',
    proofValue: 'Live',
    url: 'https://www.youtube.com/watch?v=wMICv0W9h8o',
    thumbnail: 'cover-aftermovie.jpg',
    featured: true,
  },
  {
    id: 'proof-hairmoment-live',
    client: 'Hairmoment',
    category: 'Web Design · Live Site',
    headline: 'Salon site shipped from sketch to live in two weeks.',
    context:
      'Custom build, mobile-first booking flow, new visual identity for a Noordwijk salon.',
    detail:
      'Hairmoment.nl is live. No template. No WordPress. Built to convert.',
    proofLabel: 'Live website',
    proofValue: 'hairmoment.nl',
    url: 'https://hairmoment.nl/',
    thumbnail: 'cover-hairmoment-v4.jpg',
    featured: true,
  },
  {
    id: 'proof-cc-self',
    client: 'Capture & Connect',
    category: 'Web Design · In-House',
    headline: 'This site. Hand-coded.',
    context:
      'No drag-and-drop. No template. The site you are reading was built line by line.',
    detail:
      'Astro plus React, deployed on Cloudflare Pages, custom typography and motion throughout.',
    proofLabel: 'Live website',
    proofValue: 'captureandconnect.nl',
    url: 'https://captureandconnect.nl/',
    thumbnail: 'cover-captureandconnect.jpg',
    featured: false,
  },
];

export const featuredPublicProof = publicProof.filter((p) => p.featured);

// Public, verifiable totals only. Each number can be checked against:
// - public IG reels and profiles
// - public YouTube uploads
// - live websites
export const aggregateStats = [
  { value: '125M+', label: 'Total reach',          note: 'Cumulative organic reach generated across our roster.' },
  { value: '20M+', label: 'Views on one video',   note: 'Single Dope Doctor reel. View count visible on Instagram.' },
  { value: '25+',  label: 'Events filmed 2026',   note: 'Highlights: BKJN, MOH NL, MOH Austria, Reverze, Paaspop, Rebirth.' },
  { value: '9',    label: 'Accounts growing',     note: '6 Instagram, 3 TikTok live right now. Growing every month.' },
  { value: '2',    label: 'Live websites built',  note: 'Hairmoment.nl and this site. Both fully custom, both converting.' },
];
