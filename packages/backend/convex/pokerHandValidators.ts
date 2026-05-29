import { v } from "convex/values";

/**
 * Convex validators mirroring the `PokerHand` shape from `@pokerhouse/poker`.
 *
 * Card and currency strings are validated as plain strings here: Convex has no
 * template-literal validator, and the precise `Card`/currency typing lives in
 * the `@pokerhouse/poker` package consumed on the client.
 */

const stakesValidator = v.object({
  ante: v.number(),
  bigBlind: v.number(),
  smallBlind: v.number(),
});

const tableValidator = v.object({
  buttonSeat: v.number(),
  maxSeats: v.number(),
});

const positionValidator = v.union(
  v.literal("UTG"),
  v.literal("UTG+1"),
  v.literal("UTG+2"),
  v.literal("LJ"),
  v.literal("HJ"),
  v.literal("MP"),
  v.literal("CO"),
  v.literal("BTN"),
  v.literal("SB"),
  v.literal("BB")
);

const playerValidator = v.object({
  holeCards: v.optional(v.array(v.string())),
  name: v.string(),
  position: positionValidator,
  seat: v.number(),
  stack: v.number(),
});

const actionValidator = v.union(
  v.object({
    player: v.string(),
    type: v.union(v.literal("fold"), v.literal("check")),
  }),
  v.object({
    amount: v.number(),
    player: v.string(),
    type: v.union(
      v.literal("postSmallBlind"),
      v.literal("postBigBlind"),
      v.literal("postAnte"),
      v.literal("bet"),
      v.literal("raise"),
      v.literal("call")
    ),
  })
);

const preflopValidator = v.object({
  actions: v.array(actionValidator),
});

const postflopValidator = v.object({
  actions: v.array(actionValidator),
  board: v.array(v.string()),
});

const streetsValidator = v.object({
  flop: postflopValidator,
  preflop: preflopValidator,
  river: postflopValidator,
  turn: postflopValidator,
});

const resultValidator = v.object({
  amountWon: v.number(),
  rake: v.number(),
  winner: v.string(),
});

const gameValidator = v.union(
  v.literal("NLHE"),
  v.literal("PLO"),
  v.literal("PLO5"),
  v.literal("LHE"),
  v.literal("PLO8"),
  v.literal("Stud")
);

/** Field validators for a poker hand, spread into the `pokerHands` table. */
export const pokerHandFields = {
  currency: v.string(),
  game: gameValidator,
  players: v.array(playerValidator),
  result: resultValidator,
  stakes: stakesValidator,
  streets: streetsValidator,
  table: tableValidator,
  /** When the hand was played, as a Unix epoch timestamp in milliseconds. */
  timestamp: v.number(),
};

/** Validator for a complete poker hand payload. */
export const pokerHandValidator = v.object(pokerHandFields);
