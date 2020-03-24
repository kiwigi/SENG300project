  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB184WtbZKmG5ZYl4ll2ZOY4tBoncFEx_k",
    authDomain: "seng300-48c52.firebaseapp.com",
    databaseURL: "https://seng300-48c52.firebaseio.com",
    projectId: "seng300-48c52",
    storageBucket: "seng300-48c52.appspot.com",
    messagingSenderId: "674151113181",
    appId: "1:674151113181:web:8ceac73abaaf0d78aa9634",
    measurementId: "G-H2LN7DGHF1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  function submit(){
    const ref = firebase.storage().ref('/studentDocuments')

    const file = document.querySelector("#data").files[0] // get first element

    const name = new Date()+ '-' + file.name        // get image name

    const metadata = {
      contentType:file.type

    }

    const task = ref.child(name).put(file,metadata)        // pass file and type of data

    task
    .then(snapshot => snapshot.ref.getDownloadURL)
    .then(url => {
      console.log(url)
      alert("Submission Success")

    })
    .catch(console.error);

  }