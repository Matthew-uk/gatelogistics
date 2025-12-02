// app/api/admin/create-order/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tracking from '@/models/Tracking';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    // const token = getTokenFromRequest(request);
    // const user = token ? verifyToken(token) : null;
    // if (!user)
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    // required fields - generate codes if missing
    // numberCode (URL id) we accept from admin form or auto-generate a numeric incremental or random unique number
    const numberCode = body.numberCode || Date.now().toString().slice(-6); // simple approach
    const trackingCode = body.trackingCode || generateAlphanumeric(10);
    const code = trackingCode;

    // ensure uniqueness
    const existingByNumber = await Tracking.findOne({ numberCode });
    if (existingByNumber)
      return NextResponse.json(
        { error: 'numberCode already exists' },
        { status: 409 },
      );

    const payload = {
      code,
      numberCode,
      trackingCode,
      status: body.status || 'PENDING',
      sender: body.sender || {},
      receiver: body.receiver || {},
      parcel: body.parcel || {},
      events: body.events || [],
      additionalInfo: body.additionalInfo || '',
      createdBy: 'Admin',
    };

    const tracked = await Tracking.create(payload);
    return NextResponse.json({ tracking: tracked }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function generateAlphanumeric(len = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // avoid ambiguous characters
  let out = '';
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
