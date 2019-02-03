  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAYYLG6ju4sdNSNJxeQTVHe4XS2ShZ4R-s",
    authDomain: "train-scheduler-1e30a.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e30a.firebaseio.com",
    projectId: "train-scheduler-1e30a",
    storageBucket: "train-scheduler-1e30a.appspot.com",
    messagingSenderId: "676275002454"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  $(document).ready(function(){

//Initial values - variables for my code
var trainName = ""; 
var trainDest = "";
var trainFreq = 0;
var trainStart = ""; 


//Submit button for when you input the info
$("#submit").on("click", function(){
  event.preventDefault();

  //if/else statement to verify each input field in the form
  if ($("#train-name").val()==="" || 
  $("#train-destination").val()==="" ||
  $("#train-time").val()===""||
  $("#train-frequency").val()===""){
    alert("Incomplete");
} else {

  trainName = $("#train-name")
    .val()
    .trim();
  console.log(trainName);
  trainDest = $("#train-destination")
    .val()
    .trim();
  console.log(trainDest);
  trainFreq = $("#train-frequency")
    .val()
      .trim();
  console.log(trainFreq);
  trainStart = $("#train-time")
    .val()
      .trim();
  console.log(trainStart);

//Values will show in firebase
  database.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    trainFreq: trainFreq,
    trainStart: trainStart
  });
};

});

database.ref().on(
  "child_added", 
  function(childSnapshot) {

    $("#schedule").append(
      "<tr class='well'><th class='train-name'> " +
      childSnapshot.val().trainName +
      " </th><th class='train-destination'> " +
      childSnapshot.val().trainDest +
      " </th><th class='train-frequency'> " +
      childSnapshot.val().trainFreq +
      " </th><th class='train-time'> " +
      childSnapshot.val().trainStart +
      " </th></tr>"
  );
},
function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

          //log to see if everything is functional
          // console.log(snapshot.val());
          // console.log(snapshot.val().trainName);
          // console.log(snapshot.val().trainDest);
          // console.log(snapshot.val().trainFreq);
          // console.log(snapshot.val().trainStart);
      
      

    //show up in train scheduler window
    // $("#train-name").text(snapshot.child().trainName);
    // $("#train-destination").text(snapshot.child().trainDest);
    // $("#train-frequency").text(snapshot.child().trainFreq);
    // $("#train-time").text(snapshot.child().trainStart);



  })

