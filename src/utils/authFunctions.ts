// authFunctions.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
