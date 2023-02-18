import { todayFood, suggestFoods } from './testData';
import { foodDetail, record } from './types';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from './firebase';
import { useEffect } from 'react';

export async function getTodayFood(userId: number): Promise<foodDetail[]> {
  return todayFood;
}

export async function getSuggests(
  userId: number,
  foodId: number
): Promise<foodDetail[][]> {
  return suggestFoods;
}

export async function getIdeal(userId: number): Promise<number> {
  return 1;
}

export async function getFoodRecord(userId: number): Promise<record[]> {
  const docRef = doc(getFirestore(app), "User", "Nw2N2cNhW2WaaVSgEcCZ");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().食事履歴);
    return docSnap.data()["食事履歴"];
  } else {
    console.log("Userのidが見つかりません");
    return [];
  }
}
