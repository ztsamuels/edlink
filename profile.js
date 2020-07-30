var firebaseConfig = {
    apiKey: "AIzaSyDQqS1OuU1s8cwkyQDcgqQV9vquxFZAfTU",
    authDomain: "partheanedlink.firebaseapp.com",
    databaseURL: "https://partheanedlink.firebaseio.com",
    projectId: "partheanedlink",
    storageBucket: "partheanedlink.appspot.com",
    messagingSenderId: "244645197259",
    appId: "1:244645197259:web:23e5b88a5ab02d3faa324e",
    measurementId: "G-N60RNK9K3L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth();
  var db = firebase.firestore();
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

//saving user input in variables and in the database
$("#form1").submit(function(e) {
  e.preventDefault();
    // what the user inputs is saved in a variable: email_input
      var email = document.getElementById("email_input").value;
      console.log(email);
    // what the user inputs is saved in a variable: password_input
      var password = document.getElementById("pass_input").value;
      console.log(password);
    // call signUp
    signUp();
    // call sendEmailVerification
    sendEmailVerification();
    // call signIn < DOESN'T CURRENTLY WORK
    signIn();
})



// new user sign up in a way that makes sense
function signUp() {
  // what the user inputs is saved in a variable: email_input
    var email = document.getElementById("email_input").value;
  // what the user inputs is saved in a variable: password_input
    var password = document.getElementById("pass_input").value;
  // save user info to database
    function saveUserToDatabase(email,password){
      doc = db.collection("users").add({
        email: email,
        password: password,
      })
    }
// print to console that the user info is actually saved so we know it works
  console.log("infoSaved");
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  console.log("signedUp!");
}

// function to send email verification to prevent bots or something idk this is completely optional
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // email verification sent
    alert("email verification sent!");
  })
}

function signIn() {
// retrieve email and password input
  var email = document.getElementById('email_input').value;
  var pass = document.getElementsByClassName('pass_input').value;
  // if email is too short
  if (email.length < 4) {
    // CHANGETHIS: i would like to change this so that it doesn't alert but rather shows up on the webpage so it looks classier
    alert('please enter a valid email address.');
    return;
  }
  // if pass is too short
  if (pass.length < 4) {
    // CHANGETHIS: i would like to change this so that it doesn't alert but rather shows up on the webpage so it looks classier
    alert('please enter a valid password.');
    return;
  }
  // actual sign-in command
  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // handling errors such as incorrect info
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      // CHANGETHIS: i would like to change this so that it doesn't alert but rather shows up on the webpage so it looks classier
      alert('wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    console.log("signed in!");
  });
}
