import { ShortenedURL } from '@shared/models/schemas';
import { generateSlug } from '@shared/util';

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

export const createShortenedUrlDisasterScenario = async (
  payload: ICreateShortenedUrlDisasterScenarioPayload,
) => {
  const { targetUrl } = payload;
  const slug = await recursivelyFindAnAvailableSlug();
  const shortenedUrl = await new ShortenedURL({
    slug,
    target_url: targetUrl,
  }).save();
  return shortenedUrl;
};
