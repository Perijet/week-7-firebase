$(document).ready(function(){

//Firebase link
var trainData = new Firebase('https://smoke-trails-1234.firebaseio.com/');

$('.btn').on('click', function(){

	var trainName = $("#nameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainTime = $("#trainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

var trainSched = {
	name: trainName,
	destination: trainDestination,
	time: trainTime,
	frequency: trainFrequency
};

	trainData.push(trainSched);

	console.log(trainSched.name);
	console.log(trainSched.destination);
	console.log(trainSched.time);
	console.log(trainSched.frequency);

	trainName = $("#nameInput").val("");
	trainDestination = $("#destinationInput").val("");
	trainTime = $("#trainTimeInput").val("");
	trainFrequency = $("#frequencyInput").val("");

	return false;

});



trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);




	var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		// Current Time
	var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency; 
		console.log(tRemainder);
		// Minute Until Train
	var tMinutesTillTrain = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



trainArrival = moment(nextTrain).format("hh:mm");

	//var trainArrival = "10:00 PM";

	var minutesAway = tMinutesTillTrain;

	$('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + minutesAway + "</td><tr>");

});
});