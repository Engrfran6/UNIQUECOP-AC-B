"use client";

import {useToast} from "@/hooks/use-toast";
import {auth, db, facebookProvider, googleProvider, twitterProvider} from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {createContext, useContext, useEffect, useState} from "react";

export type AdminLevel = "super" | "manager" | "editor";

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  level: AdminLevel;
  permissions: string[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

const ADMIN_PERMISSIONS = {
  super: [
    "manage_users",
    "manage_products",
    "manage_orders",
    "view_analytics",
    "manage_settings",
    "manage_admins",
    "manage_content",
    "view_reports",
    "view_orders",
  ],
  manager: [
    "manage_products",
    "manage_orders",
    "view_analytics",
    "manage_settings",
    "manage_content",
    "view_reports",
  ],
  editor: ["manage_products", "view_orders", "view_analytics", "manage_content"],
} as const;

const ADMIN_EMAILS = ["uniquecop.ac.b@gmail.com", "manager@Uniquecop.com", "editor@Uniquecop.com"];

interface AuthContextType {
  user: User | null;
  userData: any;
  adminData: AdminUser | null;
  isAdmin: boolean;
  isGuest: boolean;
  loading: boolean;
  adminLevel: AdminLevel | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (options?: {adminMode?: boolean}) => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  continueAsGuest: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        const isAdminUser = adminDoc.exists() && adminDoc.data()?.isActive !== false;
        setIsAdmin(isAdminUser);

        if (isAdminUser) {
          const data = adminDoc.data();
          const adminInfo: AdminUser = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || user.email!.split("@")[0],
            photoURL: user.photoURL || undefined,
            level: data.level,
            permissions: (
              data.permissions ||
              ADMIN_PERMISSIONS[data.level as AdminLevel] ||
              []
            ).map((p: string) => p.trim()),

            createdAt: data.createdAt?.toDate() || new Date(),
            lastLogin: new Date(),
            isActive: true,
          };
          setAdminData(adminInfo);
        } else {
          setAdminData(null);
        }

        setIsGuest(false);
      } else {
        setUserData(null);
        setAdminData(null);
      }
    });

    return unsubscribe;
  }, []);

  const createUserDocument = async (user: User, additionalData: any = {}) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const {displayName, email, photoURL} = user;
      const createdAt = new Date();

      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {displayName: name});
    await createUserDocument(user, {displayName: name});

    toast({
      title: "Account created!",
      description: "Welcome to Uniquecop AC&B.",
    });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    toast({title: "Welcome back!", description: "Signed in successfully."});
  };

  const signInWithGoogle = async ({adminMode = false}: {adminMode?: boolean} = {}) => {
    try {
      const {user} = await signInWithPopup(auth, googleProvider);
      await createUserDocument(user);

      if (adminMode) {
        if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
          await signOut(auth);
          return;
        }

        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        if (!adminDoc.exists() || !adminDoc.data()?.isActive) {
          await signOut(auth);
          return;
        }
      }

      toast({
        title: "Welcome back!",
        description: "Signed in with Google.",
      });
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast({
          title: "Google sign in failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
      console.error("Google sign in error:", error);
    }
  };

  const signInWithFacebook = async () => {
    const {user} = await signInWithPopup(auth, facebookProvider);
    await createUserDocument(user);
    toast({title: "Signed in with Facebook"});
  };

  const signInWithTwitter = async () => {
    const {user} = await signInWithPopup(auth, twitterProvider);
    await createUserDocument(user);
    toast({title: "Signed in with Twitter"});
  };

  const logout = async () => {
    await signOut(auth);
    setIsGuest(false);
    toast({title: "Signed out successfully"});
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    toast({title: "Reset link sent", description: "Check your email."});
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    toast({
      title: "Guest mode enabled",
      description: "You can browse freely or sign up anytime.",
    });
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    isGuest,
    isAdmin,
    adminData,
    adminLevel: adminData?.level || null,
    hasPermission: (permission: string) => adminData?.permissions.includes(permission) ?? false,
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
