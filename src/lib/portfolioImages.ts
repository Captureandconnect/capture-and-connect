import type { ImageMetadata } from 'astro';

const portfolioMap = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png}',
  { eager: true }
);

const reelsMap = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/reels/*.{jpg,jpeg,png}',
  { eager: true }
);

export const portfolioImage = (filename: string): ImageMetadata => {
  const key = `../assets/portfolio/${filename}`;
  const mod = portfolioMap[key];
  if (!mod) throw new Error(`portfolioImage: missing src/assets/portfolio/${filename}`);
  return mod.default;
};

export const reelImage = (filename: string): ImageMetadata => {
  const key = `../assets/reels/${filename}`;
  const mod = reelsMap[key];
  if (!mod) throw new Error(`reelImage: missing src/assets/reels/${filename}`);
  return mod.default;
};
