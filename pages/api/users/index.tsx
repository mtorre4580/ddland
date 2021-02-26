import { NextApiRequest, NextApiResponse } from 'next';
import userRepository from '../../../repository/user';
import bcrypt from 'bcrypt';

// Cost to generate the hash
const BCRYPT_SALT_ROUNDS = 12;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body = {} } = req;
  if (method === 'POST') {
    try {
      const errors = userRepository.validate(body);
      if (errors) {
        return res.status(400).json({ msg: 'Datos erróneos' });
      }
      const hash = await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS);
      const response = await userRepository.save({ ...body, password: hash });
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al registrarse' });
    }
  }
  return res.status(400).json({ msg: 'Método inválido para este recurso' });
};
