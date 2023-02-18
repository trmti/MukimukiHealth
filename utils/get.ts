import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { todayFood, suggestFoods } from './testData';
import { foodDetail, detailWithId } from './types';

export async function getTodayFood(userId: number): Promise<foodDetail[]> {
  return todayFood;
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
