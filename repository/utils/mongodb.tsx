import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

const globalAny: any = global;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cached = globalAny.mongo;

if (!cached) {
  cached = globalAny.mongo = { conn: null, promise: null };
}

/**
 * Handle the connection by mongoDB
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI as string, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}
