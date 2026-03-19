import dbConnect from '@/lib/dbConnect';
import Nomination from '@/models/Nomination';
import Visitor from '@/models/Visitor';
import ActiveSession from '@/models/ActiveSession';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    // ── STATS ──────────────────────────────────────────
    if (type === 'stats') {
      const today = new Date().toISOString().slice(0, 10);

      const [totalNominations, todayVisitor, allVisitors, currentActive, awardTypeCounts, genderCounts, recentNominations] = await Promise.all([
        Nomination.countDocuments(),
        Visitor.findOne({ date: today }),
        Visitor.find().sort({ date: 1 }).lean(),
        ActiveSession.countDocuments(),
        Nomination.aggregate([{ $group: { _id: '$awardType', count: { $sum: 1 } } }]),
        Nomination.aggregate([{ $group: { _id: '$gender', count: { $sum: 1 } } }]),
        Nomination.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName awardType createdAt city state').lean(),
      ]);

      const totalVisitors = allVisitors.reduce((sum, v) => sum + (v.count || 0), 0);

      return NextResponse.json({
        totalNominations,
        todayVisitors: todayVisitor?.count || 0,
        totalVisitors,
        currentActive,
        awardTypeCounts,
        genderCounts,
        visitorHistory: allVisitors.map(v => ({ date: v.date, count: v.count, peak: v.peakConcurrent || 0 })),
        recentNominations,
      });
    }

    // ── SEARCH ────────────────────────────────────────
    if (type === 'search') {
      const q = searchParams.get('q')?.trim();
      if (!q) return NextResponse.json({ results: [] });

      const tokens = q.split(/\s+/).filter(Boolean);

      // Build OR conditions for every token across name/email/phone
      const tokenConditions = tokens.map(token => ({
        $or: [
          { firstName: { $regex: token, $options: 'i' } },
          { middleName: { $regex: token, $options: 'i' } },
          { lastName: { $regex: token, $options: 'i' } },
          { emailId: { $regex: token, $options: 'i' } },
          { mobileNumber: { $regex: token, $options: 'i' } },
          { city: { $regex: token, $options: 'i' } },
          { state: { $regex: token, $options: 'i' } },
          { categoryDomain: { $regex: token, $options: 'i' } },
        ]
      }));

      const results = await Nomination.find({ $and: tokenConditions })
        .select('firstName middleName lastName emailId mobileNumber awardType nominationType city state categoryDomain createdAt gender')
        .sort({ createdAt: -1 })
        .limit(30)
        .lean();

      return NextResponse.json({ results });
    }

    // ── NOMINATIONS LIST WITH FILTERS ─────────────────
    if (type === 'nominations') {
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;

      const filter = {};
      const awardType = searchParams.get('awardType');
      const nominationType = searchParams.get('nominationType');
      const gender = searchParams.get('gender');
      const workAffiliationType = searchParams.get('workAffiliationType');
      const impactLevel = searchParams.get('impactLevel');
      const state = searchParams.get('state');
      const country = searchParams.get('country');
      const dateFrom = searchParams.get('dateFrom');
      const dateTo = searchParams.get('dateTo');

      if (awardType) filter.awardType = awardType;
      if (nominationType) filter.nominationType = nominationType;
      if (gender) filter.gender = gender;
      if (workAffiliationType) filter.workAffiliationType = workAffiliationType;
      if (impactLevel) filter.impactLevel = impactLevel;
      if (state) filter.state = { $regex: state, $options: 'i' };
      if (country) filter.country = { $regex: country, $options: 'i' };
      if (dateFrom || dateTo) {
        filter.createdAt = {};
        if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
        if (dateTo) filter.createdAt.$lte = new Date(dateTo + 'T23:59:59Z');
      }

      const [nominations, total] = await Promise.all([
        Nomination.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('firstName middleName lastName emailId mobileNumber awardType nominationType city state categoryDomain fieldOfExcellence gender workAffiliationType impactLevel createdAt')
          .lean(),
        Nomination.countDocuments(filter),
      ]);

      return NextResponse.json({ nominations, total, page, pages: Math.ceil(total / limit) });
    }

    // ── SINGLE NOMINATION ─────────────────────────────
    if (type === 'nomination') {
      const id = searchParams.get('id');
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      const nomination = await Nomination.findById(id).select('-mobileNumber -alternateMobileNumber -emailId -address -nominator.mobile -nominator.email -nominator.address').lean();
      if (!nomination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ nomination });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (e) {
    console.error('Dashboard API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}