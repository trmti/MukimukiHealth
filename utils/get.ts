import { todayFood, suggestFoods } from './testData';
import { foodDetail } from './types';

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
