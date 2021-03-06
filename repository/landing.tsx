import Joi from 'joi';
import ILanding from './models/web/landing';
import ModelMongo from './utils/model';

class LandingService extends ModelMongo {
  constructor() {
    super('webs');
  }

  /**
   * Checker to validate the properties for the current model
   * @param {ILanding} landing
   * @return {string|null}
   */
  public validate(landing: ILanding) {
    const { error } = Joi.object({
      path: Joi.string(),
      title: Joi.string().required(),
      blocks: Joi.array(),
    }).validate(landing);
    if (error) {
      return error.message;
    }
    return null;
  }

  /**
   * Retrieve the current landing by the path
   * @param {string} path
   * @param {string} author
   * @return {Promise}
   */
  public get(path: string | string[]) {
    return this.findOne({ path: this.getPath(path) });
  }

  /**
   * Retrieve all the landings by the user
   * @param {string} author
   * @return {Promise}
   */
  public getAll(author: string) {
    return this.find({ author });
  }

  /**
   * Save the current landing for the user
   * @param {string} author
   * @param {ILanding} landing
   * @return {Promise}
   */
  public save(author: string, landing: ILanding) {
    return this.insertOne({ ...landing, author, path: this.getPath(landing.path) });
  }

  /**
   * Update the current landing by the path and the current user
   * @param  {string} path
   * @param  {string} author
   * @param  {ILanding} landing
   * @return {Promise}
   */
  public update(path: string | string[], author: string, landing: ILanding) {
    return this.findAndUpdateOne({ path: this.getPath(path), author }, landing);
  }

  /**
   * Remove the current landing by the path and the current user
   * @param {string} path
   * @param {string} author
   * @return {Promise}
   */
  public delete(path: string | string[], author: string) {
    return this.deleteOne({ path: this.getPath(path), author });
  }

  /**
   * Retrieve the full path
   * @param {string} path
   * @return {string}
   */
  private getPath(path: string | string[]) {
    return `/${path}`;
  }
}

export default new LandingService();
