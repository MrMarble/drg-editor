import { XP_TABLE } from '@/constant';

const MAX_LEVEL = 25;

function xpToLevel(xp: number): { level: number; xp: number } {
  for (let index = 0; index < XP_TABLE.length; index++) {
    if (xp < XP_TABLE[index]) {
      return { level: index, xp: xp - XP_TABLE[index - 1] };
    }
  }
  return { level: MAX_LEVEL, xp: 0 };
}

export default xpToLevel;
