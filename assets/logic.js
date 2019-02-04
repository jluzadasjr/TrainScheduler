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
var trainStart = ""; 
var trainFreq = 0;


//Submit button for when you input the info
$("#submit").on("click", function(){
  event.preventDefault();

  //if/else statement to grab text from input field in the form
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
    trainStart: trainStart, 
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });
};

// Clears text from form
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

// Prevents loading a new page
    return false;
});

//Firebase event to add train to DB and row in html when user adds a new train
database.ref().on(
  "child_added", 
  function(childSnapshot) {

  	// Place train data into a variable.
    var tName = childSnapshot.val().trainName;
    console.log(tName);
    var tDestination = childSnapshot.val().trainDest;
    console.log(tDestination);
    var tFrequency = childSnapshot.val().trainFreq;
    console.log(tFrequency);
    var tFirstTrain = childSnapshot.val().trainStart;
    console.log(tFirstTrain);

        // Train time converted
        var trainConversion = moment(childSnapshot.val().trainStart, "HH:mm");
        console.log(trainConversion);
        // Difference between the times
        var timeDifference = moment().diff(moment(trainConversion), "minutes");
        console.log(timeDifference);
        // Time apart 
        var trainRemainder = timeDifference % childSnapshot.val().trainFreq;
        console.log(trainRemainder);
        // Minutes away until train arrives
        var minAway = childSnapshot.val().trainFreq - trainRemainder;
        console.log(minAway);
        // Next arriving train
        var trainArrival = moment().add(minAway, "minutes");
        var arrivalConverted = moment(trainArrival).format("HH:mm");
        console.log(arrivalConverted);

    //Add train times to train schedule
    var row = $('<tr>');
    $(row).append($('<td>').text(childSnapshot.val().trainName));
    $(row).append($('<td>').text(childSnapshot.val().trainDest));
    $(row).append($('<td>').text(childSnapshot.val().trainFreq));
    $(row).append($('<td>').text(trainArrival));
    $(row).append($('<td>').text(minAway));

    $('#schedule').append(row);

  },
  // Handle the errors
    function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
          }
);
})

