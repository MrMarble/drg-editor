/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { UUID } from '../helpers/u8array/uint8array';

export const enum DWARFS {
  DRILLER = 'driller',
  GUNNER = 'gunner',
  SCOUT = 'scout',
  ENGINEER = 'engineer'
}

export const UUIDS: Record<DWARFS, UUID> = {
  [DWARFS.DRILLER]: '9edd56f1eebcc5488d5b5e5b80b62db4',
  [DWARFS.GUNNER]: 'ae56e180fec0c44d96fa29c28366b97b',
  [DWARFS.SCOUT]: '30d8ea17d8fbba4c95306de9655c2f8c',
  [DWARFS.ENGINEER]: '85ef626c65f1024a8dfeb5d0f3909d2e'
};

export const PROMO_RANKS: string[] = [
  'None',
  'Bronze 1',
  'Bronze 2',
  'Bronze 3',
  'Silver 1',
  'Silver 2',
  'Silver 3',
  'Gold 1',
  'Gold 2',
  'Gold 3',
  'Platinum 1',
  'Platinum 2',
  'Platinum 3',
  'Diamond 1',
  'Diamond 2',
  'Diamond 3',
  'Legendary 1',
  'Legendary 2',
  'Legendary 3',
  'Legendary 3+'
];

export const XP_TABLE = [
  0, 3000, 7000, 12_000, 18_000, 25_000, 33_000, 42_000, 52_000, 63_000, 75_000,
  88_000, 102_000, 117_000, 132_500, 148_500, 165_000, 182_000, 199_500,
  217_500, 236_000, 255_000, 274_500, 294_500, 315_000
];

export const PERK_UID = [
  0x50, 0x65, 0x72, 0x6b, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x73
];
