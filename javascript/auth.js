const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

window.signInWithGoogle = function () {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
