import dbConnect from '@/lib/dbConnect';
import Visitor from '@/models/Visitor';
import ActiveSession from '@/models/ActiveSession';
import { NextResponse } from 'next/server';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // "2026-03-19"
}

export async function POST(req) {
  try {
    await dbConnect();
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 });

    const today = getTodayKey();
    const isNew = !(await ActiveSession.findOne({ sessionId }));

    // Upsert active session — resets the 3-min TTL timer
    await ActiveSession.findOneAndUpdate(
      { sessionId },
      { lastSeen: new Date() },
      { upsert: true }
    );

    // Count active sessions right now
    const currentActive = await ActiveSession.countDocuments();

    // Only increment daily count for truly new sessions
    if (isNew) {
      await Visitor.findOneAndUpdate(
        { date: today },
        {
          $inc: { count: 1 },
          $max: { peakConcurrent: currentActive },
        },
        { upsert: true }
      );
    } else {
      // Still update peak concurrent even for returning sessions
      await Visitor.findOneAndUpdate(
        { date: today },
        { $max: { peakConcurrent: currentActive } },
        { upsert: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Visitor tracking error:', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}