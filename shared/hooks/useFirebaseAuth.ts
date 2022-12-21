import React from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from "../../firebase.config";

import authAdapter, { Auth } from "../models/auth.model";
import { useToast } from "@chakra-ui/react";

const useFirebaseAuth = () => {
  const [user, setUser] = React.useState<Auth | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [signInLoading, setSignInLoadingLoading] = React.useState<boolean>(false);
  const [signUpLoading, setSignUpLoadingLoading] = React.useState<boolean>(false);
  const [googleAuthLoading, setGoogleAuthLoadingLoading] = React.useState<boolean>(false);
  
  const [error, setError] = React.useState<string | null>(null);

  const toast = useToast();

  const authStateChanged = async (authState: any) => {
    setLoading(true);

    if (!authState) {
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    try {
      const accessToken: string = await authState.getIdToken();

      accessToken && setUser(() => authAdapter(authState, accessToken));
      setLoading(false);
      setIsLoggedIn(true);
    } catch (error: any) {
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);
    }
  }

  const signUpWithPassword = async ({ email, password }: Record<string, string>) => {
    setLoading(true);
    setSignUpLoadingLoading(true);

    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setError(null);
      setSignUpLoadingLoading(false);
    } catch (error: any) {
      setError(error.code);
      setUser(null);
      setLoading(false);
      setSignUpLoadingLoading(false);

      toast({
        title: error.code,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const signInWithPassword = async ({ email, password }: Record<string, string>) => {
    setLoading(true);
    setSignInLoadingLoading(true);

    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password)
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setError(null);
      setSignInLoadingLoading(false);
    } catch (error: any) {
      setError(error.code);
      setUser(null);
      setLoading(false);
      setSignInLoadingLoading(false);

      toast({
        title: error.code,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    setLoading(true);
    setGoogleAuthLoadingLoading(true);

    try {
      const authUser = await signInWithPopup(auth, provider);
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setError(null);
      setGoogleAuthLoadingLoading(false);
    } catch (error: any) {
      setError(error.code);
      setUser(null);
      setLoading(false);
      setGoogleAuthLoadingLoading(false);

      toast({
        title: error.code,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const logout = () => signOut(auth);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoggedIn,
    loading,
    signUpLoading,
    signInLoading,
    googleAuthLoading,
    error,
    signUpWithPassword,
    signInWithPassword,
    signInWithGoogle,
    logout
  };
}

export default useFirebaseAuth;