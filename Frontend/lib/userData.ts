// lib/userData.ts
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};
