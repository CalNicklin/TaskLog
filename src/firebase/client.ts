// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfiIvS61tb94uP_XHJo6-lYD_ciBhQ31w",
  authDomain: "tasklog-9e780.firebaseapp.com",
  projectId: "tasklog-9e780",
  storageBucket: "tasklog-9e780.appspot.com",
  messagingSenderId: "913293293541",
  appId: "1:913293293541:web:ec0df09c48421e9a80210c",
  measurementId: "G-H4Z0QDHBSQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);