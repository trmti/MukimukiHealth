export type food = {
  // 主な栄養
  カロリー?: number;
  タンパク質?: number;
  脂質?: number;
  炭水化物?: number;
  糖質?: number;
  食物繊維?: number;

  // ミネラル
  ナトリウム?: number;
  食塩相当量?: number;
  カリウム?: number;
  カルシウム?: number;
  マグネシウム?: number;
  リン?: number;
  鉄?: number;
  亜鉛?: number;
  銅?: number;
  マンガン?: number;
  ヨウ素?: number;
  セレン?: number;
  クロム?: number;
  モリブデン?: number;

  // ビタミン
  ビタミンA?: number;
  betaカロテン?: number;
  ビタミンD?: number;
  ビタミンE?: number;
  ビタミンK?: number;
  ビタミンB1?: number;
  ビタミンB2?: number;
  ナイアシン?: number;
  ビタミンB6?: number;
  ビタミンB12?: number;
  葉酸?: number;
  パントテン酸?: number;
  ビオチン?: number;
  ビタミンC?: number;
};

export type foodDetail = {
  名前: string;
  分類: 'メイン' | '副菜' | '汁物' | '主食';
  メイン: 'ご飯' | 'パン' | null;
  URL: string;
  栄養: food;
};

export type detailWithId = {
  id: string;
  detail: foodDetail;
};

export type wannaEat = {
  id: number;
  name: string;
  url: string;
};

export type ideal = {
  id: number;
  name: string;
  url: string;
};
