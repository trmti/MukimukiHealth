import firestore from 'firebase/firestore';

export type food = {
  // 主な栄養
  カロリー: number;
  タンパク質: number;
  脂質: number;
  炭水化物: number;
  糖質: number;
  赤: number;
  黃色: number;
  緑: number;
};

export type food_tanni = {
  // 主な栄養
  カロリー?: string;
  タンパク質?: string;
  脂質?: string;
  炭水化物?: string;
  糖質?: string;
  食物繊維?: string;
  赤?: string;
  黃色?: string;
  緑?: string;
};

export type User = {
  体脂肪率: number;
  体重: number;
  身長: number;
  次のご飯: detailWithRef;
  理想体型: idealNames;
  目標栄養素: {
    カロリー: number;
    タンパク質: number;
    脂質: number;
    糖質: number;
    炭水化物: number;
  };
  食事履歴: {
    日付: firestore.Timestamp;
    食べたもの: { id: string }[];
  }[];
};

export type foodTypes = 'メイン' | '副菜' | '汁物' | '主食';
export type nutritionTypes =
  | 'カロリー'
  | 'タンパク質'
  | '炭水化物'
  | '脂質'
  | '糖質';

export type foodDetail = {
  名前: string;
  分類: foodTypes;
  メイン: 'ご飯' | 'パン' | null;
  URL: string;
} & food;

export type detailWithId = {
  id: string;
  detail: foodDetail;
};

export type detailWithRef = {
  日付: firestore.Timestamp;
  ご飯: { id: string }[];
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

export type idealNames = '力士' | 'モデル' | 'ガチムチ' | '普通';

export type ideal = {
  id: number;
  name: idealNames;
  url: string;
};

export type record = {
  日付: firestore.Timestamp;
  食べたもの: foodDetail[];
};
