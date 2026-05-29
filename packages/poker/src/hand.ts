/**
 * Type definitions for the PokerHouse hand-history format.
 *
 * A `PokerHand` captures a single dealt hand: the game and stakes, the table
 * layout, every player and their action across each street, and the result.
 */

/** Card rank, e.g. the `A` in `"Ah"`. `T` is the ten. */
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

/** Card suit: hearts, diamonds, clubs, spades. */
export type Suit = "h" | "d" | "c" | "s";

/** A single card in standard notation, e.g. `"Ah"`, `"7d"`, `"Tc"`. */
export type Card = `${Rank}${Suit}`;

/** Poker variant. `NLHE` is No-Limit Hold'em. */
export type Game = "NLHE" | "PLO" | "PLO5" | "LHE" | "PLO8" | "Stud";

/** Seat position relative to the button. */
export type Position =
  | "UTG"
  | "UTG+1"
  | "UTG+2"
  | "LJ"
  | "HJ"
  | "MP"
  | "CO"
  | "BTN"
  | "SB"
  | "BB";

/** Blind, ante, and chip amounts are expressed in the hand's `currency`. */
export interface Stakes {
  /** Forced ante per player; `0` when no ante is in play. */
  ante: number;
  bigBlind: number;
  smallBlind: number;
}

export interface Table {
  /** Seat number holding the dealer button. */
  buttonSeat: number;
  /** Total number of seats at the table (e.g. `6` for 6-max, `9` for full ring). */
  maxSeats: number;
}

export interface Player {
  /** The player's two hole cards, when known (hidden for folded/unseen hands). */
  holeCards?: [Card, Card];
  name: string;
  position: Position;
  /** Seat number, 1-indexed. */
  seat: number;
  /** Starting stack for the hand, in the hand's `currency`. */
  stack: number;
}

/** Action types that do not carry a chip amount. */
export type ActionTypeWithoutAmount = "fold" | "check";

/** Action types that carry a chip amount. */
export type ActionTypeWithAmount =
  | "postSmallBlind"
  | "postBigBlind"
  | "postAnte"
  | "bet"
  | "raise"
  | "call";

export type ActionType = ActionTypeWithoutAmount | ActionTypeWithAmount;

/** An action with no associated amount, e.g. a fold or a check. */
export interface ActionWithoutAmount {
  player: string;
  type: ActionTypeWithoutAmount;
}

/** An action with an associated chip amount, e.g. a bet, raise, or blind post. */
export interface ActionWithAmount {
  amount: number;
  player: string;
  type: ActionTypeWithAmount;
}

/**
 * A single action taken by a player on a street. Discriminated on `type`:
 * `fold`/`check` omit `amount`; all other actions include it.
 */
export type Action = ActionWithoutAmount | ActionWithAmount;

/** The preflop street has no community cards. */
export interface PreflopStreet {
  actions: Action[];
}

/** A postflop street (flop, turn, river) with its newly revealed board cards. */
export interface PostflopStreet {
  actions: Action[];
  /** Community cards revealed on this street (empty if the street wasn't reached). */
  board: Card[];
}

export interface Streets {
  flop: PostflopStreet;
  preflop: PreflopStreet;
  river: PostflopStreet;
  turn: PostflopStreet;
}

export interface Result {
  /** Amount the winner collected, net of `rake`. */
  amountWon: number;
  /** Rake taken by the house. */
  rake: number;
  /** Name of the player who won the pot. */
  winner: string;
}

/** A complete poker hand history in the PokerHouse format. */
export interface PokerHand {
  /** ISO 4217 currency code, e.g. `"USD"`. */
  currency: string;
  game: Game;
  players: Player[];
  result: Result;
  stakes: Stakes;
  streets: Streets;
  table: Table;
  /** When the hand was played, as a Unix epoch timestamp in milliseconds. */
  timestamp: number;
}
