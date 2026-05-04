export interface EventDJ {
  name: string;
  role?: string;           // e.g. "Multicam Recording"
  handle?: string;         // e.g. "thedopedoctor_official"
  instagramPost: string;   // direct URL to the IG post / reel
}

export interface EventCard {
  id: string;
  name: string;
  edition?: string;        // e.g. "Austria 2026"
  date: string;
  venue: string;
  cover: string;
  tag: string;
  // Total artists filmed at the event. Use this when the public IG-linked
  // subset in `djs` is smaller than the real count Ryan recorded.
  totalArtists?: number;
  djs: EventDJ[];
}

// NB: voeg per event de DJ's toe met een directe Instagram POST/REEL URL.
// Format: https://www.instagram.com/p/XXXXX/  of  https://www.instagram.com/reel/XXXXX/
export const events: EventCard[] = [
  {
    id: 'rebirth-2026',
    name: 'Rebirth Festival',
    edition: '2026',
    date: 'April 2026',
    venue: 'Haaksbergen, NL',
    cover: 'cover-rebirth.jpg',
    tag: 'Festival · Outdoor',
    totalArtists: 7,
    djs: [
      {
        name: 'Revellers LIVE',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DXHn-yRDBBS/',
      },
      {
        name: 'More Kords',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DXE8LPqjDke/',
      },
      {
        name: 'Tharoza LIVE',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DXKEas3CHBG/',
      },
      {
        name: 'The Dope Doctor',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/reel/DXHgcTJiJuc/',
      },
      {
        name: 'Barber vs Partyraiser',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DXKK6BtDRjr/',
      },
      {
        name: 'Spiady',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DXFAasyjIt9/',
      },
    ],
  },
  {
    id: 'bkjn-vs-partyraiser-2026',
    name: 'BKJN vs Partyraiser',
    edition: '2026',
    date: 'October 2026',
    venue: 'Brabanthallen, Den Bosch',
    cover: 'cover-majorconspiracy.jpg',
    tag: 'Festival · Indoor',
    totalArtists: 7,
    djs: [
      {
        name: 'Soulblast LIVE',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DUQtHjDjMuG/',
      },
      {
        name: 'The Dope Doctor · FINAL X-RAY',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DUQmUXsCLv8/',
      },
      {
        name: 'Revellers vs Screecher',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DUQ1Y4WjATR/',
      },
      {
        name: 'Hardbouncer',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DUQ18QfjG59/',
      },
      {
        name: 'Kroefoe vs Svenergy',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DUQtFnUjG_T/',
      },
    ],
  },
  {
    id: 'masters-of-hardcore-austria-2026',
    name: 'Masters Of Hardcore',
    edition: 'Austria 2026',
    date: 'July 2026',
    venue: 'Salzburgring, AT',
    cover: 'cover-moh-austria-v2.jpg',
    tag: 'Festival · Outdoor',
    totalArtists: 5,
    djs: [
      {
        name: 'Lil Texas',
        role: 'Multicam Recording',
        instagramPost: 'https://vm.tiktok.com/ZGdH6fcA5/',
      },
      {
        name: 'Anime',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/reel/DVd4uFzgmzX/',
      },
      {
        name: 'F.Noize',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DU3PnVnCNj0/',
      },
      {
        name: 'Barber vs Unproven',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DU3geW7Ahbx/',
      },
    ],
  },
  {
    id: 'reverze-2026',
    name: 'Reverze',
    edition: '2026',
    date: 'February 2026',
    venue: 'Sportpaleis, Antwerpen',
    cover: 'cover-reverze.jpg',
    tag: 'Festival · Belgium',
    totalArtists: 3,
    djs: [
      {
        name: 'Hysta LIVE',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DVV0ASeDbk_/',
      },
      {
        name: 'Dimitri K vs Yoshiko',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DVWQfbADH2V/',
      },
    ],
  },
  {
    id: 'masters-of-hardcore-2026',
    name: 'Masters Of Hardcore',
    edition: 'Netherlands 2026',
    date: 'April 2026',
    venue: 'Brabanthallen, Den Bosch',
    cover: 'cover-moh-2026.jpg',
    tag: 'Festival · Indoor',
    totalArtists: 5,
    djs: [
      {
        name: 'Furyan vs The Viper',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DWhJ2ucDcpu/',
      },
      {
        name: 'The Dope Doctor',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DWg230xiFNu/',
      },
      {
        name: 'Chaotic Hostility',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DWjWRnHDERl/',
      },
      {
        name: 'F.Noize',
        role: 'Single Camera Recording',
        instagramPost: 'https://www.instagram.com/p/DWg-5MniND3/',
      },
    ],
  },
  {
    id: 'paaspop-2026',
    name: 'Paaspop',
    edition: '2026',
    date: 'April 2026',
    venue: 'Schijndel, NL',
    cover: 'cover-paaspop.jpg',
    tag: 'Festival · Outdoor',
    djs: [
      {
        name: 'EZG LIVE',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DW1kEkqjHT9/',
      },
      {
        name: 'Gezellige Uptempo',
        role: 'Multicam Recording',
        instagramPost: 'https://www.instagram.com/p/DWy4kjIjHOc/',
      },
    ],
  },
];
