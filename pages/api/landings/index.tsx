import { NextApiRequest, NextApiResponse } from 'next';
import landingService from '../../../services/landing';
import validatorService from '../../../services/validator';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    const data = req.body;
    const isBadRequest = validatorService.landing(data);

    if (isBadRequest) {
      return res.status(400).json({ msg: status });
    }

    const response = await landingService.saveLanding(
      'mtorre4580@outlook.com',
      data
    );
    return res.status(201).json(response);
  }

  if (method === 'GET') {
    const { path } = req.query;
    let response = null;
    if (path) {
      response = await landingService.getLanding(path);
    } else {
      response = await landingService.getLandings('danieltorre@outlook.com');
    }
    return res.status(200).json(response);
  }

  return res.status(400).json({ msg: 'Invalid method' });
};
