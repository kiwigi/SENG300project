/**
 * This file represents the functionality for the scholarship panel to add scholarships.
 * This functionality should only be accessed by an administrator.
 * TODO: Make it so only accounts with an admin ID can use this functionality.
 */

(function(){

  // const DEGREES = ["CPSC","ENGG"];

  /**
   * Get submit button element, and add an event listener upon click.
   */
  const btnSubmitScholarship = document.getElementById('submitScholarship');
  btnSubmitScholarship.addEventListener('click', e => {
    addScholarship();
  })

  /**
   * Adds a scholarship to the Scholarships database.
   * Creates a unique ID by calling `guid()` which will be the key for the scholarship.
   * Then, sets the scholarship properties based on the document values provided.
   */
  function addScholarship() {
    let uid = guid(); // Create a unique ID for this scholarship (will be the key in the database)
    firebase.database().ref("Scholarships/"+uid).set({
      name: document.getElementById("scholarshipField").value,
      amount: document.getElementById("amountField").value,
      deadline: document.getElementById("deadlineField").value,
      gpaRequired: document.getElementById("gpaField").value,
      dateAdded: Date(),
      addedBy: "ADMIN_ID" // TODO: Change this once account functionality is implemented
    })

    getScholarship(uid);
  }

  /**
   * Gets a specific scholarship based on key value (unique ID).
   * For now, just prints out that it has succesfully added the scholarship to the database.
   */
  function getScholarship(uid) {
    firebase.database().ref('/Scholarships').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot)
      {
        let childKey = childSnapshot.key;
        if (childKey == uid) {
          let childData = childSnapshot.val();
          document.getElementById("data").innerHTML = 'Successfully added "' + childData['name'] + '" of amount $' + childData['amount'] + ' to the database.';
        }
      })
    })
  }

}())