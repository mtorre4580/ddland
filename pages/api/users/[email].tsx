import { NextApiResponse } from 'next';
import userRepository from '../../../repository/user';
import withAuth from '../../../middlewares/auth';
import { compare, encrypt } from '../../../services/hash';

export default withAuth(async (req, res: NextApiResponse) => {
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

  // if (method === 'DELETE') {
  //   try {
  //     const response = await userRepository.delete(email);
  //     return res.json(response);
  //   } catch (err) {
  //     return res.status(500).json({ msg: 'Se produjo un error al eliminar el usuario' });
  //   }
  // }

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

      const isValidHash = await compare(oldPassword, user.password);

      if (isValidHash) {
        const newHash = await encrypt(newPassword);
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
