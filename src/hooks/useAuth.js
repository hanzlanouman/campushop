import { useState, useEffect } from 'react';
import { auth } from '../config/firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import useFirestore from './useFirestore';
import { Alert } from 'react-native';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUserProfile } = useFirestore();
  const { userExists } = useFirestore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        setLoading(false);
      } else {
        setUser(undefined);

        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password, data) => {
    if (!(await userExists(data.username))) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setUserProfile(auth.currentUser.uid, data);
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert('Username already exists');
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null); // Forcefully update user state to null after signing out
    } catch (error) {
      console.error('Error signing out: ', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  //Google Auth Sign in

  //   const signInWithGoogle = async () => {
  //     try {
  //       // First, the user signs in with Google
  //       await GoogleSignin.hasPlayServices();
  //       const { idToken } = await GoogleSignin.signIn();

  //       // Then, use the idToken to create a Firebase credential
  //       const googleCredential = GoogleAuthProvider.credential(idToken);

  //       // Finally, sign in to Firebase with the Google credential
  //       const result = await signInWithCredential(auth, googleCredential);
  //       const newUser = result.user;

  //       if (result.additionalUserInfo.isNewUser) {
  //         await setUserProfile(newUser.uid, {
  //           email: newUser.email,
  //           username: newUser.displayName,
  //           // Add other user data you want to store in Firestore
  //         });
  //       }

  //       setUser(newUser);
  //     } catch (error) {
  //       console.error('Google sign-in error: ', error);
  //     }
  //   };
  return { user, loading, signIn, signUp, signOutUser };
};

export default useAuth;
