import { seedUsersCollection } from '@shared/util';
import { MONGOOSE_CONNECTION_STRING } from '@/env-constants';

export const seedDatabase = async () => {
  try {
    // add more seeds here that this application owns if needed
    return Promise.all([seedUsersCollection(MONGOOSE_CONNECTION_STRING)]);
  } catch (e) {
    console.error('failed to seed database');
    throw e;
  }
};
