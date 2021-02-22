import { NextApiResponse } from 'next';
import landingRepository from '../../../repository/landing';
import withAuth from '../../../middlewares/auth';

export default withAuth(async (req: any, res: NextApiResponse) => {
  const { method, body = {}, session } = req;
  const { email } = session.get('user');

  if (method === 'GET') {
    const { path } = req.query;
    let response = null;
    if (path) {
      response = await landingRepository.get(path);
    } else {
      response = await landingRepository.getAll(email);
    }
    return res.json(response);
  }

  if (method === 'POST') {
    const errors = landingRepository.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await landingRepository.save(email, body);
    return res.status(201).json(response);
  }

  return res.status(400).json({ msg: 'Invalid method' });
});
