import { InferSchemaType, model, Schema } from 'mongoose';

export const userSchema = new Schema({
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

export type IUser = InferSchemaType<typeof userSchema>;

export const User = model('User', userSchema);
