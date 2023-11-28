import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  updateProfile,
} from "firebase/auth";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyD2r87jGEYm8RkZ8Y34zjnok8v8MPoGbqY",
  authDomain: "herbivorous-3d7a0.firebaseapp.com",
  projectId: "herbivorous-3d7a0",
  storageBucket: "herbivorous-3d7a0.appspot.com",
  messagingSenderId: "977906861353",
  appId: "1:977906861353:web:fecbf97312e8f13c192338",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  // useEffect with no dependencies: run on component mount
  // info: https://react.dev/reference/react/useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser({
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
          uid: userData.uid,
        });
      } else {
        setUser(null);
        // could redirect to login here
        // or nextjs route guards
      }
    });
    // cleanup code on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("user signed up", userCredential.user);
    })
    .catch((error) => {
      console.log("error signing up - code:", error.code);
      console.log("error signing up - message:", error.message);
    });
};

export const signIn = (email: string, password: string) => {
  console.log("attempting signin");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("signed in", userCredential.user);
    })
    .catch((error) => {
      console.log("error signing in -- code:", error.code);
      console.log("error signing in -- message:", error.message);
    });
};

export const signOut = () => {
  authSignOut(auth)
    .then(() => {
      // Signed out
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error signing out");
    });
};

export const updateUser = (displayName: string, photoURL: string) => {
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      ...auth.currentUser,
      displayName: displayName || auth.currentUser.displayName,
      photoURL: photoURL || auth.currentUser.photoURL,
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log("error updating user profile");
      });
  } else {
    console.log("couldn't update user profile (no user found)");
  }
};
