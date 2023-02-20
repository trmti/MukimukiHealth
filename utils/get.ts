import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import firestore from 'firebase/firestore';
import { db } from './firebase';
import { suggestFoods } from './testData';
import {
  foodDetail,
  detailWithId,
  detailWithDate,
  User,
  record,
  foodTypes,
  nutritionTypes,
} from './types';

export async function getUser(userId: string): Promise<User> {
  const querySnapshot = await getDoc(doc(db, 'User', userId));
  const res = querySnapshot.data() as User;
  return res;
}

export async function newData(ids: string[], collectionName: string) {
  const res = await Promise.all(
    ids.map(async (id) => {
      const newDoc = await getDoc(doc(db, collectionName, id));
      return newDoc.data();
    })
  );

  return res;
}

export async function getTodayFood(user: User): Promise<detailWithDate | null> {
  if (user && user['次のご飯']) {
    const date = user['次のご飯']['日付'];
    const ids = user['次のご飯']['ご飯'].map((food) => food.id);
    const res = (await newData(ids, 'ご飯')) as foodDetail[];
    return { 日付: date, ご飯: res };
  } else {
    return null;
  }
}

function getDiff(a: number, b: number): number {
  if (b !== 0 && a < b) {
    return a / b;
  } else {
    return 0;
  }
}

export async function getSubFoodWithSort(
  user: User,
  mainFood: foodDetail,
  count: number
): Promise<foodDetail[]> {
  const ideals = user['目標栄養素'];
  const nutritions = mainFood;
  const nutritionCandidate: nutritionTypes[] = [
    'カロリー',
    'タンパク質',
    '脂質',
    '糖質',
    '炭水化物',
  ];
  let arr: number[] = [];

  nutritionCandidate.map((n) => {
    arr.push(getDiff(nutritions[n], ideals[n]));
  });

  const maxIndex = arr.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  const ref = collection(db, 'ご飯');
  const q = query(
    ref,
    where('分類', '==', '副菜'),
    orderBy(nutritionCandidate[maxIndex], 'desc'),
    limit(count)
  );

  const querySnapshot = await getDocs(q);
  let res: foodDetail[] = [];
  querySnapshot.forEach((snapshot) => {
    const detail = snapshot.data() as foodDetail;
    res.push(detail);
  });

  return res;
}

export async function getSoupWithSort(
  user: User,
  mainFood: foodDetail,
  subFood: foodDetail,
  count: number
): Promise<void> {}

export async function getSuggestedFood(
  userId: number,
  foodId: string
): Promise<foodDetail[][]> {
  return suggestFoods;
}

export async function getAllFoods() {
  const querySnapshot = await getDocs(collection(db, 'ご飯'));
  const res: foodDetail[] = [];
  querySnapshot.forEach((doc) => {
    const detail = doc.data() as foodDetail;
    res.push(detail);
  });

  return res;
}

export async function getIdeal(userId: number): Promise<number> {
  return 1;
}

export async function getFoodRecords(userId: string): Promise<record[]> {
  const docRef = doc(db, 'User', userId);
  const docSnap = await getDoc(docRef);
  const r: Array<record> = [];

  if (docSnap.exists()) {
    const foodRecords = docSnap.data()['食事履歴'] as record[];
    if (foodRecords) {
      await Promise.all(
        foodRecords.map(async (foodRecord) => {
          const ids = foodRecord['食べたもの'].map(
            // @ts-ignore
            (food) => food.id
          ) as string[];
          const res = (await newData(ids, 'ご飯')) as foodDetail[];
          const date = foodRecord['日付'] as firestore.Timestamp;
          r.push({ 日付: date, 食べたもの: res });
        })
      );
    }
    return r;
  } else {
    console.log('Userが見つかりません');
    return [];
  }
}
