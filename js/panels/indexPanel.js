/**
 * If user is logged in, grab user id and get the user's account object from database (if it exists).
 * Then, if user's account object exists, call displayUserType(user) to display relevant homepage based on user's type.
 */
firebase.auth().onAuthStateChanged(firebaseUser => {
  document.getElementById("userEmail").innerHTML = ' '+firebaseUser.email+' ';
  if(firebaseUser) {
    getUserObject(firebaseUser.uid).then(u => displayUserType(u)) // uid should be firebaseUser.uid
                                   .catch(e => alert(e));
  }
});

/**
 * Display user information on index page.
 * @param {Object} user The user object
 */
function displayUserType(user) {
  document.getElementById("portalType").innerHTML = user.accountType + " Portal"
  document.getElementById("userType").innerHTML = "Welcome, " + user.name + "!"
  displayPanels(user)
}

/**
 * Display user panels relevant to their account type on index page.
 * @param {Object} user The user object
 */
function displayPanels(user) {
    let panel = panelTypes[user.accountType];
    for (i = panel.numPanels-1; i >= 0; i--) {
            let tmp = '';
            tmp += '<div class="col-md-4">';
            tmp += '  <a href="'+panel.panels[i]['href']+'"><div class="panel-sec">';
            tmp += '    <span>';
            tmp += '      <h3>'+panel.panels[i]['h3']+'</h3><br>';
            tmp += '      <i id="ic-big" class="'+panel.panels[i]['ic-class']+'" aria-hidden="true"></i><br><br>';
            tmp += '      <p>'+panel.panels[i]['p']+'</p>';
            tmp += '    <span>';
            tmp += '  </div></a>';
            tmp += '</div>';
            $('#panels').prepend(tmp);
    }
}
