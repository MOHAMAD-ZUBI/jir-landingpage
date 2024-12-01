// authFunctions.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase";
import client from "./client";

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return await signOut(auth);
};

export const customSignUp = async (email: string, password: string) => {
  try {
    const { data } = await client.post("/v2/api/appuser/", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setupRecaptcha = (elementId: string) => {
  return new RecaptchaVerifier(auth, elementId, {
    size: "invisible",
  });
};

export const startPhoneAuth = async (
  phoneNumber: string,
  recaptchaVerifier: any
) => {
  try {
    const provider = new PhoneAuthProvider(auth);
    return await provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (verificationId: string, otp: string) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    return await signInWithCredential(auth, credential);
  } catch (error) {
    throw error;
  }
};
