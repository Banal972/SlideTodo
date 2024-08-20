// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_ApiKey,
  authDomain: process.env.EXPO_PUBLIC_AuthDomain,
  projectId: process.env.EXPO_PUBLIC_ProjectId,
  storageBucket: process.env.EXPO_PUBLIC_StorageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_MessagingSenderId,
  appId: process.env.EXPO_PUBLIC_AppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
