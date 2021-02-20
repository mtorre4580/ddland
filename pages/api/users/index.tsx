import { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body = {} } = req;

  if (method === 'POST') {
    const errors = userService.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await userService.save(body);
    return res.status(201).json(response);
  }

  return res.status(400).json({ msg: 'Invalid method for this resource' });
};
