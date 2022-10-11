import { UUID } from "../helpers/u8array/uint8array";

export const enum DWARFS {
  DRILLER = "driller",
  GUNNER = "gunner",
  SCOUT = "scout",
  ENGINEER = "engineer",
}

export const UUIDS: Record<DWARFS, UUID> = {
  [DWARFS.DRILLER]: "9edd56f1eebcc5488d5b5e5b80b62db4",
  [DWARFS.GUNNER]: "ae56e180fec0c44d96fa29c28366b97b",
  [DWARFS.SCOUT]: "30d8ea17d8fbba4c95306de9655c2f8c",
  [DWARFS.ENGINEER]: "85ef626c65f1024a8dfeb5d0f3909d2e",
};

export const PROMO_RANKS: Array<string> = [
  "None",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
  "Gold 1",
  "Gold 2",
  "Gold 3",
  "Platinum 1",
  "Platinum 2",
  "Platinum 3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Legendary 1",
  "Legendary 2",
  "Legendary 3",
  "Legendary 3+",
];

export const XP_TABLE = [
  0, 3000, 7000, 12000, 18000, 25000, 33000, 42000, 52000, 63000, 75000, 88000,
  102000, 117000, 132500, 148500, 165000, 182000, 199500, 217500, 236000,
  255000, 274500, 294500, 315000,
];

export const PERK_UID = [
  0x50, 0x65, 0x72, 0x6b, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x73,
];
