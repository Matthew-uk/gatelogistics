import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import connectToDatabase from './mongodb';
import User from '../models/User';

export async function getUserFromRequest(req: any) {
  await connectToDatabase();
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return null;
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(payload.sub).lean();
    return user;
  } catch (e) {
    return null;
  }
}
