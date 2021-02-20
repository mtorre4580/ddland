import { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { email },
  } = req;

  if (method === 'DELETE') {
    const response = await userService.delete(email);
    return res.json(response);
  }

  if (method === 'PUT') {
    const errors = userService.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await userService.update(email, body);
    return res.json(response);
  }

  return res.status(400).json({ msg: 'Invalid method for this resource' });
};
