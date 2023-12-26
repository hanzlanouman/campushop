// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import useFirestore from '../hooks/useFirestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserProfile } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        setCurrentUser({ ...user, ...userProfile });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
