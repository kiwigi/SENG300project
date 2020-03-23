
(function(){

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  // const btnSignUp = document.getElementById('btnSignUp');

  // Add login event
  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
    .catch(e => console.log(e.message));
  });

  /*

  Signing up a user (disabled for now)

  // Add signup event
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(credential =>{
        console.log('uid just created',credential.user.uid);
        return firebase.database().ref("Users/Student/"+credential.user.uid).set({
          name: "Test",
          email: credential.user.email,
          year: 2020,
          degree: {
            type: "BSc",
            major: "CPSC",
            minor: "MATH"
          },
          graduateType: "UNDERGRAD",
          department: "Faculty of Science",
          gpa: 4.0,
          scholarshipsAppliedFor: [],
          scholarShipsAwarded: [],
          scholarshipAccepted: null,
          dateCreated: Date(),
          addedBy: null
        })
      })
      .catch(e => console.log(e.message));
  });
  */

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
