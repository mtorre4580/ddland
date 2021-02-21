import { NextApiResponse } from 'next';
import { Handler } from 'next-iron-session';
import withSession from './session';

/**
 * Middleware to handle protected routes
 * @param handler
 */
export default function withAuth(handler: Handler) {
  return withSession((req: any, res: NextApiResponse) => {
    const user = req.session && req.session.get('user');
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    return handler(req, res);
  });
}
