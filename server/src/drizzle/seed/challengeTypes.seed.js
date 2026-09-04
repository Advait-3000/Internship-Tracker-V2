import { challengeTypes } from "../schema/challengeTypes.schema.js";

export async function seedChallengeTypes(db) {
  await db.insert(challengeTypes).values([
    {
      challengeName: "Technical"
    },
    {
      challengeName: "Management"
    },
    {
      challengeName: "Communication"
    },
  ]).onConflictDoNothing({ target: challengeTypes.challengeName });
}
