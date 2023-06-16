import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { showLoadingSpinner, hideLoadingSpinner } from "./spinner.js";

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
const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const { uid, displayName, email, photoURL } = result.user;
      const userData = { uid, displayName, email, photoURL };
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("google-sign-in").style.display = "none";
      document.getElementById("user-section").style.display = "flex";
      document.getElementById("username").innerText = displayName;
      document.getElementById("icon").src = photoURL;
      document.getElementById("icon").alt = displayName;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function signOutWithGoogle() {
  signOut(auth)
    .then(() => {
      // Sign-out successful, remove userData from localStorage
      localStorage.removeItem("userData");
      document.getElementById("google-sign-in").style.display = "block";
      document.getElementById("user-section").style.display = "none";
      document.getElementById("username").innerText = "";
      document.getElementById("icon").src = "";
      document.getElementById("icon").alt = "";
    })
    .catch((error) => {
      // An error happened during sign-out
      console.log(error.message);
    });
}

async function addDocument(uid, composer, creation, callback) {
  showLoadingSpinner();
  try {
    await setDoc(doc(db, uid, composer), {
      creation,
    });
    hideLoadingSpinner();
    callback();
  } catch (e) {
    hideLoadingSpinner();
    console.error("Error adding document: ", e);
  }
}

async function getAllDocuments(collectionName) {
  showLoadingSpinner();
  const dataCollection = collection(db, collectionName);
  const snapshot = await getDocs(dataCollection);
  const documents = snapshot.docs.map((doc) => ({
    composer: doc.id,
    data: doc.data(),
  }));
  hideLoadingSpinner();
  return documents;
}
// TODO Here Add signout button
export { signInWithGoogle, signOutWithGoogle, addDocument, getAllDocuments };
