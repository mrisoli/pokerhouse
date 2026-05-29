import { describe, expect, test } from "bun:test";
import type { PokerHand } from "./hand";

const sampleHand: PokerHand = {
  game: "NLHE",
  currency: "USD",
  stakes: {
    smallBlind: 0.5,
    bigBlind: 1,
    ante: 0,
  },
  table: {
    maxSeats: 6,
    buttonSeat: 3,
  },
  players: [
    {
      seat: 1,
      name: "Alice",
      stack: 100,
      position: "HJ",
      holeCards: ["Ah", "Kh"],
    },
    { seat: 2, name: "Bob", stack: 100, position: "CO" },
    { seat: 3, name: "Carol", stack: 100, position: "BTN" },
    { seat: 4, name: "Dave", stack: 100, position: "SB" },
    { seat: 5, name: "Eve", stack: 100, position: "BB" },
    { seat: 6, name: "Frank", stack: 100, position: "UTG" },
  ],
  streets: {
    preflop: {
      actions: [
        { player: "Dave", type: "postSmallBlind", amount: 0.5 },
        { player: "Eve", type: "postBigBlind", amount: 1 },
        { player: "Frank", type: "fold" },
        { player: "Alice", type: "raise", amount: 3.5 },
        { player: "Bob", type: "fold" },
        { player: "Carol", type: "call", amount: 3.5 },
        { player: "Dave", type: "fold" },
        { player: "Eve", type: "call", amount: 2.5 },
      ],
    },
    flop: {
      board: ["As", "7d", "2c"],
      actions: [
        { player: "Eve", type: "check" },
        { player: "Alice", type: "bet", amount: 5.5 },
        { player: "Carol", type: "fold" },
        { player: "Eve", type: "call", amount: 5.5 },
      ],
    },
    turn: {
      board: ["Td"],
      actions: [
        { player: "Eve", type: "check" },
        { player: "Alice", type: "bet", amount: 14 },
        { player: "Eve", type: "fold" },
      ],
    },
    river: {
      board: [],
      actions: [],
    },
  },
  result: {
    winner: "Alice",
    amountWon: 22.8,
    rake: 1.2,
  },
  timestamp: 1_717_000_000_000,
};

describe("PokerHand", () => {
  test("models the documented hand-history format", () => {
    expect(sampleHand.game).toBe("NLHE");
    expect(sampleHand.players).toHaveLength(6);
    expect(sampleHand.players[0]?.holeCards).toEqual(["Ah", "Kh"]);
    expect(sampleHand.streets.flop.board).toEqual(["As", "7d", "2c"]);
    expect(sampleHand.result.winner).toBe("Alice");
    expect(sampleHand.timestamp).toBe(1_717_000_000_000);
  });

  test("preflop action sequence is preserved in order", () => {
    const types = sampleHand.streets.preflop.actions.map((a) => a.type);
    expect(types).toEqual([
      "postSmallBlind",
      "postBigBlind",
      "fold",
      "raise",
      "fold",
      "call",
      "fold",
      "call",
    ]);
  });
});
