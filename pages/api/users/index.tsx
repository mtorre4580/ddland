import { NextApiRequest, NextApiResponse } from 'next';
import userRepository from '../../../repository/user';
import { encrypt } from '../../../services/hash';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body = {} } = req;
  if (method === 'POST') {
    try {
      const errors = userRepository.validate(body);
      if (errors) {
        return res.status(400).json({ msg: 'Datos erróneos' });
      }

      const user = await userRepository.get(body.email);
      if (user) {
        return res.status(400).json({ msg: 'El email ya existe' });
      }
      const hash = await encrypt(body.password);
      const response = await userRepository.save({ ...body, password: hash });
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al registrarse' });
    }
  }
  return res.status(400).json({ msg: 'Método inválido para este recurso' });
};
