import { NextApiResponse } from 'next';
import userRepository from '../../../repository/user';
import withAuth from '../../../middlewares/auth';

export default withAuth(async (req, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { email },
    session,
  } = req;
  const userLogged = session.get('user');

  if (userLogged.email !== email) {
    res.status(400).json({ msg: 'Invalid email, you are the user?' });
  }

  if (method === 'DELETE') {
    const response = await userRepository.delete(email);
    return res.json(response);
  }

  if (method === 'PUT') {
    const errors = userRepository.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await userRepository.update(email, body);
    return res.json(response);
  }

  return res.status(400).json({ msg: 'Invalid method for this resource' });
});
