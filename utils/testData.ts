import { foods, wannaEat, ideal } from './types';

export const rikishiIdeal: foods = {
  カロリー: 2832,
  タンパク質: 91,
  脂質: 240,
  炭水化物: 63,
  糖質: 46.8,
  食物繊維: 25.2,

  // ミネラル
  ナトリウム: 6888,
  食塩相当量: 18,
  カリウム: 2844,
  カルシウム: 1380,
  マグネシウム: 228,
  リン: 1608,
  鉄: 13,
  亜鉛: 13,
  銅: 0.84,
  マンガン: 1.32,
  ヨウ素: 96,
  セレン: 156,
  クロム: 12,
  モリブデン: 60,

  // ビタミン
  ビタミンA: 1200,
  betaカロテン: 6468,
  ビタミンD: 8,
  ビタミンE: 32,
  ビタミンK: 864,
  ビタミンB1: 1.2,
  ビタミンB2: 2,
  ナイアシン: 32,
  ビタミンB6: 1.2,
  ビタミンB12: 9,
  葉酸: 912,
  パントテン酸: 6,
  ビオチン: 111,
  ビタミンC: 84,
};

export const wannaEats: wannaEat[] = [
  { name: '丼物', url: 'https://i.imgur.com/FzryyS8.png' },
  { name: 'ドリア', url: 'https://i.imgur.com/ZzTo4tE.png' },
  { name: 'ハンバーグ', url: 'https://i.imgur.com/gKBL6ZT.png' },
];

export const ideals: ideal[] = [
  { id: 1, name: '力士', url: 'https://i.imgur.com/Vioy5WK.png' },
  { id: 2, name: 'ガチムチ', url: 'https://i.imgur.com/fbRYP6E.png' },
  { id: 3, name: '普通', url: 'https://i.imgur.com/4BatJ2M.png' },
  { id: 4, name: 'モデル', url: 'https://i.imgur.com/Zx1F9qD.png' },
];
