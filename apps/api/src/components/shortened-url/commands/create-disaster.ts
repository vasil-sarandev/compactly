import { generateSlug } from '@packages/shared/lib';
import { ShortenedURL } from '@packages/shared/schemas';
import { shortenedUrlRepository } from '../shortened-url.repository';

interface CreateShortenedUrlDisasterScenarioPayload {
  targetUrl: string;
}

const recursivelyFindAnAvailableSlug = async (): Promise<string> => {
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

export const createShortenedUrlDisasterScenario = async ({
  targetUrl,
}: CreateShortenedUrlDisasterScenarioPayload) => {
  const slug = await recursivelyFindAnAvailableSlug();
  return await shortenedUrlRepository.save({ data: { slug, target_url: targetUrl } });
};
