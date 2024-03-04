import { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/utils/firebase-auth";
import { getDateString } from "@/utils/date";
import { getLocalStorage, updateLocalProgress } from "@/utils/localStorage";
import { app } from "@/utils/firebase-config";

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// must be at top level due to async
export async function updateUserData(uid: string, userData?: object) {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        ...userData,
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error setting document: ", error);
  }
}

export const useUserData = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isAuthLoading) {
      return;
    } else if (!user) {
      return setIsLoading(false);
    }
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
        setIsLoading(false);
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user, isAuthLoading]);

  return { userData, isLoading } as const;
};

export function useProgress(
  user: User | null,
  goal: Goal,
  dateString: string = getDateString(),
) {
  const { userData, isLoading } = useUserData();
  const [progress, setProgress] = useState(0);
  const [overflow, setOverflow] = useState(false);

  // sync to database or local progress
  useEffect(() => {
    let localData: UserData | null = getLocalStorage("herbivorous");
    setProgress(0);
    if (!isLoading) {
      if (user) {
        const storedProgress =
          userData?.progress?.[dateString]?.[goal.name] ?? 0;
        storedProgress && setProgress(storedProgress);
      } else {
        const localProgress = localData?.progress?.[dateString]?.[goal.name];
        setProgress(localProgress ?? 0);
      }
    }
  }, [isLoading, user, userData?.progress?.[dateString]]);

  // update progress hook and database or local progress
  const update = (newValue: number) => {
    const updatedData = {
      progress: { [dateString || getDateString()]: { [goal.name]: newValue } },
    };
    if (user) {
      updateUserData(user.uid, updatedData);
    } else updateLocalProgress(dateString, goal.name, newValue);
    setProgress(newValue);
  };

  const increment = (amount?: number) => {
    const newValue = progress + (amount || 1);
    update(newValue);
  };

  const reset = () => {
    update(0);
  };

  // if progress is increased past goal, temporarily set progressOverflow to true -- allows animation on overflow
  useEffect(() => {
    if (progress > goal.quantity) {
      setOverflow(true);
      setTimeout(() => {
        setOverflow(false);
      }, 100);
    }
  }, [progress]);

  return { progress, update, increment, reset, overflow } as const;
}
