import { NextApiResponse } from 'next';
import withSession from '../../../services/session';
import userService from '../../../services/user';

export default withSession(async (req, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    const user = await userService.get(email, password);
    if (user) {
      const details = { isLoggedIn: true, ...user };
      req.session.set('user', details);
      await req.session.save();
      return res.status(200).json(details);
    }
    return res.status(400).json({ msg: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error trying to login' });
  }
});
