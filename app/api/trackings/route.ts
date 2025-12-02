import connectDB from '@/lib/mongodb';
import Tracking from '@/models/Tracking';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const trackingNumber = (body?.trackingNumber || '').toString().trim();
    const trackingExists = await Tracking.findOne({
      trackingCode: trackingNumber,
    });
    console.log(trackingExists);

    if (!trackingExists) {
      return NextResponse.json(
        { message: 'Invalid tracking number' },
        { status: 400 },
      );
    }

    // MOCK: in production call your tracking provider or DB here
    // Example: fetch status from courier API
    const mock = {
      status: trackingExists?.status,
      summary: `Click below for more details`,
      code: trackingExists?.numberCode,
      trackingCode: trackingExists?.trackingCode,
    };

    return NextResponse.json(mock);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
