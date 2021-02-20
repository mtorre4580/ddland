import { NextApiResponse } from 'next';
import withSession from '../../../services/session';

export default withSession((req, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).json({ isLoggedIn: false });
});
