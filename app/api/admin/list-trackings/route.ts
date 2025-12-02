// /api/admin/list-trackings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import Tracking from '@/models/Tracking';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // --- AUTH CHECK ---
    // const authHeader = req.headers.get('authorization');
    // console.log(`authHeader - ${authHeader}`);
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized: Missing token' },
    //     { status: 401 },
    //   );
    // }

    // const token = authHeader.split(' ')[1];
    // const decoded = verifyToken(token);

    // if (!decoded || decoded.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Forbidden: Admin access required' },
    //     { status: 403 },
    //   );
    // }

    // --- GET TRACKINGS ---
    const trackings = await Tracking.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: trackings },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('List-trackings error:', error);
    return NextResponse.json(
      { error: 'Server Error', details: error.message },
      { status: 500 },
    );
  }
}
