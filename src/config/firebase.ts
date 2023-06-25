import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjAezVeB0O4kP_VJYnEuqpSD5iE9VyoiM",
  authDomain: "tascal-pro.firebaseapp.com",
  projectId: "tascal-pro",
  storageBucket: "tascal-pro.appspot.com",
  messagingSenderId: "197260822086",
  appId: "1:197260822086:web:b6fcd1593882306dfd6c47",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firestore = getFirestore(firebaseApp);
