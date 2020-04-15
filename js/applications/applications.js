/**
 * Checks to see if a scholarship application has already been awarded to a student
 * @param {String} studentId The student's unique ID
 * @return {Promise} Nothing if scholarship has not been awarded, the application object if the scholarship has been awarded
*/
function checkIfStudentAwardedScholarship(studentId) {
  return new Promise((resolve, reject) => {
    let awarded = false;
    firebase.database().ref('/Applications').once('value', function(snapshot) {
      snapshot.forEach(childSnapshot =>
      {
        let application = childSnapshot.val();
        if (application.appliedBy == studentId) {
          if (application.status.awarded == true) {
            awarded = application;
          }
        }
      })

      return (awarded == false) ? (resolve()) : reject(awarded);

    })
  });
}


/**
 * Returns a list of application IDs for a given student
 * @param {String} studentId The student's unique ID
 * @return {Promise} List of student application IDs if any exist
*/
function getStudentApplications(studentId) {
  return new Promise((resolve, reject) => {
    let studentApplicationIds = {};
    firebase.database().ref('/Applications').once('value', function(snapshot) {
      snapshot.forEach(childSnapshot =>
      {
        let application = childSnapshot.val();
        if (studentId == application.appliedBy) {
          studentApplicationIds[childSnapshot.key] = application.scholarshipId;
        }
      })

      return (Object.keys(studentApplicationIds).length >= 0) ? (resolve(studentApplicationIds)) : reject("Error: Student does not seem to have any applications.");

    })
  });
}


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

// /**
//  * Forms a list of all application IDs for all scholarships for a given coordinator ID
//  * Then uses a callback to do something specific with this list
//  * @param {String} coordinatorId The coordinator's unique ID
//  * @param {Function} callback The callback function to utilize the list of application IDs as an argument
// */
// function getAllApplicationsForCoordinator(coordinatorId, callback) {
//   let applicationIds = [];
//   getAssignedScholarships(coordinatorId)
//     .then(scholarshipIds => {
//                   console.log('scholarshipIds',scholarshipIds);
//                   scholarshipIds.forEach( scholarshipId => {
//                       getApplicationsForScholarship(scholarshipId)
//                         .then( applications => {
//                             applicationIds.push(applications);
//                             console.log('applicationIds array',applicationIds);
//                             console.log('applications',applications);
//                             callback(applications)
//                         })
//                         .catch(e => console.log(e));
//                   })
//                })
//     .catch(e => console.log(e));
//
// }

/**
 * Forms a list of all application IDs for all scholarships for a given coordinator ID
 * Then uses a callback to do something specific with this list
 * @param {String} coordinatorId The coordinator's unique ID
 * @param {Function} callback The callback function to utilize the list of application IDs as an argument
*/
function getAllApplicationsForCoordinator(coordinatorId, callback) {
  let applicationIds = [], promises = [];
  getAssignedScholarships(coordinatorId)
    .then(scholarshipIds => {
                  scholarshipIds.forEach( scholarshipId => {
                      promises.push(
                          getApplicationsForScholarship(scholarshipId)
                            .then( applications => {
                                applicationIds.push(applications);
                            })
                            .catch(e => console.log(e))
                      );
                  })
                  Promise.all(promises).then(() => {
                    let applications = applicationIds.flat();
                    callback(applications);
                  })
               })
    .catch(e => console.log(e));
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
