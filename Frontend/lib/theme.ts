import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const getUserTheme = async (): Promise<"light" | "dark"> => {
  const user = auth.currentUser;
  if (!user) return "light"; // default theme

  const userDoc = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data().preferences?.theme || "light";
  }
  return "light";
};

export const updateUserTheme = async (theme: "light" | "dark") => {
  const user = auth.currentUser;
  if (!user) return;

  const userDoc = doc(db, "users", user.uid);
  await setDoc(
    userDoc,
    {
      preferences: {
        theme,
      },
    },
    { merge: true }
  );
};

export const setTheme = (theme: "light" | "dark" | "system") => {
    if (typeof window === "undefined") return;
  
    const root = window.document.documentElement;
  
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  
    // Optionally store it in localStorage to persist client-side
    localStorage.setItem("theme", theme);
  };
  
