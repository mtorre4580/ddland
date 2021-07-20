import { NextApiRequest, NextApiResponse } from 'next';
import mailService from '../../../services/mail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body = {} } = req;
    if (method === 'POST') {
        try {
            await mailService.send(body.email, body.message);
            return res.status(200).json({ msg: `Mensaje enviado` });
        } catch (err) {
            return res.status(500).json({ msg: 'Se produjo un error al enviar el mail' });
        }
    }
    return res.status(400).json({ msg: 'Método inválido para este recurso' });
};
