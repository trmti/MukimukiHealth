import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from './firebase';

export async function deleteTodayFood(userId: string) {
  const ref = doc(db, 'User', userId, '次のご飯');
}
