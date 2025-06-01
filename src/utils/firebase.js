// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5STEZodSw8sDZzpXfOa15MDunAb8lhT4",
  authDomain: "netflixgpt-1d545.firebaseapp.com",
  projectId: "netflixgpt-1d545",
  storageBucket: "netflixgpt-1d545.firebasestorage.app",
  messagingSenderId: "623925151178",
  appId: "1:623925151178:web:42becd4af980d934db7b33",
  measurementId: "G-JYVEMFRYMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();