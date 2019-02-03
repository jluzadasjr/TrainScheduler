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


var trainName = ""; 
var trainDest = "";
var trainFreq = 0;
var trainStart = ""; 

$("#submit").on("click", function(){
  event.preventDefault();

  if ($("#train-name").val()==="" || 
  $("#train-destination").val()==="" ||
  $("#train-time").val()===""||
  $("#train-frequency").val()===""){
    alert("Incomplete");
} else {

  trainName = $("#train-name").val().trim();
  console.log(trainName);
  trainDest = $("#train-destination").val().trim();
  console.log(trainDest);
  trainFreq = $("#train-frequency").val().trim();
  console.log(trainFreq);
  trainStart = $("#train-time").val().trim();
  console.log(trainStart);

  database.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    trainFreq: trainFreq,
    trainStart: trainStart,
  });
};

});

});
