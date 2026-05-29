import { defineSchema, defineTable } from "convex/server";
import { pokerHandFields } from "./pokerHandValidators";

export default defineSchema({
  pokerHands: defineTable(pokerHandFields).index("by_timestamp", ["timestamp"]),
});
