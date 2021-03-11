import { NextApiResponse } from 'next';
import { NextApiRequestSession } from '../../../middlewares/auth';
import withSession from '../../../middlewares/session';

export default withSession(async (req: NextApiRequestSession, res: NextApiResponse) => {
  await req.session.destroy();
  res.setHeader("cache-control", "no-store, max-age=0");
  res.status(200).json({ isLoggedIn: false });
});
