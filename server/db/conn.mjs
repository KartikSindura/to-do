import { MongoClient } from "mongodb";

const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI);

let conn;
conn = await client.connect();
let db = conn.db("crater");

export default db;
