import { signInWithGoogle, addDocument } from "./firebase-init.js";

function getUserData() {
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData);
  if (data) {
    const { displayName, photoURL } = data;
    document.getElementById("google-sign-in").style.display = "none";
    document.getElementById("username").innerText = displayName;
    document.getElementById("icon").src = photoURL;
    document.getElementById("icon").alt = displayName;
    // TODO Here
    addDocument();
  } else {
    document.getElementById("user-section").style.display = "none";
  }
  console.log("getUserData ------ ", data);
}

window.onload = function () {
  getUserData();
  document.getElementById("google-sign-in").addEventListener("click", () => {
    signInWithGoogle();
  });
};
