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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

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

export const readUserData = async (uid: string) => {
  // get data from firestore once
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const docRef = doc(db, "users", uid);
  getDoc(docRef)
    .then((doc) => {
      setUserData(doc.data());
    })
    .catch((error) => {
      console.error("error getting user details", error);
    })
    .then(() => setIsLoading(false));
  return [userData, isLoading];
};

export const useUserData = () => {
  const [user] = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      } else {
        setUserData(null);
      }
      setIsLoading(false);
      console.log("Current data: ", doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return [userData, isLoading];
};
