import { NextApiResponse } from 'next';
import { NextApiRequestSession } from '../../../middlewares/auth';
import withSession from '../../../middlewares/session';

export default withSession((req: NextApiRequestSession, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).json({ isLoggedIn: false });
});
