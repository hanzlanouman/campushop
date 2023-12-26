import { firestore } from '../config/firebase.config';
import {
  getDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import useStorage from './useStorage';
const useFirestore = () => {
  const { uploadAdImages } = useStorage();
  const [loading, setLoading] = useState(false);
  const setUserProfile = async (userId, profileData) => {
    console.log('set user profile');
    console.log(profileData);
    const userProfileRef = doc(firestore, 'users', userId);
    await setDoc(userProfileRef, profileData);
  };

  const getUserProfile = async (userId) => {
    const userProfileRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(userProfileRef);
    const data = docSnap.data();
    return docSnap.exists() ? data : null;
  };
  const deleteUserProfile = async (userId) => {
    const userProfileRef = doc(firestore, 'users', userId);
    await deleteDoc(userProfileRef);
  };
  const queryUserProfile = async (fieldName, value) => {
    const q = query(
      collection(firestore, 'users'),
      where(fieldName, '==', value)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  const emailExists = async (email) => {
    console.log('API HIT');
    setLoading(true);
    const q = query(
      collection(firestore, 'users'),
      where('email', '==', email)
    );

    const querySnapshot = await getDocs(q);
    setLoading(false);
    return querySnapshot.docs.length > 0 ? true : false;
  };

  const userExsists = async (username) => {
    setLoading(true);
    const q = query(
      collection(firestore, 'users'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(q);
    console.log('API HIT');
    setLoading(false);
    return querySnapshot.docs.length > 0 ? true : false;
  };

  const createNewAd = async (adData) => {
    const images = await uploadAdImages(adData.images);

    const adRef = collection(firestore, 'ads');
    const newAd = await setDoc(doc(adRef), {
      ...adData,
      images: images,
    });
    return newAd;
  };

  return {
    setUserProfile,
    getUserProfile,
    deleteUserProfile,
    queryUserProfile,
    emailExists,
    userExsists,
    createNewAd,

    loading,
  };
};

export default useFirestore;
