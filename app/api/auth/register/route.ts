// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const { email, password, name } = body;
  if (!email || !password)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists)
    return NextResponse.json({ error: 'User exists' }, { status: 409 });

  const hashed = await hashPassword(password);
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashed,
    name,
    role: 'admin',
  });

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const res = NextResponse.json(
    { user: { email: user.email, name: user.name }, token },
    { status: 201 },
  );
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}
