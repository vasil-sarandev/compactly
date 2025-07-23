import { model, Schema } from 'mongoose';

export interface IUser {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const User = model('User', userSchema);
