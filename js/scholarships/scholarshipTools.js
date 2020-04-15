/**
 * Returns a scholarship object (if the scholarships ID exists in the database)
 * @param {String} uid The scholarship's unique ID
 * @returns {Promise} The scholarship's object (if it exists)
 */
function getScholarshipObject(uid) {
  return new Promise((resolve, reject) => {
      firebase.database().ref('/Scholarships/'+uid).once('value', (snapshot) => {
        let scholarship = snapshot.val();

        return (scholarship) ? (resolve(scholarship)) : reject("Error: Scholarship not in 'Scholarships/' database.");

      })
  });
}

/**
 * Increments the stats of a scholarship
 * @param {String} uid The scholarship's unique ID
 * @param {String} choice The section to increment
 * @returns {Promise} The scholarship's object (if it exists)
 */
function incrementScholarshipStats(uid, choice) {
  return new Promise((resolve, reject) => {
    let schRef = '/Scholarships/'+uid;
      firebase.database().ref(schRef).once('value', (snapshot) => {
        let scholarship = snapshot.val();
        let updates = {};
        let section = '';
        switch(choice){
          case 'apply':
            section = 'numApplied';
            break;
          case 'accept':
            section = 'numAccepted';
            try {
              updates[schRef+'/stats/numReviewed'] = scholarship.stats['numReviewed'] + 1;
            } catch(err) {
              updates[schRef+'/stats/numReviewed'] = 1;
            }
            break;
          case 'review':
            section = 'numReviewed';
            break;
        }

        try {
          updates[schRef+'/stats/'+section] = scholarship.stats[section] + 1;
          firebase.database().ref().update(updates);
        } catch(err) {
          updates[schRef+'/stats/'+section] = 1;
          firebase.database().ref().update(updates);
        }

        return (scholarship) ? (resolve(scholarship)) : reject("Error: Scholarship not in 'Scholarships/' database.");

      })
  });
}
