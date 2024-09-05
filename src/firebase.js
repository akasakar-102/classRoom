// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBlnTnAQG8zEKcpbmCu2H5p6QwlOGGwic",
  authDomain: "employee-service-be479.firebaseapp.com",
  projectId: "employee-service-be479",
  storageBucket: "employee-service-be479.appspot.com",
  messagingSenderId: "630818476748",
  appId: "1:630818476748:web:b568ecbe2804f712ea6869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };