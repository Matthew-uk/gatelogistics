// app/api/trackings/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tracking from '@/models/Tracking';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params; // Await params before accessing properties

  const tracking = await Tracking.findOne({ numberCode: id }).lean();
  if (!tracking)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ tracking });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // update status or push events (admin only)
  await connectDB();
  //   const token = getTokenFromRequest(request);
  //   const user = token ? verifyToken(token) : null;
  //   if (!user)
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params; // Await params before accessing properties
  const body = await request.json();

  // allow fields: status, events (push), parcel, sender, receiver
  const update: any = {};
  if (body.status) update.status = body.status;
  if (body.parcel) update.parcel = body.parcel;
  if (body.sender) update.sender = body.sender;
  if (body.receiver) update.receiver = body.receiver;

  // if events provided as object, push; if full array, replace
  if (body.event) {
    // push single event to events array (top)
    update.$push = { events: { $each: [body.event], $position: 0 } };
  } else if (body.events) {
    update.events = body.events;
  }

  const updated = await Tracking.findOneAndUpdate({ numberCode: id }, update, {
    new: true,
  });
  if (!updated)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ tracking: updated });
}
