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
      'The artist had strong music but zero social traction, no viral moment, no algorithm momentum.',
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
    client: 'Major Conspiracy',
    category: 'Artist Growth',
    headline: 'Uptempo duo goes from 3K to 120K followers in 5 months',
    problem:
      'The duo had consistent bookings and real talent but an almost invisible online presence.',
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
    featured: true,
  },
  {
    id: 'case-003',
    client: 'Hard Dance Store',
    category: 'Brand',
    headline: 'From generic ads to a content-first brand engine',
    problem:
      'Hard Dance Store was running paid ads with generic creative that wasn’t converting their target audience.',
    approach:
      'We scrapped the old ad formats and built a new content system using native-style short-form hooks, community shoutouts, and product drop hype videos.',
    result:
      'Organic posts started pulling paid-level results within the first month, and the brand’s reach more than tripled across Instagram and TikTok.',
    stats: [
      { label: 'Organic reach', value: '1.8M' },
      { label: 'Revenue uplift', value: '+210%' },
      { label: 'Avg. engagement', value: '+185%' },
      { label: 'Posting cadence', value: '4x / week' },
    ],
    featured: false,
  },
];

export const aggregateStats = [
  { value: '65M+', label: 'Views' },
  { value: '500+', label: 'Projects' },
  { value: '2x', label: 'Average Growth in Reach' },
  { value: '150+', label: 'Happy Clients' },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);
