import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsotfVi77SQYF7GJkgTQWZYKc043bZj0s",
  authDomain: "employee-tracker-4000.firebaseapp.com",
  projectId: "employee-tracker-4000",
  storageBucket: "employee-tracker-4000.appspot.com",
  messagingSenderId: "875973330555",
  appId: "1:875973330555:web:ba383e0c878056f7f504de",
  measurementId: "G-S0XZML27ZW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
