import { NextApiResponse } from 'next';
import withSession from '../../../middlewares/session';
import userRepository from '../../../repository/user';
import { compare } from '../../../services/hash';

export default withSession(async (req, res: NextApiResponse) => {
  try {
    const { email, password: currentPassword } = req.body;
    const user = await userRepository.get(email);
    if (!user) {
      return res.status(400).json({ msg: 'El email no existe' });
    }
    const isValidHash = await compare(currentPassword, user.password);
    if (isValidHash) {
      const { password, ...userInfo } = user;
      const details = { isLoggedIn: true, ...userInfo };
      req.session.set('user', details);
      await req.session.save();
      return res.status(200).json(details);
    }
    return res.status(403).json({ msg: 'Contraseña errónea' });
  } catch (err) {
    return res.status(500).json({ msg: 'Se produjo un error al autenticarse' });
  }
});
