import { MongoClient } from 'mongodb';

export async function db() {
    const MONGO_URI = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URI);
    const db = client.db("rutasTuristicas");
    return db;
}
