import { v2 } from 'cloudinary';

class ImagesService {
  /**
   * Upload the image to cloudinary service
   * @param file string
   */
  public async upload(file: string) {
    try {
      const eagerOptions = { width: 300, height: 300, format: 'jpg' };
      const { url, secure_url } = await v2.uploader.upload(file, {
        eager: eagerOptions,
        public_id: `home/preview/${file}`,
        overwrite: true,
      });
      return { url, secure_url };
    } catch (err) {
      console.log('Error trying to upload the image to cloudinary', err);
      throw new Error('Error upload image');
    }
  }
}

export default new ImagesService();
