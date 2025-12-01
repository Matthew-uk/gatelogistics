// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      console.log('User not found!');
      console.log(email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const ok = await comparePassword(password, (user as any).password);
    if (!ok) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: (user as any)._id,
      email: user.email,
      role: user.role,
    });

    // send token as JSON and set cookie if you want
    const res = NextResponse.json({
      token,
      user: { email: user.email, name: user.name },
    });
    // set cookie (optional)
    // res.cookies.set('token', token, {
    //   httpOnly: true,
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7,
    //   sameSite: 'lax',
    //   secure: process.env.NODE_ENV === 'production',
    // });
    res.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; Max-Age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax; Secure`,
    );
    // localStorage.setItem('token', token);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
