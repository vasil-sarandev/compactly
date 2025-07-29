import mongoose, { model } from 'mongoose';
import { IUser, userSchema } from '@shared/models/schemas';

const User = model('User', userSchema);

const MOCK_USER: Omit<IUser, '_id'> = {
  email: 'example@example.com',
  name: 'Vasil Sarandev',
};

// the main server (API application) should own this seed
export const seedUsersCollection = async (databaseUri: string) => {
  try {
    const mongooseInstance = await mongoose.connect(databaseUri);

    const usersCount = await User.countDocuments();
    if (usersCount !== 0) {
      // no need to seed, there's a user in the collection
      await mongooseInstance.disconnect();
      console.log('skipping users collection seed.');
      return;
    }

    await User.insertOne(MOCK_USER);
    await mongooseInstance.disconnect();
    console.log('successfully seeded the users collection');
  } catch (e) {
    console.error('an error ocurred while seeding the users collection');
    throw e;
  }
};
