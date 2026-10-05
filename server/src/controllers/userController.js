import Profile from '../models/Profile.js';

export async function getProfile(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || req.headers['x-demo-user'];
    if (!userId) return res.json({});
    const profile = await Profile.findOne({ userId }).lean();
    res.json(profile || {});
  } catch (e) {
    next(e);
  }
}

export async function saveProfile(req, res, next) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || req.headers['x-demo-user'];
    if (!userId) return res.status(400).json({ message: 'User ID is required' });
    const copy = { ...req.body, userId };
    delete copy._id;
    const profile = await Profile.findOneAndUpdate({ userId }, copy, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json(profile);
  } catch (e) {
    next(e);
  }
}
