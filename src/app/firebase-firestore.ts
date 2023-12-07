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

export async function setFirestore(uid: string, userData?: object) {
  // const user = useAuth();
  // if (!user) return console.error("error setting firestore -- can't find user");
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

export const readFirestore = async (uid: string) => {
  // get data from firestore once
  const docRef = doc(db, "users", uid);
  return getDoc(docRef)
    .then((doc) => {
      return doc.data();
    })
    .catch((error) => {
      console.error("error getting user details", error);
    });
};

export const useFirestore = () => {
  const [user] = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
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
      console.log("Current data: ", doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return userData;
};

// /**
//  * @usage const unsubscribe = listenToDocument('users/<id>')
//  */
// export function listenToDocument(
//   documentPath: string,
//   callback: (data: {}) => void,
// ) {
//   const unsubscribe = onSnapshot(doc(db, documentPath), (doc) => {
//     if (doc.data()) {
//       callback(doc.data());
//     } else {
//       callback(null);
//     }
//   });
//
//   return unsubscribe;
// }
