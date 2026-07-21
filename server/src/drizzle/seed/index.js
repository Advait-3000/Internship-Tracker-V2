import "dotenv/config";
import { db } from "../../config/db.js";
import { runSeeds } from "../seed.js";

async function main() {
  try {
    console.log("Starting database seeding...");
    await runSeeds(db);
    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
