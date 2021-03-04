import { v2 } from 'cloudinary';
import LoggerService from './logger';

class ImagesService {
  private regex = /.(gif|jpe?g|bmp|png|webp)$/;
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService('Services');
  }
  
  /**
   * Check if the current format is valid
   * @param name string
   * @return boolean
   */
  public isValid(name: string) {
    return this.regex.test(name);
  }

  /**
   * Upload the image to cloudinary service
   * @param path string
   * @param name string
   * @return Promise
   */
  public async upload(path: string, name: string) {
    try {
      const eagerOptions = { width: 300, height: 300, format: 'jpg' };
      const { url, secure_url } = await v2.uploader.upload(path, {
        eager: eagerOptions,
        public_id: `home/preview/${this.getName(name)}`,
        overwrite: true,
      });
      return { url, secure_url };
    } catch (err) {
      this.logger.log('Error trying to upload the image to cloudinary', err);
      throw new Error('Error upload image');
    }
  }

  /**
   * Retrieve the name of the image without the extension
   * @param path string
   * @return string
   */
  private getName(path: string) {
    const [name] = path.split(this.regex);
    return name;
  }
}

export default new ImagesService();
