export interface EventDJ {
  name: string;
  role?: string;           // e.g. "Multicam Recording"
  handle?: string;         // e.g. "thedopedoctor_official"
  postUrl: string;         // direct URL to the public post / reel (IG, TikTok, YouTube)
}

export interface EventCard {
  id: string;
  name: string;
  edition?: string;        // e.g. "Austria 2026"
  /** ISO start date (YYYY-MM-DD). Single source of truth: display + sort order. */
  dateISO: string;
  venue: string;
  cover: string;
  tag: string;
  // Total artists filmed at the event. Use this when the public linked
  // subset in `djs` is smaller than the real count Ryan recorded.
  totalArtists?: number;
  djs: EventDJ[];
}

/**
 * Platform badge derived from the URL, so the label can never drift from the
 * link it sits next to.
 */
export function platformLabel(url: string): string {
  if (/tiktok\.com/i.test(url)) return 'TT';
  if (/youtube\.com|youtu\.be/i.test(url)) return 'YT';
  if (/instagram\.com/i.test(url)) return 'IG';
  return 'Link';
}

/** "10 April 2026" — en-GB, matching the rest of the site's copy. */
export function formatEventDate(dateISO: string): string {
  return new Date(`${dateISO}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Every date below was checked against the organiser's own listing (see the
// source comment per event). Add DJs with a direct public POST/REEL URL.
const eventList: EventCard[] = [
  {
    id: 'rebirth-2026',
    name: 'Rebirth Festival',
    edition: '2026',
    // Verified: rebirth-festival.nl / festivalinfo.nl — 10-12 April 2026,
    // Raamse Akkers, Haaren (not Haaksbergen).
    dateISO: '2026-04-10',
    venue: 'Raamse Akkers, Haaren, NL',
    cover: 'cover-rebirth.jpg',
    tag: 'Festival · Outdoor',
    totalArtists: 7,
    djs: [
      {
        name: 'Revellers LIVE',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DXHn-yRDBBS/',
      },
      {
        name: 'More Kords',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DXE8LPqjDke/',
      },
      {
        name: 'Tharoza LIVE',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DXKEas3CHBG/',
      },
      {
        name: 'The Dope Doctor',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/reel/DXHgcTJiJuc/',
      },
      {
        name: 'Barber vs Partyraiser',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DXKK6BtDRjr/',
      },
      {
        name: 'Spiady',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DXFAasyjIt9/',
      },
    ],
  },
  {
    id: 'bkjn-vs-partyraiser-2026',
    name: 'BKJN vs Partyraiser',
    edition: '2026',
    // Verified: bkjn.nl / djguide.nl — Snowfall edition, Saturday 31 January
    // 2026, Silverdome Zoetermeer.
    dateISO: '2026-01-31',
    venue: 'Silverdome, Zoetermeer',
    cover: 'cover-majorconspiracy.jpg',
    tag: 'Festival · Indoor',
    totalArtists: 7,
    djs: [
      {
        name: 'Soulblast LIVE',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DUQtHjDjMuG/',
      },
      {
        name: 'The Dope Doctor · FINAL X-RAY',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DUQmUXsCLv8/',
      },
      {
        name: 'Revellers vs Screecher',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DUQ1Y4WjATR/',
      },
      {
        name: 'Hardbouncer',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DUQ18QfjG59/',
      },
      {
        name: 'Kroefoe vs Svenergy',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DUQtFnUjG_T/',
      },
    ],
  },
  {
    id: 'masters-of-hardcore-austria-2026',
    name: 'Masters Of Hardcore',
    edition: 'Austria 2026',
    // Verified: mastersofhardcore.at — the Austrian edition runs in February
    // at VAZ St. Pölten, not in July at the Salzburgring.
    dateISO: '2026-02-14',
    venue: 'VAZ St. Pölten, AT',
    cover: 'cover-moh-austria-v2.jpg',
    tag: 'Festival · Indoor',
    totalArtists: 5,
    djs: [
      {
        name: 'Lil Texas',
        role: 'Multicam Recording',
        postUrl: 'https://vm.tiktok.com/ZGdH6fcA5/',
      },
      {
        name: 'Anime',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/reel/DVd4uFzgmzX/',
      },
      {
        name: 'F.Noize',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DU3PnVnCNj0/',
      },
      {
        name: 'Barber vs Unproven',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DU3geW7Ahbx/',
      },
    ],
  },
  {
    id: 'reverze-2026',
    name: 'Reverze',
    edition: '2026',
    // Verified: reverze.be — 27+28 February 2026, Antwerp.
    dateISO: '2026-02-27',
    venue: 'Sportpaleis, Antwerp, BE',
    cover: 'cover-reverze.jpg',
    tag: 'Festival · Belgium',
    totalArtists: 3,
    djs: [
      {
        name: 'Hysta LIVE',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DVV0ASeDbk_/',
      },
      {
        name: 'Dimitri K vs Yoshiko',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DVWQfbADH2V/',
      },
    ],
  },
  {
    id: 'masters-of-hardcore-2026',
    name: 'Masters Of Hardcore',
    edition: 'Netherlands 2026',
    // Verified: festivalfans.nl / guestzone.nl — Tides of Tyranny,
    // Saturday 28 March 2026, Brabanthallen.
    dateISO: '2026-03-28',
    venue: 'Brabanthallen, Den Bosch',
    cover: 'cover-moh-2026.jpg',
    tag: 'Festival · Indoor',
    totalArtists: 5,
    djs: [
      {
        name: 'Furyan vs The Viper',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DWhJ2ucDcpu/',
      },
      {
        name: 'The Dope Doctor',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DWg230xiFNu/',
      },
      {
        name: 'Chaotic Hostility',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DWjWRnHDERl/',
      },
      {
        name: 'F.Noize',
        role: 'Single Camera Recording',
        postUrl: 'https://www.instagram.com/p/DWg-5MniND3/',
      },
    ],
  },
  {
    id: 'paaspop-2026',
    name: 'Paaspop',
    edition: '2026',
    // Verified: paaspop.nl — 3-5 April 2026, De Molenheide, Schijndel.
    dateISO: '2026-04-03',
    venue: 'De Molenheide, Schijndel, NL',
    cover: 'cover-paaspop.jpg',
    tag: 'Festival · Outdoor',
    djs: [
      {
        name: 'EZG LIVE',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DW1kEkqjHT9/',
      },
      {
        name: 'Gezellige Uptempo',
        role: 'Multicam Recording',
        postUrl: 'https://www.instagram.com/p/DWy4kjIjHOc/',
      },
    ],
  },
];

/** Newest first — the archive header reads "2026 Highlights". */
export const events: EventCard[] = [...eventList].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);
