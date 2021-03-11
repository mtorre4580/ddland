import Joi from 'joi';
import IUser from './models/user';
import ModelMongo from './utils/model';

class UserService extends ModelMongo {
  constructor() {
    super('users');
  }

  /**
   * Checker to validate the properties for the current model
   * @param {IUser} user
   * @return {string|null}
   */
  public validate(user: IUser): string | null {
    const { error } = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string(),
      avatar: Joi.string(),
    }).validate(user);
    if (error) {
      return error.message;
    }
    return null;
  }

  /**
   * Retrieve the user by the email
   * @param {string} email
   * @return {Promise}
   */
  public async get(email: string | string[]): Promise<IUser> {
    const user = (await this.findOne({ email })) || null;
    if (user) {
      const { _id, ...infoUser } = user;
      return infoUser;
    }
    return user;
  }

  /**
   * Store the user in the collection
   * @param {IUser} user
   * @return {Promise}
   */
  public save(user: IUser): Promise<string | undefined> {
    return this.insertOne(user);
  }

  /**
   * Update the user properties
   * @param {string} email
   * @param {IUser} user
   * @return {Promise}
   */
  public update(email: string | string[], user: IUser): Promise<IUser> {
    return this.findAndUpdateOne({ email }, user);
  }

  /**
   * Delete the user by the email
   * @param {string} email
   * @return {Promise}
   */
  public delete(email: string | string[]): Promise<{ msg: string } | undefined> {
    return this.deleteOne({ email });
  }
}

export default new UserService();
