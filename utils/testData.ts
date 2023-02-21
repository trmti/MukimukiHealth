import { food, wannaEat, ideal, food_tanni } from './types';

export const rikishiIdeal: food = {
  カロリー: 2832,
  タンパク質: 91,
  脂質: 240,
  炭水化物: 63,
  糖質: 46.8,
};

export const food_unit: food_tanni = {
  カロリー: 'kcal',
  タンパク質: 'g',
  脂質: 'g',
  炭水化物: 'g',
  糖質: 'g',
};

export const wannaEats: wannaEat[] = [
  { id: 1, name: '丼物', url: 'https://i.imgur.com/FzryyS8.png' },
  { id: 2, name: 'ドリア', url: 'https://i.imgur.com/ZzTo4tE.png' },
  { id: 3, name: 'ハンバーグ', url: 'https://i.imgur.com/gKBL6ZT.png' },
];

export const ideals: ideal[] = [
  { id: 1, name: '力士', url: 'https://i.imgur.com/Vioy5WK.png' },
  { id: 2, name: 'ガチムチ', url: 'https://i.imgur.com/fbRYP6E.png' },
  { id: 3, name: '普通', url: 'https://i.imgur.com/4BatJ2M.png' },
  { id: 4, name: 'モデル', url: 'https://i.imgur.com/Zx1F9qD.png' },
];
