
  function submit(){
    const ref = firebase.storage().ref('/studentDocuments')

    const file = document.querySelector("#data").files[0] // get first element

    const name = new Date()+ '-' + file.name        // get file name

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
