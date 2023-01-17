// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt7x_opNWhWIZka8UoZn_3RH3RYde1cEs",
  authDomain: "freelance-b89ce.firebaseapp.com",
  projectId: "freelance-b89ce",
  storageBucket: "freelance-b89ce.appspot.com",
  messagingSenderId: "744737744693",
  appId: "1:744737744693:web:69e1e6c23d2072a1230e7c",
  measurementId: "G-735WFB1JHE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)