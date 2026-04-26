export interface Reel {
  id: string;
  account: string;
  caption: string;
  views?: string;
  url: string;
  thumbnail?: string;
  video?: string;
}

export const reels: Reel[] = [
  {
    id: '001',
    account: 'thedopedoctor_official',
    caption: 'Reel · TBD',
    url: '#',
    video: '/videos/reels/reel-01.mp4',
    thumbnail: '/images/reels/reel-01.jpg',
  },
  {
    id: '002',
    account: 'harddancestore',
    caption: 'Bomberjacket drop',
    url: '#',
    video: '/videos/reels/reel-02.mp4',
    thumbnail: '/images/reels/reel-02.jpg',
  },
  {
    id: '003',
    account: 'thedopedoctor_official',
    caption: 'Booth session raw',
    views: '480K',
    url: '#',
  },
  {
    id: '004',
    account: 'majorconspiracyofficial',
    caption: 'New track, full send',
    views: '1.2M',
    url: '#',
  },
  {
    id: '005',
    account: 'majorconspiracyofficial',
    caption: 'Studio after dark',
    url: '#',
  },
  {
    id: '006',
    account: 'harddancestore',
    caption: 'Community in the pit',
    url: '#',
  },
];
