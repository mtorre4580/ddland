import bcrypt from 'bcryptjs';

// Cost of salt
const BCRYPT_SALT_ROUNDS = 12;

/**
 * Generate the hash for the current text
 * @param text string
 * @return Promise
 */
async function encrypt(text: string) {
  try {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  } catch (err) {
    console.log('err', err);
    throw new Error('Error al generar el hash');
  }
}

/**
 * Compare between two strings has same hash
 * @param text string
 * @param text2 string
 * @return Promise
 */
async function compare(text: string, text2: string) {
  try {
    const status = await bcrypt.compare(text, text2);
    return status;
  } catch (err) {
    console.log('err', err);
    throw new Error('Error al comparar textos');
  }
}

export { compare, encrypt };
