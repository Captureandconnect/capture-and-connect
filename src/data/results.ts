export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  problem: string;
  approach: string;
  result: string;
  stats: { label: string; value: string }[];
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-001',
    client: 'The Dope Doctor',
    category: 'Artist',
    headline: 'From 0 to 20M views in 48 hours',
    problem:
      'The artist had strong music but zero social traction — no viral moment, no algorithm momentum.',
    approach:
      'We identified the right hook format for the track, shot a single high-energy promo clip, and timed the release to peak platform activity.',
    result:
      'The video hit 20 million organic views in 48 hours and became the artist\'s biggest-ever content moment.',
    stats: [
      { label: 'Views', value: '20M+' },
      { label: 'Time to viral', value: '48 hrs' },
      { label: 'New followers', value: '85K+' },
      { label: 'Shares', value: '210K+' },
    ],
    featured: true,
  },
  {
    id: 'case-002',
    client: 'Major Festival',
    category: 'Event',
    headline: 'One festival. 4.7M impressions in a week',
    problem:
      'The festival had a loyal crowd but almost no social reach beyond existing attendees.',
    approach:
      'We deployed a multi-cam crew across the full event, then edited and released a phased content drop — teasers pre-event, live content during, and the aftermovie 24 hours after.',
    result:
      'The aftermovie and surrounding content generated 4.7 million impressions in seven days, doubling the festival\'s follower count.',
    stats: [
      { label: 'Impressions', value: '4.7M' },
      { label: 'Follower growth', value: '2x' },
      { label: 'Saves & shares', value: '94K' },
      { label: 'Aftermovie views', value: '1.2M' },
    ],
    featured: true,
  },
  {
    id: 'case-003',
    client: 'Major Conspiracy',
    category: 'Artist Growth',
    headline: 'DJ goes from 3K to 120K followers in 5 months',
    problem:
      'The DJ had consistent bookings and real talent but an almost invisible online presence.',
    approach:
      'We built a visual identity from scratch, launched a content system of weekly reels and behind-the-scenes stories, and optimized every post for platform reach.',
    result:
      'The account grew from 3,000 to 120,000 followers in five months with no paid advertising.',
    stats: [
      { label: 'Follower growth', value: '40x' },
      { label: 'Time frame', value: '5 months' },
      { label: 'Avg. Reel reach', value: '320K' },
      { label: 'Paid spend', value: '€0' },
    ],
    featured: false,
  },
  {
    id: 'case-004',
    client: 'Hard Dance Store',
    category: 'Brand',
    headline: 'Content-first e-commerce: 320% ROAS from organic hooks',
    problem:
      'Hard Dance Store was spending on ads but losing money — creative was generic and not converting.',
    approach:
      'We scrapped the old ad formats and built a new content system using native-style short-form hooks, community shoutouts, and product drop hype videos.',
    result:
      'ROAS jumped to 320% within the first month of the new content strategy, with organic posts pulling paid-level results.',
    stats: [
      { label: 'ROAS', value: '320%' },
      { label: 'CPM reduction', value: '-58%' },
      { label: 'Organic reach', value: '1.8M' },
      { label: 'Revenue uplift', value: '+210%' },
    ],
    featured: false,
  },
];

export const aggregateStats = [
  { value: '20M+', label: 'Views Generated' },
  { value: '4.7M', label: 'Single Campaign Impressions' },
  { value: '40x', label: 'Best Follower Growth' },
  { value: '320%', label: 'Peak ROAS' },
  { value: '3', label: 'Viral Campaigns' },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);
