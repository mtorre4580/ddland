import { NextApiResponse } from 'next';
import puppeterService from '../../../services/pupetter';
import imagesService from '../../../services/images';

export default async function screenShot(req: any, res: NextApiResponse) {
  try {
    const { name } = req.query;
    await puppeterService.takePicture(name);
    const response = await imagesService.upload(`${name}.jpg`);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
}
