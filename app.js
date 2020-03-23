
(function(){

  console.log(firebase.auth().currentUser);

  // Get elements
  const btnLogout = document.getElementById('btnLogout');

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  })

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      // window.location.replace("index.html"); // no need to redirect
      console.log(firebaseUser)
    } else {
      window.location = "login.html";
      console.log('not logged in')
    }
  });

}())
