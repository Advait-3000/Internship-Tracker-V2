import dotenv from "dotenv"
dotenv.config()

module.exports = {
  schema: "./src/drizzle/schema/*.js",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};