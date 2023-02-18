import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { todayFood, suggestFoods } from './testData';
import { foodDetail, detailWithId, detailWithDate, User } from './types';

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

export async function getTodayFood(userId: string): Promise<detailWithDate> {
  const user = await getUser(userId);
  const date = user['次のご飯']['日付'];
  // @ts-ignore
  const ids = user['次のご飯']['ご飯'].map((food) => food.id) as string[];
  const res = (await newData(ids, 'ご飯')) as foodDetail[];
  return { 日付: date, ご飯: res };
}

export async function getSuggests(
  userId: number,
  foodId: string
): Promise<foodDetail[][]> {
  return suggestFoods;
}

export async function getAllFoods() {
  const querySnapshot = await getDocs(collection(db, 'ご飯'));
  const res: detailWithId[] = [];
  querySnapshot.forEach((doc) => {
    const detail = doc.data() as foodDetail;
    res.push({ id: doc.id, detail: detail });
  });

  return res;
}

export async function getIdeal(userId: number): Promise<number> {
  return 1;
}
