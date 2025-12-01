// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  email: string;
  password: string; // hashed
  name?: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>('User', userSchema);
export default User;
