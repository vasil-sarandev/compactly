import { SLUG_AVAILABLE_CHARS, SLUG_LENGTH } from './slugs.config';

export const generateSlug = (len = SLUG_LENGTH): string => {
  const randomChars: string[] = [];
  for (let i = 0; i < len; i++) {
    randomChars.push(
      SLUG_AVAILABLE_CHARS[Math.floor(Math.random() * SLUG_AVAILABLE_CHARS.length)] as string,
    );
  }
  return randomChars.join('');
};

export const generateSlugs = (count: number): string[] => {
  const slugs: string[] = [];
  for (let i = 0; i < count; i++) {
    slugs.push(generateSlug());
  }
  return slugs;
};
