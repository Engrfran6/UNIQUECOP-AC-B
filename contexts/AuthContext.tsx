'use client';

import {useToast} from '@/hooks/use-toast';
import {auth, db, facebookProvider, googleProvider, twitterProvider} from '@/lib/firebase';
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import type React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  continueAsGuest: () => void;
  userData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        setIsGuest(false);
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const createUserDocument = async (user: User, additionalData: any = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const {displayName, email, photoURL} = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, {displayName: name});
      await createUserDocument(user, {displayName: name});

      toast({
        title: 'Account created successfully!',
        description: 'Welcome to Uniquecop AC&B. You can now enjoy personalized features.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const {user} = await signInWithPopup(auth, googleProvider);
      await createUserDocument(user);
      toast({
        title: 'Welcome!',
        description: 'You have successfully signed in with Google.',
      });
    } catch (error: any) {
      toast({
        title: 'Google sign in failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const {user} = await signInWithPopup(auth, facebookProvider);
      await createUserDocument(user);
      toast({
        title: 'Welcome!',
        description: 'You have successfully signed in with Facebook.',
      });
    } catch (error: any) {
      toast({
        title: 'Facebook sign in failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signInWithTwitter = async () => {
    try {
      const {user} = await signInWithPopup(auth, twitterProvider);
      await createUserDocument(user);
      toast({
        title: 'Welcome!',
        description: 'You have successfully signed in with Twitter.',
      });
    } catch (error: any) {
      toast({
        title: 'Twitter sign in failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsGuest(false);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Password reset email sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      toast({
        title: 'Password reset failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    toast({
      title: 'Continuing as guest',
      description: 'You can sign up anytime to save your preferences and order history.',
    });
  };

  const value = {
    user,
    userData,
    loading,
    isGuest,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logout,
    resetPassword,
    continueAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
