// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnM2oUSv09UglEmLV_CuSIP8ucYrxfz3k',
  authDomain: 'campushop-89c31.firebaseapp.com',
  projectId: 'campushop-89c31',
  storageBucket: 'campushop-89c31.appspot.com',
  messagingSenderId: '725311293110',
  appId: '1:725311293110:web:db9902795ae388c3d0c817',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);

export { auth };
export { firestore };
