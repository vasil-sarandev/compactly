import { ShortenedURL } from '@shared/models/schemas';
import { generateSlug } from '@shared/util';

export const recursivelyFindAnAvailableSlug = async (): Promise<string> => {
  let generatedSlug = generateSlug();
  while (true) {
    const match = await ShortenedURL.findOne({ slug: generatedSlug }).lean();
    if (match) {
      generatedSlug = generateSlug();
    } else {
      break;
    }
  }
  return generatedSlug;
};
