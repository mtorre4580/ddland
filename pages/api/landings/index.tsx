import { NextApiResponse } from 'next';
import landingService from '../../../services/landing';

export default async (req: any, res: NextApiResponse) => {
  const { method, body = {} } = req;
  if (method === 'GET') {
    const { path } = req.query;
    let response = null;
    if (path) {
      response = await landingService.get(path, 'mtorre4580@outlook.com');
    } else {
      response = await landingService.getAll('mtorre4580@outlook.com');
    }
    return res.json(response);
  }

  if (method === 'POST') {
    const errors = landingService.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await landingService.save('mtorre4580@outlook.com', body);
    return res.status(201).json(response);
  }

  return res.status(400).json({ msg: 'Invalid method' });
};
