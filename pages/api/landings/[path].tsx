import { NextApiRequest, NextApiResponse } from 'next';
import landingService from '../../../services/landing';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { path },
  } = req;

  if (method === 'DELETE') {
    const response = await landingService.delete(path, 'mtorre4580@outlook.com');
    if (response) {
      return res.json(response);
    }
    return res.status(400).json({ msg: 'Invalid' });
  }

  if (method === 'PUT') {
    const errors = landingService.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await landingService.update(path, 'danieltorre@outlook.com', body);
    if (response) {
      return res.json(response);
    }
    return res.status(400).json({ msg: 'Invalid' });
  }

  return res.status(400).json({ msg: 'Invalid method' });
};
