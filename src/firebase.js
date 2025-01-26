// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA92dQdPvoKL6WxOpRTTeU3P3UyAwMNuTo",
  authDomain: "reactcrud-deec8.firebaseapp.com",
  projectId: "reactcrud-deec8",
  storageBucket: "reactcrud-deec8.firebasestorage.app",
  messagingSenderId: "733314318352",
  appId: "1:733314318352:web:ccf71da67457f4afcb4a95",
  measurementId: "G-ER2T112J0Z"
};
console.log(db); // This should print the Firestore instance

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);