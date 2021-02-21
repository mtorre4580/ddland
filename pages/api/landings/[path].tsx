import { NextApiResponse } from 'next';
import landingRepository from '../../../repository/landing';
import withAuth from '../../../middlewares/auth';

export default withAuth(async (req: any, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { path },
    session,
  } = req;
  const { email } = session.get('user');

  if (method === 'DELETE') {
    const response = await landingRepository.delete(path, email);
    if (response) {
      return res.json(response);
    }
    return res.status(400).json({ msg: 'Invalid' });
  }

  if (method === 'PUT') {
    const errors = landingRepository.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await landingRepository.update(path, email, body);
    if (response) {
      return res.json(response);
    }
    return res.status(400).json({ msg: 'Invalid' });
  }

  return res.status(400).json({ msg: 'Invalid method' });
});
