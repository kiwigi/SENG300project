/**
 * Returns true if student has already applied to scholarship
 * @param {String} scholarshipId The scholarship's unique ID
 * @param {String} studentId The student's unique ID
 * @returns {Promise} Boolean that is true if an application already exists by this student for the specified scholarship
*/
function checkIfApplicationAlreadyExists(scholarshipId, studentId){
  return new Promise((resolve, reject) => {
    let scholarshipApplications = [];
    firebase.database().ref('/Applications').once('value', function(snapshot) {
      let exists = false;
      snapshot.forEach(childSnapshot =>
      {
        let application = childSnapshot.val();
        if (studentId == application.appliedBy && scholarshipId == application.scholarshipId) {
          exists = true;
        }
      })

      return (exists) ? (resolve(exists)) : reject("No application exists.");

    })
  });
}

checkIfApplicationAlreadyExists('610e6a8c-054c-cf7a-036a-22ba7a1e60fd', 'dLqEPcNkmgQGKL1U2VSJm8CkZjP2').then(u => printObject(u))
                                                            .catch(e => alert(e));

/**
 * Returns a list of assigned scholarship IDs for a given coordinator ID
 * @param {String} coordinatorId The coordinator's unique ID
 * @returns {Promise} List of scholarship ID's for a specified coordinator ID
*/
function getAssignedScholarships(coordinatorId) {
  return new Promise((resolve, reject) => {
    let assignedScholarshipIds = [];
    firebase.database().ref('/Scholarships').once('value', function(snapshot) {
      snapshot.forEach(childSnapshot =>
      {
        let scholarship = childSnapshot.val();
        if (coordinatorId == scholarship.coordinator) {
          assignedScholarshipIds.push(childSnapshot.key);
        }
      })

      return (assignedScholarshipIds.length > 0) ? (resolve(assignedScholarshipIds)) : reject("Error: Scholarship not in 'Scholarship/' database.");

    })
  });
}

getAssignedScholarships('VkDvVWJQbGMWRh3viWizcu0FHq62').then(u => printObject(u)) // uid should be firebaseUser.uid
                                                            .catch(e => alert(e));

/**
 * Returns a list of application IDs for a given scholarship ID
 * @param {String} scholarshipId The scholarship's unique ID
 * @returns {Promise} List of application ID's for specified scholarship ID
*/
function getApplicationsForScholarship(scholarshipId) {
  return new Promise((resolve, reject) => {
    let scholarshipApplications = [];
    firebase.database().ref('/Applications').once('value', function(snapshot) {
      snapshot.forEach(childSnapshot =>
      {
        let application = childSnapshot.val();
        if (scholarshipId == application.scholarshipId) {
          scholarshipApplications.push(childSnapshot.key);
        }
      })

      return (scholarshipApplications.length > 0) ? (resolve(scholarshipApplications)) : reject("Error: Application not in 'Applications/' database.");

    })
  });
}

getApplicationsForScholarship('610e6a8c-054c-cf7a-036a-22ba7a1e60fd').then(u => printObject(u)) // uid should be firebaseUser.uid
                                                            .catch(e => alert(e));

/**
 * Forms a list of all application IDs for all scholarships for a given coordinator ID
 * Then uses a callback to do something specific with this list
 * @param {String} coordinatorId The coordinator's unique ID
 * @param {Function} callback The callback function to utilize the list of application IDs as an argument
*/
function getAllApplicationsForCoordinator(coordinatorId, callback) {
  getAssignedScholarships(coordinatorId)
    .then(scholarshipIds => {
                  scholarshipIds.forEach( scholarshipId => {
                      getApplicationsForScholarship(scholarshipId)
                        .then( applications => {
                            console.log('applicationIds',applications);
                            callback(applications)
                        })
                        .catch(e => console.log(e));
                  })
               })
    .catch(e => console.log(e));

}

function callback(applications) {
  console.log("Now I can do something with this: ",applications);
}

/**
 * Returns an application object for a given application ID
 * @param {String} applicationId The applications's unique ID
 * @returns {Promise} The application object (if it exists)
*/
function getApplicationObject(applicationId) {
  return new Promise((resolve, reject) => {
      firebase.database().ref('/Applications').once('value', (snapshot) => {
        let application;
        snapshot.forEach((childSnapshot) =>
        {
          if (applicationId == childSnapshot.key) {
            application = childSnapshot.val();
          }
        })

        return (application) ? (resolve(application)) : reject("Error: Application not in 'Applications/' database.");

      })
  });
}

getApplicationObject('68b2d825-4783-ac6c-5971-c0b97a6234be').then(u => printObject(u)) // uid should be firebaseUser.uid
                                                            .catch(e => alert(e));

function printObject(u) {
  console.log('App:',u);
}
