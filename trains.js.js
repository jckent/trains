var firebaseConfig = {
  apiKey: "AIzaSyDNb1Krk_pYzTt46AOCXATJ7k4mSBpz0GM",
  authDomain: "trains-5e057.firebaseapp.com",
  databaseURL: "https://trains-5e057.firebaseio.com",
  projectId: "trains-5e057",
  storageBucket: "trains-5e057.appspot.com",
  messagingSenderId: "988131991789",
  appId: "1:988131991789:web:75c9df3600befecab5ece4",
  measurementId: "G-R3YFNZ2R7D"
};

firebase.initializeApp(config);

var trainData = firebase.database();


$("#add-train-btn").on("click", function(event) {

  event.preventDefault();

  
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = $("#first-train-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  
  trainData.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

    if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
      tArrival = moment()
      .add(tMinutes, "m")
      .format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

    $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    )
  );
});

