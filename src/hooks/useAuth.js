import { useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebase.config';
import useFirestore from './useFirestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import { Alert } from 'react-native';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { setUserProfile, getUserProfile } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        setCurrentUser({ ...user, ...userProfile }); // Use setCurrentUser
      } else {
        setCurrentUser(null); // Use setCurrentUser
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(auth.currentUser.uid);
      setCurrentUser({ ...auth.currentUser, ...userProfile });
    } catch (error) {
      console.log('uh oh');
      console.log(error.message);
      Alert.alert('Sign In Error', error.message);
    }
    setLoading(false);
  };

  const signUp = async (email, password, data) => {
    console.log('sign up hit');
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      delete data.password; // Don't store password in the user profile
      await setUserProfile(userCredential.user.uid, data);
      setCurrentUser({ ...userCredential.user, ...data }); // Update currentUser
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
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
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return { user, loading, signIn, signUp, signOutUser, currentUser };
};

export default useAuth;
