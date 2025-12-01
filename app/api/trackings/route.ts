import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const trackingNumber = (body?.trackingNumber || '').toString().trim();

    if (!trackingNumber || trackingNumber.length < 3) {
      return NextResponse.json(
        { message: 'Invalid tracking number' },
        { status: 400 },
      );
    }

    // MOCK: in production call your tracking provider or DB here
    // Example: fetch status from courier API
    const mock = {
      status: 'In Transit',
      summary: `Package ${trackingNumber} departed from origin hub and is en route to destination.`,
    };

    return NextResponse.json(mock);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
