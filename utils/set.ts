import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createNewUser(email: string) {
  await setDoc(doc(db, 'User', email), {}, { merge: true });
}

export async function deleteTodayFood(userId: string) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    次のご飯: deleteField(),
  });
}
