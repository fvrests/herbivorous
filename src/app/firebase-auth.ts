import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const useAuth = () => {
  // subscribe to auth changes
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // could redirect to login here
        // or nextjs route guards
      }
      setIsLoading(false);
    });
    // cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // does not run automatically on auth data change, just on auth state (login / logout). when updating user should set user in context too
  return { user, setUser, isLoading };
};

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
    })
    .catch((error) => {
      console.error("error signing up - code:", error.code);
      console.error("error signing up - message:", error.message);
    });
};

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
    })
    .catch((error) => {
      console.error("error signing in -- code:", error.code);
      console.error("error signing in -- message:", error.message);
    });
};

export const signOut = () => {
  authSignOut(auth)
    .then(() => {
      // Signed out
    })
    .catch((error) => {
      console.error("error signing out", error);
    });
};

export const updateAuthProfile = (profile: UserProfile) => {
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      ...profile,
    })
      .then(() => {
        // profile updated
      })
      .catch((error) => {
        console.error("error updating user profile", error);
      });
  } else {
    console.error("couldn't update user profile (no user found)");
  }
};

export const updateAuthEmail = (email: string) => {
  if (auth.currentUser) {
    updateEmail(auth.currentUser, email)
      .then(() => {
        // email updated
      })
      .catch((error) => {
        console.error("error updating user email", error);
      });
  } else {
    console.error("couldn't update user email (no user found)");
  }
};
