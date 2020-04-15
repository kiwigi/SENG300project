
(function(){

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  // const btnSignUp = document.getElementById('btnSignUp');

  // Add login event
  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    console.log('info:',email,pass);
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
    .catch(e => console.log("> ERROR: ",e.message));
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      window.location = "index.html";
      //console.log(firebaseUser)
    } else {
      //window.location = "login.html";
      console.log('not logged in')
    }
  });


}())
