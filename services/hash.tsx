import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 12;

async function encrypt(text: string) {
  try {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  } catch (err) {
    console.log('err', err);
  }
}

async function compare(text: string, text2: string) {
  try {
    const status = await bcrypt.compare(text, text2);
    return status;
  } catch (err) {
    console.log('err', err);
  }
}

export { compare, encrypt };
