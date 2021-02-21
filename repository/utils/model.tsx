import { Db } from 'mongodb';
import { connectToDatabase } from './mongodb';

class Model {
  protected collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  /**
   * Wrapper for insertOne
   * @param model object
   * @return Promise
   */
  protected async insertOne(model: any) {
    const db: Db = await this.connect();
    try {
      const { insertedId } = await db
        .collection(this.collection)
        .insertOne({ ...model, created_at: new Date(), updated_at: null });
      return insertedId;
    } catch (err) {
      this.handleException(err, `Error when save the model for ${this.collection}`);
    }
  }

  /**
   * Wrapper for find and update the current model
   * @param query object
   * @param model object
   * @return Promise
   */
  protected async findAndUpdateOne(query: object, model: any) {
    const db: Db = await this.connect();
    try {
      const modelToUpdate = { ...model, updated_at: new Date() };
      const { ok, value } = await db.collection(this.collection).findOneAndUpdate(query, { $set: modelToUpdate });
      if (ok === 1) {
        return { ...value, ...modelToUpdate };
      }
      throw new Error('Error to update the model');
    } catch (err) {
      this.handleException(err, 'Error when trying to update the current model');
    }
  }

  /**
   * Wrapper to delete one item by query
   * @param query object
   * @return Promise
   */
  protected async deleteOne(query: object) {
    const db: Db = await this.connect();
    try {
      const { deletedCount } = await db.collection(this.collection).deleteOne(query);
      if (deletedCount === 1) {
        return { msg: 'Success' };
      }
      throw new Error('Error the model not exists');
    } catch (err) {
      this.handleException(err, 'Error when trying to delete the current model');
    }
  }

  /**
   * Wrapper to findOne any model via query
   * @param query object
   * @return Promise
   */
  protected async findOne(query: object) {
    const db: Db = await this.connect();
    try {
      const model = await db.collection(this.collection).findOne(query);
      return model;
    } catch (err) {
      this.handleException(err, 'Error when trying to find the current model');
    }
  }

  /**
   * Wrapper to find model via query object
   * @param query object
   * @return Promise
   */
  protected async find(query: object) {
    const db: Db = await this.connect();
    try {
      const models = await db.collection(this.collection).find(query).toArray();
      return models;
    } catch (err) {
      this.handleException(err, 'Error when trying to find all the models');
    }
  }

  /**
   * Handler connection for mongoDB with the current DB
   * @return Promise
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
   * Handler the error for mongoDB connections and querys
   * @param exception Error
   * @param friendlyMessage string
   */
  private handleException(exception: Error, friendlyMessage: string) {
    console.log(exception);
    throw new Error(friendlyMessage);
  }
}

export default Model;
