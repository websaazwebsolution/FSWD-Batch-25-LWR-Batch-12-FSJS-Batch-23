import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyA92dQdPvoKL6WxOpRTTeU3P3UyAwMNuTo",
  authDomain: "reactcrud-deec8.firebaseapp.com",
  projectId: "reactcrud-deec8",
  storageBucket: "reactcrud-deec8.firebasestorage.app",
  messagingSenderId: "733314318352",
  appId: "1:733314318352:web:ccf71da67457f4afcb4a95",
  measurementId: "G-ER2T112J0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// console.log(db); // This should now work correctly

export { db }; // Export the Firestore instance