import { generateSlug } from '@packages/shared/lib';
import { ShortenedURL } from '@packages/shared/schemas';
import { shortenedUrlRepository } from '../../repository';

interface ICreateShortenedUrlDisasterScenarioPayload {
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
}: ICreateShortenedUrlDisasterScenarioPayload) => {
  const slug = await recursivelyFindAnAvailableSlug();
  return await shortenedUrlRepository.save({ data: { slug, target_url: targetUrl } });
};
