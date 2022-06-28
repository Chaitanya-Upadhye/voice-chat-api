import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.EVENTS_DB_URL;
const dbName = process.env.EVENTS_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true });

(async function setupDb() {
  console.log("Setting up database...");

  async function makeDb() {
    if (!client.isConnected()) {
      await client.connect();
    }

    return client.db(dbName);
  }

  const db = await makeDb();
  await db.createCollection("events");

  console.log("Database setup complete...");
  process.exit();
})();
