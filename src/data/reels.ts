export interface Reel {
  id: string;
  account: string;
  caption: string;
  views?: string;
  url: string;
  thumbnail?: string;
}

export const reels: Reel[] = [
  {
    id: '001',
    account: 'thedopedoctor_official',
    caption: 'Monster crowd energy',
    views: '2.1M',
    url: '#',
  },
  {
    id: '002',
    account: 'thedopedoctor_official',
    caption: 'Booth session raw',
    views: '480K',
    url: '#',
  },
  {
    id: '003',
    account: 'majorconspiracyofficial',
    caption: 'New track, full send',
    views: '1.2M',
    url: '#',
  },
  {
    id: '004',
    account: 'majorconspiracyofficial',
    caption: 'Studio after dark',
    views: '—',
    url: '#',
  },
  {
    id: '005',
    account: 'harddancestore',
    caption: 'Drop day vibes',
    views: '620K',
    url: '#',
  },
  {
    id: '006',
    account: 'harddancestore',
    caption: 'Community in the pit',
    views: '—',
    url: '#',
  },
];
