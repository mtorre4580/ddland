import { NextApiResponse } from 'next';
import landingRepository from '../../../repository/landing';
import withAuth from '../../../middlewares/auth';

export default withAuth(async (req, res: NextApiResponse) => {
  const { method, body = {}, session } = req;
  const { email } = session.get('user');

  if (method === 'GET') {
    try {
      const { path } = req.query;
      let response = null;
      if (path) {
        response = await landingRepository.get(path);
      } else {
        response = await landingRepository.getAll(email);
      }
      if (response === null) {
        return res.status(404).json({ msg: 'Not exists' });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al obtener la landing' });
    }
  }

  if (method === 'POST') {
    try {
      const errors = landingRepository.validate(body);
      if (errors) {
        return res.status(400).json(errors);
      }
      const response = await landingRepository.save(email, body);
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al crear la landing' });
    }
  }

  return res.status(400).json({ msg: 'Método inválido para este recurso' });
});
