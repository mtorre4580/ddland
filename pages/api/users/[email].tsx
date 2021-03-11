import { NextApiResponse } from 'next';
import userRepository from '../../../repository/user';
import withAuth, { NextApiRequestSession } from '../../../middlewares/auth';
import hashService from '../../../services/hash';

export default withAuth(async (req: NextApiRequestSession, res: NextApiResponse) => {
  const {
    method,
    body = {},
    query: { email },
    session,
  } = req;
  const userLogged = session.get('user');

  if (userLogged.email !== email) {
    res.status(400).json({ msg: 'Email inválido, sos el usuario?' });
  }

  if (method === 'PUT') {
    try {
      const { oldPassword = null, newPassword = null } = body;

      if (oldPassword === null || newPassword === null) {
        return res.status(400).json({ msg: 'Campos incompletos' });
      }

      const user = await userRepository.get(email);

      if (!user) {
        return res.status(400).json({ msg: 'El email no existe' });
      }

      const isValidHash = await hashService.compare(oldPassword, user.password);

      if (isValidHash) {
        const newHash = await hashService.encrypt(newPassword);
        await userRepository.update(email, { password: newHash });
        return res.json({ msg: 'Actualización exitosa' });
      }

      return res.status(400).json({ msg: 'La contraseña actual es incorrecta' });
    } catch (err) {
      return res.status(500).json({ msg: 'Se produjo un error al actualizar el usuario' });
    }
  }

  return res.status(400).json({ msg: 'Invalid method for this resource' });
});
