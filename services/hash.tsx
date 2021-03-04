import bcrypt from 'bcryptjs';
import LoggerService from './logger';

class HashService {
  private BCRYPT_SALT_ROUNDS = 12;
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService('Services');
  }

  /**
   * Generate the hash for the current text
   * @param text string
   * @return Promise
   */
  public async encrypt(text: string) {
    try {
      const salt = await bcrypt.genSalt(this.BCRYPT_SALT_ROUNDS);
      const hash = await bcrypt.hash(text, salt);
      return hash;
    } catch (err) {
      this.logger.log('Error to trying to generate the hash', err);
      throw new Error('Error generation hash');
    }
  }

  /**
   * Compare between two strings has same hash
   * @param text string
   * @param text2 string
   * @return Promise
   */
  public async compare(text: string, text2: string) {
    try {
      const status = await bcrypt.compare(text, text2);
      return status;
    } catch (err) {
      this.logger.log('Error to trying to compare the hash with the current string', err);
      throw new Error('Error validation hash');
    }
  }
}

export default new HashService();
