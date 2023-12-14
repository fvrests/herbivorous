import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./firebase-auth";
import { firebaseConfig } from "./firebase-config";
import { getDateString } from "@/utils/utils";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      return setIsLoading(false);
    }
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return { userData, isLoading } as const;
};

export async function updateUserData(uid: string, userData?: object) {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        ...userData,
      },
      { merge: true },
    );
    console.log("User document set");
  } catch (error) {
    console.error("Error setting document: ", error);
  }
}

export async function updateProgress(
  uid: string,
  need: string,
  newValue: number,
  dateString?: string,
) {
  updateUserData(uid, {
    progress: { [dateString || getDateString()]: { [need]: newValue } },
  });
}

export function useProgress(
  user: User | null,
  need: Need,
  dateString?: string,
) {
  const { userData } = useUserData();
  const [progress, setProgress] = useState(0);
  const [overflow, setOverflow] = useState(false);

  if (!dateString) {
    dateString = getDateString();
  }

  // sync to progress stored in database
  useEffect(() => {
    if (!userData) return;
    const storedProgress = userData?.progress?.[dateString]?.[need.name] ?? 0;
    storedProgress && setProgress(storedProgress);
  }, [userData?.progress?.[dateString]]);

  // update database progress (or local if no user)
  const update = (newValue: number) => {
    if (user) {
      updateProgress(user.uid, need.name, newValue);
    } else {
      setProgress(newValue);
    }
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
    if (progress > need.goal) {
      setOverflow(true);
      setTimeout(() => {
        setOverflow(false);
      }, 100);
    }
  }, [progress]);

  return { progress, update, increment, reset, overflow } as const;
}
