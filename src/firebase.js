import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCNxRMsfNvZeIMxqLwgQtwD7tGGNCkeu2c",
  authDomain: "e-learniing-5e7ee.firebaseapp.com",
  projectId: "e-learniing-5e7ee",
  storageBucket: "e-learniing-5e7ee.appspot.com",
  messagingSenderId: "165048809456",
  appId: "1:165048809456:web:7d6f6cd93aa6ae115f0f35",
  measurementId: "G-XZPQ17EXXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, storage };