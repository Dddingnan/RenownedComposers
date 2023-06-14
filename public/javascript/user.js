import { signInWithGoogle } from "./firebase-init.js";

window.onload = function () {
  document.getElementById("googleSignIn").addEventListener("click", () => {
    console.log("click");
    signInWithGoogle();
  });
};
