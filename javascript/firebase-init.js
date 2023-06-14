// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDimCNRhaIN2GJl0r1_3-esIOk9GWgFsL4",
  authDomain: "cs601-8b24c.firebaseapp.com",
  databaseURL: "https://cs601-8b24c-default-rtdb.firebaseio.com",
  projectId: "cs601-8b24c",
  storageBucket: "cs601-8b24c.appspot.com",
  messagingSenderId: "771378244076",
  appId: "1:771378244076:web:fb7b880a179cfcce27f8c9",
  measurementId: "G-ZRE2T4E1W8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export { signInWithGoogle };
