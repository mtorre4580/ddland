import { NextApiRequest, NextApiResponse } from 'next';
import userRepository from '../../../repository/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body = {} } = req;

  if (method === 'POST') {
    const errors = userRepository.validate(body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const response = await userRepository.save(body);
    return res.status(201).json(response);
  }

  return res.status(400).json({ msg: 'Invalid method for this resource' });
};
