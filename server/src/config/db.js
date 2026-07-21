import pkg from "pg";
const { Pool } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../drizzle/index.js";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected");
    client.release();
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};