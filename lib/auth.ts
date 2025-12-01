// lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Ensure JWT_SECRET is defined and typed correctly
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET env variable is required');
}

const JWT_SECRET: Secret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plain: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function generateToken(payload: Record<string, any>): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Helper to read token from Authorization header or cookie
export function getTokenFromRequest(req: NextRequest): string | null {
  // Check bearer header first
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    return auth.substring(7); // More efficient than split
  }

  // Check cookie
  const cookie = req.headers.get('cookie');
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
