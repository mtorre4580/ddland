import { NextApiRequest, NextApiResponse } from 'next';
import { Handler, Session } from 'next-iron-session';
import withSession from './session';

export interface NextApiRequestSession extends NextApiRequest {
  session: Session;
}

/**
 * Middleware to handle protected routes
 * @param {Handler} handler
 * @return {Promise}
 */
export default function withAuth(handler: Handler) {
  return withSession((req: NextApiRequestSession, res: NextApiResponse): Promise<Handler> | void => {
    const user = req.session && req.session.get('user');
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    return handler(req, res);
  });
}
