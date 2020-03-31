/**
 * Returns a user's account object (if the users ID exists in the database)
 * @param {String} uid The user's unique ID
 * @returns {Promise} The user's account object (if it exists)
 */
function getUserObject(uid) {
  return new Promise((resolve, reject) => {
      firebase.database().ref('/Users').once('value', (snapshot) => {
        let user, userList;
        snapshot.forEach((childSnapshot) =>
        {
          userList = childSnapshot.val();
          if(userList[uid]) {
            user = userList[uid];
            user['accountType'] = childSnapshot.key;
          }
        })

        return (user) ? (resolve(user)) : reject("Error: User not in 'Users/' database.");

      })
  });
}
