// lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) throw new Error('JWT_SECRET env required');

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}

export function generateToken(payload: Record<string, any>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// helper to read token from Authorization header cookie etc.
export function getTokenFromRequest(req: NextRequest) {
  // check bearer header first
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.split(' ')[1];
  // maybe cookie: Authorization=Bearer <token>
  const cookie = req.headers.get('cookie');
  if (cookie) {
    // Avoid named capture group for broader compatibility
    const match = cookie.match(/token=([^;]+)/);
    if (match && match[1]) return match[1];
  }
  return null;
}
