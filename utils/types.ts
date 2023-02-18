import firestore from "firebase/firestore";

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

export type food_tanni = {
  // 主な栄養
  カロリー?: string;
  タンパク質?: string;
  脂質?: string;
  炭水化物?: string;
  糖質?: string;
  食物繊維?: string;

  // ミネラル
  ナトリウム?: string;
  食塩相当量?: string;
  カリウム?: string;
  カルシウム?: string;
  マグネシウム?: string;
  リン?: string;
  鉄?: string;
  亜鉛?: string;
  銅?: string;
  マンガン?: string;
  ヨウ素?: string;
  セレン?: string;
  クロム?: string;
  モリブデン?: string;

  // ビタミン
  ビタミンA?: string;
  betaカロテン?: string;
  ビタミンD?: string;
  ビタミンE?: string;
  ビタミンK?: string;
  ビタミンB1?: string;
  ビタミンB2?: string;
  ナイアシン?: string;
  ビタミンB6?: string;
  ビタミンB12?: string;
  葉酸?: string;
  パントテン酸?: string;
  ビオチン?: string;
  ビタミンC?: string;
};

export type User = {
  次のご飯: detailWithDate;
  理想体型: food;
  食事履歴: {
    日付: firestore.Timestamp;
    食べたもの: foodDetail;
  };
};

export type foodDetail = {
  名前: string;
  分類: "メイン" | "副菜" | "汁物" | "主食";
  メイン: "ご飯" | "パン" | null;
  URL: string;
  栄養: food;
};

export type detailWithId = {
  id: string;
  detail: foodDetail;
};

export type detailWithDate = {
  日付: firestore.Timestamp;
  ご飯: foodDetail[];
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
