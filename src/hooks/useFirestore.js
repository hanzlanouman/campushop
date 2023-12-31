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
  orderBy,
} from 'firebase/firestore';
import { useState } from 'react';
import useStorage from './useStorage';
import { auth } from '../config/firebase.config';
import { set } from 'date-fns';
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
    setLoading(true);
    const images = await uploadAdImages(adData.images);

    const adRef = collection(firestore, 'ads');
    await setDoc(doc(adRef), {
      ...adData,
      createdAt: new Date(), // Adding the current timestamp
      createdBy: auth.currentUser.uid,
    });
    setLoading(false);
    return newAd;
  };

  const getUserAds = async () => {
    const q = query(
      collection(firestore, 'ads'),
      where('createdBy', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Including the document ID
      ...doc.data(),
    }));
  };

  const getAllAds = async () => {
    // Assuming each ad document has a 'createdAt' or 'timestamp' field
    const q = query(collection(firestore, 'ads'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Including the document ID
      ...doc.data(),
    }));
  };

  getCategorizedAds = async (category) => {
    setLoading(true);
    const q = query(
      collection(firestore, 'ads'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    setLoading(false);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Including the document ID
      ...doc.data(),
    }));
  };

  const deleteAd = async (adId) => {
    setLoading(true);
    const adRef = doc(firestore, 'ads', adId);
    await deleteDoc(adRef);
    setLoading(false);
    return;
  };

  return {
    setUserProfile,
    getUserProfile,
    deleteUserProfile,
    queryUserProfile,
    emailExists,
    userExsists,
    createNewAd,
    getAllAds,
    getUserAds,
    deleteAd,
    getCategorizedAds,

    loading,
  };
};

export default useFirestore;
