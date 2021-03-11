import { NextApiResponse } from 'next';
import landingRepository from '../../../repository/landing';
import withAuth, { NextApiRequestSession } from '../../../middlewares/auth';

export default withAuth(async (req: NextApiRequestSession, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { path },
    session,
  } = req;
  const { email } = session.get('user');

  if (method === 'DELETE') {
    try {
      const response = await landingRepository.delete(path, email);
      if (response) {
        return res.json(response);
      }
      return res.status(400).json({ msg: 'Invalid' });
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al eliminar la landing' });
    }
  }

  if (method === 'PUT') {
    try {
      const errors = landingRepository.validate(body);
      if (errors) {
        return res.status(400).json(errors);
      }
      const response = await landingRepository.update(path, email, body);
      if (response) {
        return res.json(response);
      }
      return res.status(400).json({ msg: 'Invalid' });
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al actualizar la landing' });
    }
  }

  return res.status(400).json({ msg: 'Método inválido para este recurso' });
});
