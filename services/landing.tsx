import { Db } from 'mongodb';
import ILanding from '../models/web/landing';
import { connectToDatabase } from './mongodb';

class LandingService {
  private collection: string = 'webs';

  /**
   * Retrieve all the landings created by the User
   * @param author
   * @return Promise
   */
  public async getLandings(author: string) {
    const db: Db = await this.connect();
    try {
      const landings = await db
        .collection(this.collection)
        .find({ author })
        .toArray();
      return landings;
    } catch (err) {
      this.handleException(
        err,
        'getLandings',
        'Error when trying to find all landings by the user'
      );
    }
  }

  /**
   * Retrieve the landing by the current path or the id
   * @param path
   * @param _id
   * @return Promise
   */
  public async getLanding(path: string | string[]) {
    const db: Db = await this.connect();
    try {
      const landing = await db
        .collection(this.collection)
        .findOne({ path: this.getPath(path) });
      return landing;
    } catch (err) {
      this.handleException(
        err,
        'getLanding',
        'Error when trying to find the current landing by the path | _id'
      );
    }
  }

  /**
   * Save the current landing created by the User
   * @param author
   * @param landing
   * @return Promise
   */
  public async saveLanding(author: string, landing: ILanding) {
    const db: Db = await this.connect();
    try {
      const { insertedId } = await db.collection(this.collection).insertOne({
        ...landing,
        path: this.getPath(landing.path),
        author,
        created_at: new Date(),
        updated_at: null,
      });
      return insertedId;
    } catch (err) {
      this.handleException(
        err,
        'saveLanding',
        'Error when trying to save the current landing'
      );
    }
  }

  /**
   * Update the current blocks for the landing by the path
   * @param path
   * @param landing
   */
  public async updateLanding(
    path: string | string[],
    landing: ILanding,
    author: string
  ) {
    const db: Db = await this.connect();
    try {
      const landingNew = { ...landing, updated_at: new Date() };
      const { ok, value } = await db
        .collection(this.collection)
        .findOneAndUpdate(
          { path: this.getPath(path), author },
          { $set: landingNew }
        );
      if (ok === 1) {
        return { ...value, ...landingNew };
      }
      return null;
    } catch (err) {
      this.handleException(
        err,
        'updateLanding',
        'Error when trying to update the current landing'
      );
    }
  }

  /**
   * Delete the current landing by the path and the current author
   * @param path
   * @param author
   */
  public async deleteLanding(path: string | string[], author: string) {
    const db: Db = await this.connect();
    try {
      const { deletedCount } = await db
        .collection(this.collection)
        .deleteOne({ path: this.getPath(path), author });
      if (deletedCount === 1) {
        return { msg: 'Success' };
      }
      return null;
    } catch (err) {
      this.handleException(
        err,
        'deleteLanding',
        'Error when trying to delete the landing'
      );
    }
  }

  /**
   * Handle the current connection from mongoDB
   * @return Db
   * @throws Error
   */
  private async connect(): Promise<Db> {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (isConnected) {
      return db;
    }
    throw new Error('Unexpected error with database');
  }

  /**
   * Retrieve the format path
   * @param path
   * @return string
   */
  private getPath(path: string | string[]): string {
    return `/${path}`;
  }

  private handleException(
    exception: Error,
    _method: string,
    friendlyMessage: string
  ) {
    console.log(exception);
    throw new Error(friendlyMessage);
  }
}

export default new LandingService();
