import { useEffect, useState } from 'react';
import { firestore } from '../config/firebase.config';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { Alert } from 'react-native';

const useFirestore = () => {
  const setUserProfile = async (userId, profileData) => {
    const userProfileRef = doc(firestore, 'userProfiles', userId);
    await setDoc(userProfileRef, profileData);
  };

  const getUserProfile = async (userId) => {
    const userProfileRef = doc(firestore, 'userProfiles', userId);
    const docSnap = await getDoc(userProfileRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const deleteUserProfile = async (userId) => {
    const userProfileRef = doc(firestore, 'userProfiles', userId);
    await deleteDoc(userProfileRef);
  };

  // Example function to query user profiles based on a specific condition
  const queryUserProfiles = async (fieldName, value) => {
    const q = query(
      collection(firestore, 'userProfiles'),
      where(fieldName, '==', value)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  const emailExists = async (email) => {
    console.log('API HIT');
    const q = query(
      collection(firestore, 'userProfiles'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0 ? true : false;
  };

  const userExists = async (username) => {
    const q = query(
      collection(firestore, 'userProfiles'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(q);
    console.log('API Hit');
    return querySnapshot.docs.length > 0 ? true : false;
  };

  // Additional Firestore operations can be added here as needed

  const createAd = async (userId, adData) => {
    // Create a new document in the 'ads' collection
    const adRef = doc(collection(firestore, 'ads'));
    await setDoc(adRef, {
      ...adData,
      userId, // Store reference to the user
      createdAt: new Date(), // Store the creation date
    });
  };

  const getAdsByUser = async (userId) => {
    // Query ads created by the specific user
    const q = query(
      collection(firestore, 'ads'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const updateAd = async (adId, updatedData) => {
    // Update an existing ad
    const adRef = doc(firestore, 'ads', adId);
    await setDoc(adRef, updatedData, { merge: true });
  };

  const deleteAd = async (adId) => {
    // Delete an ad
    const adRef = doc(firestore, 'ads', adId);
    await deleteDoc(adRef);
  };
  return {
    setUserProfile,
    getUserProfile,
    deleteUserProfile,
    queryUserProfiles,
    emailExists,
    userExists,
    createAd,
    getAdsByUser,
    updateAd,
    deleteAd,
  };
};

export default useFirestore;
