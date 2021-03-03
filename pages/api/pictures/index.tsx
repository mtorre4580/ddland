import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import imageService from '../../../services/images';
// import withAuth from '../../../middlewares/auth';

/**
 * Handler to retrieve the current data via formData (image field)
 * @param req NextApiRequest
 */
const handleForm = async (req: NextApiRequest): Promise<any> => {
  const form = new IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, _, files) => {
      if (err) {
        reject('Error obteniendo los datos');
      }
      const { image } = files;
      if (!image) {
        reject('No existe el campo imagen');
      }
      resolve(image);
    });
  });
};

export default /*withAuth(*/ async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === 'POST') {
    try {
      const { path, name } = await handleForm(req);
      if (imageService.isValid(name)) {
        const response = await imageService.upload(path, name);
        return res.json(response);
      }
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
  return res.status(400).json({ msg: 'Método inválido para este recurso' });
} /*)*/;

export const config = {
  api: {
    bodyParser: false,
  },
};
