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
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import useStorage from './useStorage';
import { auth } from '../config/firebase.config';
import { startAfter, limit } from 'firebase/firestore';
import { Alert } from 'react-native';
const useFirestore = () => {
  const { uploadAdImages } = useStorage();
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const searchAds = async (searchTerm, newSearch = false) => {
    setLoading(true);
    const numResults = 20;
    const adsRef = collection(firestore, 'ads');

    let q;

    if (searchTerm) {
      // First orderBy 'title' because we're using it in an inequality filter
      q = query(
        adsRef,
        orderBy('title'),
        orderBy('createdAt', 'desc'),
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        limit(numResults)
      );
    } else {
      q = query(adsRef, orderBy('createdAt', 'desc'), limit(numResults));
    }

    if (!newSearch && lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    try {
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      const ads = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      return ads;
    } catch (error) {
      console.error('Error searching ads:', error);
      setLoading(false);
      return [];
    }
  };
  const updateAdStatus = async (adId, isActive) => {
    try {
      const adRef = doc(firestore, 'ads', adId);
      await updateDoc(adRef, { isActive });
      console.log('Ad status updated successfully');
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };
  const updateUserProfile = async (userId, profileData) => {
    console.log(userId, profileData);

    // Check if username exists and is different from the current user's username
    if (profileData.username && profileData.username !== currentUser.username) {
      const usernameExists = await userExists(profileData.username);
      if (usernameExists) {
        return Alert.alert(
          'Error',
          'Username already exists, please try another one'
        );
      }
    }

    // Check if email exists and is different from the current user's email
    if (profileData.email && profileData.email !== currentUser.email) {
      const emailExists = await emailExists(profileData.email);
      if (emailExists) {
        return Alert.alert(
          'Error',
          'Email already in use, please try another one'
        );
      }
    }

    try {
      const userProfileRef = doc(firestore, 'users', userId);
      await setDoc(userProfileRef, profileData, { merge: true });
      return Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      return Alert.alert('Error', 'Error updating profile');
    }
  };
  const updateProfileImage = async (userId, imageUrl) => {
    try {
      const userProfileRef = doc(firestore, 'users', userId);
      await updateDoc(userProfileRef, { profileImageUrl: imageUrl });
      console.log('Profile image updated successfully');
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

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

  const getUsername = async (uid) => {
    const userDocRef = doc(firestore, 'users', uid); // Reference to the user document
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().username; // Return the username
      } else {
        console.warn(`No user found with uid: ${uid}`);
        return 'Unknown User';
      }
    } catch (error) {
      console.error(`Error fetching user with uid: ${uid}`, error);
      return 'Unknown User';
    }
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
    adData.images = images;
    const adRef = collection(firestore, 'ads');
    const newAd = await setDoc(doc(adRef), {
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
    const q = query(
      collection(firestore, 'ads'),
      where('isActive', '==', true), // Filter to show only active ads
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Including the document ID
      ...doc.data(),
    }));
  };
  const getCategorizedAds = async (category) => {
    setLoading(true);
    const q = query(
      collection(firestore, 'ads'),
      where('isActive', '==', true), // Filter to show only active ads
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
    getUsername,
    searchAds,
    updateUserProfile,
    updateProfileImage,
    updateAdStatus,
    getCategorizedAds,

    loading,
  };
};

export default useFirestore;
