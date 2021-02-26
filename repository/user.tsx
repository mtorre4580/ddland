import Joi from 'joi';
import IUser from './models/user';
import ModelMongo from './utils/model';

class UserService extends ModelMongo {
  constructor() {
    super('users');
  }

  /**
   * Checker to validate the properties for the current model
   * @param user IUser
   * @return string | null
   */
  public validate(user: IUser) {
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
   * @param email string
   * @return Promise
   */
  public async get(email: string) {
    const user = (await this.findOne({ email })) || null;
    if (user) {
      const { _id, ...infoUser } = user;
      return infoUser;
    }
    return user;
  }

  /**
   * Store the user in the collection
   * @param user IUser
   * @return Promise
   */
  public save(user: IUser) {
    return this.insertOne(user);
  }

  /**
   * Update the user properties
   * @param email string
   * @param user IUser
   * @return Promise
   */
  public update(email: string | string[], user: IUser) {
    return this.findAndUpdateOne({ email }, user);
  }

  /**
   * Delete the user by the email
   * @param email string
   * @return Promise
   */
  public delete(email: string | string[]) {
    return this.deleteOne({ email });
  }
}

export default new UserService();
