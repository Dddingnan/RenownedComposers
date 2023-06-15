import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

async function addDocument() {
  try {
    await setDoc(doc(db, "users", "newUser"), {
      firstName: "John",
      lastName: "Doe",
      born: 1990,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getDocument() {
  const docRef = doc(db, "users", "newUser");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

export { signInWithGoogle, addDocument, getDocument };
