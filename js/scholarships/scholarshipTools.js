/**
 * Returns a scholarship object (if the scholarships ID exists in the database)
 * @param {String} uid The scholarship's unique ID
 * @returns {Promise} The scholarship's object (if it exists)
 */
function getScholarshipObject(uid) {
  return new Promise((resolve, reject) => {
      firebase.database().ref('/Scholarships/'+uid).once('value', (snapshot) => {
        // let scholarship, scholarshipList;
        // snapshot.forEach((childSnapshot) =>
        // {
        //   scholarshipList = childSnapshot.val();
        //   if(scholarshipList[uid]) {
        //     scholarship = scholarshipList[uid];
        //     //scholarship['accountType'] = childSnapshot.key;
        //   }
        // })
        let scholarship = snapshot.val();

        return (scholarship) ? (resolve(scholarship)) : reject("Error: Scholarship not in 'Scholarships/' database.");

      })
  });
}
