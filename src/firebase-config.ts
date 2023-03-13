import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjqFqRqE2CMYa6eA76ZVsMbMYA6lJE7yk",
  authDomain: "employee-tracker-4.firebaseapp.com",
  projectId: "employee-tracker-4",
  storageBucket: "employee-tracker-4.appspot.com",
  messagingSenderId: "182836212661",
  appId: "1:182836212661:web:b4f201f9b1768606e0dffc",
  measurementId: "G-42RBX8G4Z6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
