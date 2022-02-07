// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7n2stBHjx_rm6zzi5BenKufyLW22jqbI",
  authDomain: "share-with-1ca3b.firebaseapp.com",
  projectId: "share-with-1ca3b",
  storageBucket: "share-with-1ca3b.appspot.com",
  messagingSenderId: "105023317182",
  appId: "1:105023317182:web:2299dec84cae2d9e94aaef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
